const UglifyJS = require('uglify-js')
const fs       = require('node:fs')
const crypto = require('node:crypto')
const fsp = require('node:fs').promises
const path = require('node:path')
const httpdir = require('/usr/local/lib/node_modules/httpdir')

const srcPath = path.join(__dirname, 'src')
const distPath = path.join(__dirname, 'dist')

build()
if (process.argv.includes('--watch')) {
  const server = httpdir.createServer({ basePath: 'dist', httpPort: 9293 })
  server.onStart(({ urls }) => {
    console.log(urls.join('\n'))
  })
  server.start()
  buildOnChange()
}

async function build() {
  const startMs = Date.now()
  try {
    await copyAssets()
    const css = await buildCSS()
    const js = await buildJS()
    await buildHTML(css, js)
    console.log(`Built (${Date.now() - startMs}ms)`)
  } catch (error) {
    console.log(`Build error: ${error.message} (${error.stack})`)
  }
}

async function buildOnChange() {
  console.log(`Watching ${srcPath}`)
  fs.watch(srcPath, { recursive: true }, (evtType, file) => {
    console.log(`Event ${evtType} on ${file}, building...`)
    build()
  })
}

async function makeDist() {
  try {
    await fsp.rm(distPath, { recursive: true })
  } catch(error) {}
  await fsp.mkdir(distPath, { recursive: true })
}

async function buildCSS() {
  console.log('Building CSS')
  let css = await fsp.readFile(path.join(srcPath, 'styles.css'), 'utf8')
  css = css.replace(/\n/g, ' ')
  css = css.replace(/ {2,}/g, '')
  const hash = crypto.createHash('sha1').update(css).digest('hex')
  const filename = `styles.${hash}.css`
  await fsp.writeFile(path.join(distPath, filename), css)
  return filename
}

function buildJS() {
  console.log('Building JS')
  return new Promise((resolve, reject) => {
    const result = UglifyJS.minify({
      generator : fs.readFileSync('src/js/generator.js', 'utf8'),
      score : fs.readFileSync('src/js/score.js', 'utf8'),
      ui : fs.readFileSync('src/js/ui.js', 'utf8'),
    })
    fs.writeFile('dist/scripts.js', result.code, (error) => {
      if (error) {
        reject(error)
        return
      }
      const hash = crypto.createHash('sha1').update(result.code).digest('hex')
      fs.renameSync('dist/scripts.js', 'dist/scripts.' + hash + '.js')
      resolve('scripts.' + hash + '.js')
    })
  })
}

async function buildHTML(cssFilename, jsFilename) {
  console.log('Building HTML')
  let html = await fsp.readFile(path.join(srcPath, 'index.html'), 'utf8')
  html = html.replaceAll('__cssFilename__', cssFilename)
  html = html.replaceAll('__jsFilename__', jsFilename)
  html = html.replace(/ {2,}/g, '')
  await fsp.writeFile(path.join(distPath, 'index.html'), html)
}

async function copyAssets() {
  console.log('Copying assets')
  const src = path.join(srcPath, 'fonts')
  const dest = path.join(distPath, 'fonts')
  await fsp.cp(src, dest, { recursive: true })
}

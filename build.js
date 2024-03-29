const fs = require('node:fs')
const crypto = require('node:crypto')
const fsp = require('node:fs').promises
const path = require('node:path')
const esbuild = require('esbuild')

const srcPath = path.join(__dirname, 'src')
const distPath = path.join(__dirname, 'dist')

build()
if (process.argv.includes('--watch')) {
  const httpdir = require('/usr/local/lib/node_modules/httpdir')
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
    await makeDist()
    await copyAssets()
    const css = await buildCSS()
    const js = await buildJS()
    await buildHTML(css, js)
    await fsp.copyFile(path.join(__dirname, '_headers'), path.join(distPath, '_headers'))
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
  } catch(error) { }
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

async function buildJS() {
  console.log('Building JS')
  const result = await esbuild.build({
    entryPoints: [path.join(srcPath, 'js/ui.js')],
    bundle: true,
    minify: true,
    entryNames: '[name].[hash]',
    outdir: distPath,
    metafile: true,
  })
  if (result.errors.length > 0) {
    throw new Error(result.errors[0])
  }
  const assets = Object.keys(result.metafile.outputs)
  return path.parse(assets[0]).base
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
  await fsp.cp(path.join(srcPath, 'fonts'), path.join(distPath, 'fonts'), { recursive: true })
  await fsp.cp(path.join(srcPath, 'favicon.png'), path.join(distPath, 'favicon.png'), { recursive: true })
}

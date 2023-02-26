const UglifyJS = require('uglify-js')
const fs       = require('fs')
const ncp      = require('ncp')
const rimraf   = require('rimraf')
const crypto = require('crypto')
const fsp = require('fs').promises
const path = require('path')

prepareDist().then(() => {
  Promise.all([copyAssets(), buildCSS(), buildJS()])
    .then(([assets, css, js]) => {
      buildHTML(css, js).then(() => console.log('Built.'))
    })
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
})

async function buildCSS() {
  console.log('Building CSS')
  let css = await fsp.readFile('assets/styles.css', 'utf8')
  css = css.replace(/\n/g, ' ')
  css = css.replace(/ {2,}/g, '')
  const hash = crypto.createHash('sha1').update(css).digest('hex')
  const filename = `styles.${hash}.css`
  await fsp.writeFile(path.join(__dirname, 'dist', filename), css)
  return filename
}

function buildJS() {
  console.log('Building JS')
  return new Promise((resolve, reject) => {
    const result = UglifyJS.minify({
      cookie : fs.readFileSync('assets/js/cookie.min.js', 'utf8'),
      generator : fs.readFileSync('assets/js/generator.js', 'utf8'),
      score : fs.readFileSync('assets/js/score.js', 'utf8'),
      ui : fs.readFileSync('assets/js/ui.js', 'utf8'),
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
  let html = await fsp.readFile('index.html', 'utf8')
  html = html.replaceAll('__cssFilename__', cssFilename)
  html = html.replaceAll('__jsFilename__', jsFilename)
  html = html.replace(/ {2,}/g, '')
  await fsp.writeFile(path.join(__dirname, 'dist/index.html'), html)
}

function prepareDist() {
  console.log('Cleaning dist')
  return new Promise((resolve, reject) => {
    rimraf('dist', (error) => {
      if (error) {
        reject(error)
        return
      }
      fs.mkdir('dist', resolve)
    })
  })
}

function copyAssets() {
  console.log('Copying assets')
  return new Promise((resolve, reject) => {
    copyDir('assets/fonts', 'dist/fonts').then(copyDir('assets/images', 'dist/images')).then(resolve)
  })
}

function copyDir(source, destination) {
  return new Promise((resolve, reject) => {
    ncp(source, destination, (error) => {
      resolve()
    })
  })
}

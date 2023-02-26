const UglifyJS = require('uglify-js')
const minify   = require('html-minifier').minify
const fs       = require('fs')
const ejs      = require('ejs')
const hasha    = require('hasha')
const ncp      = require('ncp')
const rimraf   = require('rimraf')

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

function buildCSS() {
  console.log('Building CSS')
  return new Promise((resolve, reject) => {
    fs.readFile('assets/styles.css', 'utf8', (error, css) => {
      if (error) {
        reject(error)
        return
      }
      css = css.replace(/\n/g, ' ')
      css = css.replace(/ {2,}/g, '')
      fs.writeFile('dist/styles.css', css, (error) => {
        if (error) {
          reject(error)
          return
        }
        hasha.fromFile('dist/styles.css', {algorithm: 'md5'}).then((hash) => {
          fs.renameSync('dist/styles.css', 'dist/styles.' + hash + '.css')
          resolve('styles.' + hash + '.css')
        })
      })
    })
  })
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
      hasha.fromFile('dist/scripts.js', {algorithm: 'md5'}).then((hash) => {
        fs.renameSync('dist/scripts.js', 'dist/scripts.' + hash + '.js')
        resolve('scripts.' + hash + '.js')
      })
    })
  })
}

function buildHTML(cssFilename, jsFilename) {
  console.log('Building HTML')
  return new Promise((resolve, reject) => {
    const indexTemplate = fs.readFileSync('index.ejs', 'utf8')
    const html = ejs.render(indexTemplate, {
      cssFilename : cssFilename,
      jsFilename  : jsFilename,
    })
    const minifiedHTML = minify(html, {
      caseSensitive              : true,
      collapseWhitespace         : true,
      conservativeCollapse       : true,
      html5                      : true,
      removeAttributeQuotes      : false,
      removeComments             : true,
      removeEmptyAttributes      : true,
      removeScriptTypeAttributes : true,
      useShortDoctype            : true,
    })
    fs.writeFile('dist/index.html', minifiedHTML, (error) => {
      error ? reject(error) : resolve(html)
    })
  })
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

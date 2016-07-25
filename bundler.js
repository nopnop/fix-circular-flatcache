var persistify = require('persistify')

var b = persistify({
  // browserify options here. e.g
  // debug: true
}, {
  watch: true,
  cacheDir: './cache'
})

b.add('./index.js')

b.on('bundle:done', function (time) {
  console.log('bundle:done time', time)
})

b.on('error', function (err) {
  console.log('error', err)
})

function doBundle () {
  b.bundle(function (err, buff) {
    if (err) {
      throw err
    }
    require('fs').writeFileSync('./result.js', buff.toString())
  })
}

doBundle()

b.on('update', function () {
  doBundle()
})

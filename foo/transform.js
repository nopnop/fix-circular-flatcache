'use strict'

const Transform = require('stream').Transform

module.exports = function (file) {
  console.error('transform', file)

  return new Transform({
    transform (chunk, encoding, done) {
      console.error('process %s', file)
      this.push(chunk)
      done()
    }
  })
}

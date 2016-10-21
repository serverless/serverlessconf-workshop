const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const gm = require('gm').subClass({imageMagick: true})

module.exports.resize = function (event, context, callback) {
  event.Records.forEach(function (e) {
    const params = {
      Bucket: e.s3.bucket.name,
      Key: e.s3.object.key
    }
    s3.getObject(params, function (err, data) {
      if (err) {
        callback(err)
      } else {
        gm(data.Body)
          .resize(100, 100)
          .setFormat('jpeg')
          .toBuffer(function (err, buffer) {
            if (err) {
              callback(err)
            } else {
              const params = {
                Bucket: e.s3.bucket.name,
                Key: `small-${e.s3.object.key}`,
                ACL: 'public-read',
                Body: buffer
              }
              s3.putObject(params, function (err, data) {
                callback(err)
              })
            }
          })
      }
    })
  })
}

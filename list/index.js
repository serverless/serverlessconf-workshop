'use strict'

const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const kinesis = new AWS.Kinesis()
const reportVisit = require('../lib/reportVisit')

const BUCKET = 'sconf-workshop-uploads'

module.exports.list = function (event, context, callback) {
  reportVisit({page: 'list'})

  const params = {
    Bucket: BUCKET,
    Prefix: 'small'
  }
  s3.listObjects(params, function (err, data) {
    if (err) {
      callback(err)
    } else {
      let list = ''
      data.Contents.forEach(function (file) {
        let thumb = `https://s3.amazonaws.com/${BUCKET}/${file.Key}`
        list += `<li><a href="/dev/show?image=${file.Key.replace('small-', '')}"><img src="${thumb}" /></a></li>`
      })

      const html = `
      <html>
        <body>
          <a href="upload">Upload more images</a><br/>
          <a href="stats">Show Stats</a><br/>
          <ul>
            ${list}
          </ul>
        </body>
      </html>`

      const response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/html'
        },
        body: html
      }

      callback(null, response)
    }
  })
}

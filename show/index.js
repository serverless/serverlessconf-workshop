'use strict'

const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const reportVisit = require('../lib/reportVisit')

const BUCKET = 'sconf-workshop-uploads'

module.exports.show = function (event, context, callback) {
  reportVisit({page: 'show', image: event.queryStringParameters.image})

  const html = `
  <html>
    <body>
      <a href="list">Back to the list of images</a>
      <a href="upload">Upload more images</a>
      <img src="https://s3.amazonaws.com/${BUCKET}/${event.queryStringParameters.image}" />
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

'use strict'

const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB()

const TABLE = 'WorkshopVisits'

module.exports.stats = function (event, context, callback) {
  const params = {
    TableName: TABLE
  }

  dynamodb.scan(params, function (err, data) {
    if (err) {
      callback(err)
    } else {
      const reduced = data.Items.reduce(function (prev, curr) {
        if (curr.page.S === 'list') {
          prev.list++
        } else {
          const image = curr.image.S
          if (prev[image]) {
            prev[image]++
          } else {
            prev[image] = 1
          }
        }

        return prev
      }, {
        list: 0
      })

      const list = Object.keys(reduced).reduce(function (prev, key) {
        prev += `<li>${key}: ${reduced[key]}</li>`
        return prev
      }, '')

      const html = `
  <html>
    <body>
      <a href="list">Back to the list of images</a><br/>
      <ul>${list}</ul>
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

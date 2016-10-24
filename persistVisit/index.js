const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB()
const uuid = require('uuid')

module.exports.persistVisit = function (event, context, callback) {
  const items = event.Records.map(function (record) {
    const visit = JSON.parse(new Buffer(record.kinesis.data, 'base64').toString())
    const item = {
      PutRequest: {
        Item: {
          uuid: {
            S: uuid.v4()
          },
          page: {
            S: visit.page
          },
          timestamp: {
            N: String(visit.timestamp)
          }
        }
      }
    }

    if (visit.image) {
      item.PutRequest.Item.image = {
        S: visit.image
      }
    }

    return item
  })

  const params = {
    RequestItems: {
      WorkshopVisits: items
    }
  }
  dynamodb.batchWriteItem(params, function (err, data) {
    if (err) {
      console.log(err, err.stack)
    }
  })
}

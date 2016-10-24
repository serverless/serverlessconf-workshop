const AWS = require('aws-sdk')
const kinesis = new AWS.Kinesis()

const STREAM = 'WorkshopVisits'

module.exports = function (event) {
  event.timestamp = Date.now()

  var params = {
    Data: JSON.stringify(event),
    PartitionKey: 'visits',
    StreamName: STREAM
  }
  kinesis.putRecord(params, function (err, data) {
    if (err) {
      console.log(err)
    }
  })
}

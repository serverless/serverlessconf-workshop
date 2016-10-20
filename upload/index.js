const AWS = require('aws-sdk')
const s3 = new AWS.S3()

module.exports.upload = function (event, context, callback) {
  const params = {Bucket: 'sconf-workshop-uploads', Key: 'images', Expires: 60} // expires in 60 seconds
  const url = s3.getSignedUrl('putObject', params)

  const html = `
  <html>
    <body>
      <h1>Upload you images</h1>
      <p>
        Link to S3: <a href="${url}">${url}</a>
      </p>
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

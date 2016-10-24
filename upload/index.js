const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const BUCKET = 'sconf-workshop-uploads'

module.exports.upload = function (event, context, callback) {
  const params = {
    Bucket: BUCKET,
    Key: `image${Date.now()}.jpeg`,
    ContentType: 'image/jpeg',
    ACL: 'public-read',
    Expires: 300 // expires in 5 minutes
  }
  const url = s3.getSignedUrl('putObject', params)

  const html = `
  <html>
    <head>
      <script src="https://cdn.rawgit.com/enyo/dropzone/master/dist/dropzone.js"></script>
      <script type="text/javascript">
        Dropzone.options.myAwesomeDropzone = {
          method: 'put',
          acceptedFiles: 'image/jpeg',
          sending: function(file, xhr) {
            xhr.setRequestHeader('Content-Type', file.type)
            xhr.setRequestHeader('x-amz-acl', 'public-read')
            var _send = xhr.send
            xhr.send = function() {
              _send.call(xhr, file)
            }
          }
        };
      </script>
    </head>
    <body>
      <h1>Upload you images</h1>
      <form action="${url}" class="dropzone" id="my-awesome-dropzone"></form>
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

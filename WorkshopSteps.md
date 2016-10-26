# Prepare workshop folder
`mkdir workshop`

`cd workshop`

# Prepare Docker containers
`docker-compose build serverless-workshop`

`docker-compose run serverless-workshop bash`

# Create the Serverless service
`serverless create -t aws-nodejs -n serverless-workshop`

# Deploy with verbose mode
`serverless deploy -v`

# Invoke
`serverless invoke -f hello`

# Create Upload endpoint function
* Create upload endpoint function
  * Change Bucket Name
  * Returns HTML with an S3 URL we can push to for 5 minutes
  * Uses Dropzone.js to have file upload drop zones
  * When uploading a file this fails though

# Configure S3 event to be able to upload file correctly
* Create resize function with S3 event
* Add handler file
* Add package.json with GM dependency
* Add IAMRoleStatements for S3
* Redeploy
* Try uploading file

# Fix CORS Error
* Show CORS error in Browser Console
* Need to update CORS settings through custom resources
* Show with --noDeploy
* aws s3 ls s3://sconf-workshop-uploads-florian

# List Images
* Add list function
* Call with `serverless invoke -f list -l`
* RemoveReportVisit from Code for now and redeploy with `serverless deploy function -f list`
* Change S3 Bucket in list function

# Add Showing images page
* Add Show function
* Remove ReportVisit from Code

# Report Visits to Kinesis
* Add Kinesis Stream to Serverless resources
* Rename Stream to add Workshop Name
* Add reportVisits code to show and list function
* add iamrole statement for Kinesis

# Store reporting in DynamoDB
* Show kinesis data with Echo handler
* Move persistVisit handler into project and wire it up
* Set IAMRoleStatement for dynamodb
* Call List and image websites
* Show that the data is stored in DynamoDB for both list and image pages

# Show page listing

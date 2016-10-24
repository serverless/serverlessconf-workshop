'use strict'

module.exports.echo = function (event, context, callback) {
  console.log(JSON.stringify(event));
  callback(null, event);
}

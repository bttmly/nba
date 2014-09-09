var qs = require( "query-string" );

function RequestError ( url, query ) {
  this.url = url + "?" + qs.stringify( query );
  this.message = "Request to " + this.url + " failed.";
}

RequestError.prototype = Object.create( Error.prototype );

function ParameterError ( url, query, msg ) {
  this.url = url + "?" + qs.stringify( query );
  this.message = msg;
}

ParameterError.prototype = Object.create( Error.prototype );

module.exports = {
  RequestError: RequestError,
  ParameterError: ParameterError
};

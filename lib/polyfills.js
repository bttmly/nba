Object.assign = Object.assign || require( "object-assign" );

String.prototype.contains = String.prototype.contains || function () {
  return String.prototype.indexOf.apply( this, arguments ) !== -1;
};

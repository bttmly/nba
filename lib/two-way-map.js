"use strict";

module.exports = function twoWayMap ( obj ) {
  var result = Object.create( null );

  Object.keys( obj ).reduce( function ( result, key ) {
    result[key] = obj[key];
    result[obj[key]] = key;
    return result;
  }, result );

  Object.freeze( result );

  return result;
};

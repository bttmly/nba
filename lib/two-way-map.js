"use strict";

var METHOD_NAMESPACE = "@@";

var methods = {
  add: function ( a, b ) {
    this[a] = b;
    this[b] = a;
  },
  remove: function ( a ) {
    var temp = this[a];
    delete this[a];
    delete this[temp];
  }
};

module.exports = function twoWayMap ( obj ) {
  var result = Object.create( null );

  Object.keys( obj ).reduce( function ( result, key ) {
    result[key] = obj[key];
    result[obj[key]] = key;
    return result;
  }, result );

  Object.keys( methods ).reduce( function( result, method ) {
    result[ METHOD_NAMESPACE + method ] = methods[method];
    return result;
  }, result );

  Object.freeze( result );

  return result;
};

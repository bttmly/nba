"use strict";

var METHOD_NAMESPACE = "@@";

var methods = {
  add: function ( a, b ) {
    this[a] = b;
    this[b] = a;
    return this;
  },
  remove: function ( a ) {
    var b = this[a];
    delete this[a];
    delete this[b];
    return this;
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

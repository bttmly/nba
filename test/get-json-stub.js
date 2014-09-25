"use strict";

var Promise = require( "../lib/promise" );

var DELAY = 10;

function jsonStub () {
  return new Promise( function ( resolve ) {
    setTimeout( function () {
      resolve( "success" );
    }, DELAY );
  });
}

function jsonFailStub () {
  return new Promise( function ( resolve, reject ) {
    setTimeout( function () {
      reject( "fail" );
    });
  });
}

module.exports = {
  success: jsonStub,
  fail: jsonFailStub
};

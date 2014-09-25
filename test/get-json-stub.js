"use strict";

var spy = require( "sinon" ).spy;

var Promise = require( "./promise" );

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
  jsonGood: spy( jsonStub ),
  jsonBad: spy( jsonFailStub )
};

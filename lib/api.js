"use strict";

var ep = require( "./endpoints" );
var maps = require( "./maps" );
var util = require( "./util" );
var getJSON = require( "./get-json" );

var translate = util.partial( util.translateKeys, maps.twoWayMap() );

var api = {};

Object.keys( ep ).forEach( function ( key ) {
  api[key] = function ( options ) {
    if ( options == null ) {
      options = {};
    }
    options = util.merge( ep[key].defaults(), translate( options ) );
    console.log( typeof getJSON );
    return getJSON( ep[key].url, options ).then( ep[key].transform );
  };
});

module.exports = api;

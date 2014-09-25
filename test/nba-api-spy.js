"use strict";

var spy = require( "sinon" ).spy;

var merge = require( "../lib/util" ).merge;

var extensions = {
  optionPosition: 1,
  lastCalledWithOption: function ( option, value ) {
    var opts = this.lastCall.args[ this.optionPosition ];
    if ( Object.keys( opts ).indexOf( option ) === -1 ) {
      return false;
    }
    if ( value ) {
      return opts[option] === value;
    }
    return true;
  },
  urlPosition: 0,
  lastCalledWithUrl: function ( url ) {
    var lastUrl = this.lastCall.args[ this.urlPosition ];
    return lastUrl === url;
  }
};

module.exports = function () {
  var ret = spy.apply( null, arguments );
  return merge( ret, extensions );
};

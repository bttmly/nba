var mapKeysAndValues = function ( obj, cb ) {
  var result = {};
  Object.keys( obj ).forEach( function ( key ) {
    var pair = cb( obj[key], key );
    result[ pair[0] ] = pair[1];
  });
  return result;
};

var mapValues = function ( obj, cb ) {
  return mapKeysAndValues( obj, function ( value, key ) {
    return [ key, cb( value, key ) ];
  });
};

var mapKeys = function ( obj, cb ) {
  return mapKeysAndValues( obj, function ( value, key ) {
    return [ cb( value, key ), value ];
  });
};

var collectify = function ( headers, rows ) {
  return rows.map( function ( item ) {
    return item.reduce( function ( model, val, i ) {
      model[ headers[i] ] = val;
      return model;
    }, {} );
  });
};

var translateKeys = function ( keyMap, obj ) {
  return Object.keys( obj ).reduce( function ( result, key ) {
    result[ keyMap[key] ] = obj[ key ];
    return result;
  }, {} );
};

var partial = function ( fn ) {
  var outerArgs = [];
  for ( var i = 1; i < arguments.length; i++ ) {
    outerArgs[i - 1] = arguments[i];
  }
  return function () {
    var args = outerArgs.slice();
    for ( var i = 0; i < arguments.length; i++ ) {
      args[ args.length ] = arguments[i];
    }
    return fn.apply( this, args );
  };
};

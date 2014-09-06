function mapKeysAndValues ( obj, cb ) {
  var result = {};
  Object.keys( obj ).forEach( function ( key ) {
    var pair = cb( obj[key], key );
    result[ pair[0] ] = pair[1];
  });
  return result;
}

function mapValues ( obj, cb ) {
  return mapKeysAndValues( obj, function ( value, key ) {
    return [ key, cb( value, key ) ];
  });
}

function mapKeys ( obj, cb ) {
  return mapKeysAndValues( obj, function ( value, key ) {
    return [ cb( value, key ), value ];
  });
}

function collectify ( headers, rows ) {
  return rows.map( function ( item ) {
    return item.reduce( function ( model, val, i ) {
      model[ headers[i] ] = val;
      return model;
    }, {} );
  });
}

function translateKeys ( keyMap, obj ) {
  return Object.keys( obj ).reduce( function ( result, key ) {
    result[ keyMap[key] ] = obj[ key ];
    return result;
  }, {} );
}

function partial ( fn ) {
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
}

function camelize ( str ) {
  return str.trim().replace( /[-_\s]+(.)?/g, function ( match, c ){
    return c ? c.toUpperCase() : "";
  });
}

function jsifyHeaders ( arr ) {
  return arr.map( function ( item ) {
    return camelize( item.toLowerCase() );
  });
}

module.exports = {
  mapKeysAndValues: mapKeysAndValues,
  mapValues: mapValues,
  mapKeys: mapKeys,
  collectify: collectify,
  translateKeys: translateKeys,
  partial: partial,
  camelize: camelize,
  jsifyHeaders: jsifyHeaders
};

var extend = require( "extend" );

function shallowCopy ( obj ) {
  return Object.keys( obj ).reduce( function ( result, key ) {
    result[key] = obj[key];
    return result;
  }, {} );
}

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

function baseResponseTransform ( resp ) {
  var data = resp.resultSets[0];
  var headers = jsifyHeaders( data.headers );
  return collectify( headers, data.rowSet );
}

function playersResponseTransform ( resp ) {
  return baseResponseTransform( resp )
      .map( function ( player ) {
        var result = shallowCopy( player );
        var names = result.displayLastCommaFirst.split( ", " ).reverse();
        result.firstName = names[0].trim();
        result.lastName = ( names[1] ? names[1] : "" ).trim();
        result.fullName = result.firstName + ( result.lastName ? " " + result.lastName : "" );
        result.playerId = result.personId;
        return result;
    });
}

function matches ( matcher, against ) {
  return Object.keys( matcher ).every( function ( key ) {
    return matcher[key] === against[key];
  });
}

function findWhere ( matcher, arr ) {
  var result = null;
  arr.some( function ( item ) {
    if ( matches( matcher, item ) ) {
      result = item;
    }
    return result;
  });
  return result;
}

function mergeCollections ( idProp, collections ) {
  var first = collections.shift();
  return first.map( function ( itemA ) {
    var matcher = {};
    matcher[idProp] = itemA[idProp];
    var items = [{}];
    collections.forEach( function ( col ) {
      return items.push( findWhere( matcher, col ) );
    });
    return extend.apply( null, items );
  });
}

function pickKeys ( arr ) {
  var args = [];
  for ( var i = 1; i < arguments.length; i++ ) {
    args[i - 1] = arguments[i];
  }
  return arr.map( function ( item ) {
    return args.reduce( function ( obj, key ) {
      obj[key] = item[key];
      return obj;
    }, {} );
  });
}

module.exports = {
  shallowCopy: shallowCopy,
  mapKeysAndValues: mapKeysAndValues,
  mapValues: mapValues,
  mapKeys: mapKeys,
  pickKeys: pickKeys,
  collectify: collectify,
  translateKeys: translateKeys,
  partial: partial,
  camelize: camelize,
  jsifyHeaders: jsifyHeaders,
  mergeCollections: mergeCollections,
  baseResponseTransform: baseResponseTransform,
  playersResponseTransform: playersResponseTransform
};

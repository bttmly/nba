
function merge ( target ) {
  var source;
  var keys;
  for ( var i = 1; i < arguments.length; i++ ) {
    source = arguments[i];
    keys = Object.keys( source );
    for ( var j = 0; j < keys.length; j++ ) {
      target[keys[j]] = source[keys[j]];
    }
  }
  return target;
}

function shallowCopy ( obj ) {
  return merge( {}, obj );
}


function mapKeysAndValues ( obj, cb ) {
  return Object.keys( obj ).reduce( function( result, key ) {
    var pair = cb( obj[key], key );
    result[ pair[0] ] = pair[1];
    return result;
  }, {} );
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
  return generalResponseTransform( resp )[0];
}

function generalResponseTransform ( resp ) {
  return resp.resultSets.map( function ( resultSet ) {
    return collectify( jsifyHeaders( resultSet.headers ), resultSet.rowSet );
  });
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
  var keys = Object.keys( matcher );
  for ( var i = 0; i < keys.length; i++ ) {
    if ( matcher[keys[i]] !== against[keys[i]] ) {
      return false;
    }
  }
  return true;
}

function findWhere ( matcher, arr ) {
  for ( var i = 0; i < arr.length; i++ ) {
    if ( matches( matcher, arr[i] ) ) {
      return arr[i];
    }
  }
  return null;
}

function mergeCollections ( idProp, collections ) {
  var first = collections.shift();
  return first.map( function ( itemA ) {
    var matcher = {};
    matcher[idProp] = itemA[idProp];
    var findMatch = partial( findWhere, matcher );
    var items = [{}, itemA].concat( collections.map( findMatch ) );
    return merge.apply( null, items );
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

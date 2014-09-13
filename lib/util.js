require( "./polyfills" );

function toString ( obj ) {
  return Object.prototype.toString.call( obj );
}

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

// convert an array of headers and an array of rows
// into an array of objects
function collectify ( headers, rows ) {
  return rows.map( function ( item ) {
    return item.reduce( function ( model, val, i ) {
      model[ headers[i] ] = val;
      return model;
    }, {} );
  });
}

function translateKeys ( keyMap, obj ) {
  if ( typeof obj !== "object" ) {
    console.log( obj );
    throw new Error("needs an object");
  }
  return Object.keys( obj ).reduce( function ( result, key ) {
    var newKey = keyMap[key];
    if ( newKey === undefined ) {
      throw new Error( "Key not found in translator." );
    }
    result[newKey] = obj[ key ];
    return result;
  }, {} );
}

// partial application, cribbed from fast.js
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

// detects whether a string contains a hyphen or dash
// (very rough way of detecting dashed or snake_case strings)
function hasDashOrHyphen ( str ) {
  return str.contains( "-" ) || str.contains( "_" );
}

// downcases the first letter in a string
// good for converting from PascalCase to camelCase
function downcaseFirst ( str ) {
  return str[0].toLowerCase() + str.slice( 1 );
}

// converts a dash or hypen separated string to camelCase
function unDashHyphen ( str ) {
  return str.trim().toLowerCase().replace( /[-_\s]+(.)?/g, function ( match, c ){
    return c ? c.toUpperCase() : "";
  });
}

// picks which method to use and returns the converted string
function jsify ( str ) {
  if ( hasDashOrHyphen( str ) ) {
    return unDashHyphen( str );
  }
  return downcaseFirst( str );
}

function jsifyHeaders ( arr ) {
  return arr.map( jsify );
}

function baseResponseTransform ( resp ) {
  var data = resp.resultSets[0];
  var headers = jsifyHeaders( data.headers );
  return collectify( headers, data.rowSet );
}

function generalResponseTransform ( resp ) {
  return resp.resultSets.reduce( function ( ret, resultSet ) {
    var name = downcaseFirst( resultSet.name );
    ret[name] = collectify( jsifyHeaders( resultSet.headers ), resultSet.rowSet );
    return ret;
  }, {} );
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

// check if *against* has same values for each key in *matcher*
function matches ( matcher, against ) {
  var keys = Object.keys( matcher );
  for ( var i = 0; i < keys.length; i++ ) {
    if ( matcher[keys[i]] !== against[keys[i]] ) {
      return false;
    }
  }
  return true;
}

// check if *against* has same value for any key in *matcher*
function matchesAny ( matcher, against ) {
  var keys = Object.keys( matcher );
  for ( var i = 0; i < keys.length; i++ ) {
    if ( matcher[keys[i]] === against[keys[i]] ) {
      return true;
    }
  }
  return false;
}

// returns first item in *arr* for which test(item) is truthy
function find ( test, arr ) {
  for ( var i = 0; i < arr.length; i++ ) {
    if ( test( arr[i] ) ) {
      return arr[i];
    }
  }
  return null;
}

// find with matches
function findWhere ( matcher, arr ) {
  return find( partial( matches, matcher ), arr );
}

// find with matchesAny
function findWhereAny ( matcher, arr ) {
  return find( partial( matchesAny, matcher ), arr );
}

// merges collections (arrays of objects) based on a shared unique identifier
// current (mediocre) implementation
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

function usDateFormat ( param ) {
  var date;
  function padValue ( num ) {
    num = String( num );
    return ( num.length === 1 ? "0" : "" ) + num;
  }
  date = new Date( param );
  if ( isNaN( date ) ) {
    throw new Error( "Invalid Date" );
  }
  return [ padValue( date.getMonth() + 1 ), padValue( date.getDate() ), date.getFullYear() ].join( "/" );
}

module.exports = {
  shallowCopy: shallowCopy,
  mapKeysAndValues: mapKeysAndValues,
  mapValues: mapValues,
  mapKeys: mapKeys,
  merge: merge,
  find: find,
  findWhere: findWhere,
  findWhereAny: findWhereAny,
  pickKeys: pickKeys,
  collectify: collectify,
  translateKeys: translateKeys,
  partial: partial,
  jsifyHeaders: jsifyHeaders,
  mergeCollections: mergeCollections,
  baseResponseTransform: baseResponseTransform,
  generalResponseTransform: generalResponseTransform,
  playersResponseTransform: playersResponseTransform
};

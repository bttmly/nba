/*
SeasonType is required; TeamID is required; PlayerID is required; The GameID property is required.; The Outcome property is required.; The Location property is required.; Month is required; The SeasonSegment property is required.; The DateFrom property is required.; The DateTo property is required.; OpponentTeamID is required; The VsConference property is required.; The VsDivision property is required.; The Position property is required.; The RookieYear property is required.; The GameSegment property is required.; Period is required; LastNGames is required; The ContextMeasure property is required.
 */
var request = require( 'superagent' );
var extend = require( 'extend' );
var Promise = require( 'es6-promise' ).Promise;

var url = "http://stats.nba.com/stats/shotchartdetail";

var qsParams = {
  'Season': '2013-14',
  'SeasonType': 'Regular Season',
  'LeagueID': '00',
  'PlayerID': '0',
  'TeamID': '0',
  'GameID': '',
  'Outcome': '',
  'Location': '',
  'Month': '0',
  'SeasonSegment': '',
  'DateFrom': '',
  'DateTo': '',
  'OpponentTeamID': '0',
  'VsConference': '',
  'VsDivision': '',
  'Position': '',
  'RookieYear': '',
  'GameSegment': '',
  'Period': '0',
  'LastNGames': '0',
  'ContextFilter': '',
  'ContextMeasure': 'FG_PCT',
  'zone-mode': 'basic'
};

module.exports = function ( options ) {
  if ( options == null ) {
    options = {};
  }

  return new Promise( function ( resolve, reject ) {
    request
      .get( url )
      .query( extend( options, qsParams ) )
      .end( function ( response ) {
        console.log( response );
        if ( response.ok ) {
          resolve( response );
        } else {
          reject( response );
        }
      });
  });
};

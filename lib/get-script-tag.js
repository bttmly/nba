"use strict";
var assign = require("object-assign");

// var Promise = require("./promise");

// module.exports = function scriptTagStrategy (url, globalName) {
//   return new Promise(function (resolve, reject) {
//     var script, prev, temp;

//     function cleanup () {
//       document.body.removeChild(script);
//       script = null;
//       window[globalName] = prev;
//     }

//     prev = window[globalName];
//     script = document.createElement("script");

//     Object.assign(script, {
//       src: url,
//       onload: function () {
//         temp = window[globalName];
//         cleanup();
//         resolve(temp);
//       },
//       onerror: function () {
//         cleanup();
//         reject();
//       }
//     });

//     document.body.appendChild(script);
//   });
// };

module.exports = function scriptTagStrategy (url, globalName, callback) {
    var script, prev, temp;

    function cleanup () {
      document.body.removeChild(script);
      script = null;
      window[globalName] = prev;
    }

    prev = window[globalName];
    script = document.createElement("script");

    assign(script, {
      src: url,
      onload: function () {
        temp = window[globalName];
        cleanup();
        callback(null, temp);
      },
      onerror: function () {
        cleanup();
        callback(new Error(url));
      }
    });

    document.body.appendChild(script);
  });
};
require("babel/register")({stage: 0});
var endpoints = require("../src/stats-endpoints");
var values = require("../src/values");

var usedValues = new Set([].concat(...Object.keys(endpoints).map(k => Object.keys(endpoints[k].defaults))));
console.log("used num:", usedValues.size);

var handledValues = new Set(Object.keys(values));
console.log("handled num:", handledValues.size);

var unused = [...handledValues].filter(v => !usedValues.has(v));
console.log("unused", unused, "\n");

var unhandled = [...usedValues].filter(v => !handledValues.has(v));
console.log("unhandled", unhandled);

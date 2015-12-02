(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],3:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],4:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":2,"./encode":3}],5:[function(require,module,exports){
/**
 * Module dependencies
 */

var debug = require('debug')('jsonp');

/**
 * Module exports.
 */

module.exports = jsonp;

/**
 * Callback index.
 */

var count = 0;

/**
 * Noop function.
 */

function noop(){}

/**
 * JSONP handler
 *
 * Options:
 *  - param {String} qs parameter (`callback`)
 *  - prefix {String} qs parameter (`__jp`)
 *  - name {String} qs parameter (`prefix` + incr)
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */

function jsonp(url, opts, fn){
  if ('function' == typeof opts) {
    fn = opts;
    opts = {};
  }
  if (!opts) opts = {};

  var prefix = opts.prefix || '__jp';

  // use the callback name that was passed if one was provided.
  // otherwise generate a unique name by incrementing our counter.
  var id = opts.name || (prefix + (count++));

  var param = opts.param || 'callback';
  var timeout = null != opts.timeout ? opts.timeout : 60000;
  var enc = encodeURIComponent;
  var target = document.getElementsByTagName('script')[0] || document.head;
  var script;
  var timer;


  if (timeout) {
    timer = setTimeout(function(){
      cleanup();
      if (fn) fn(new Error('Timeout'));
    }, timeout);
  }

  function cleanup(){
    if (script.parentNode) script.parentNode.removeChild(script);
    window[id] = noop;
    if (timer) clearTimeout(timer);
  }

  function cancel(){
    if (window[id]) {
      cleanup();
    }
  }

  window[id] = function(data){
    debug('jsonp got', data);
    cleanup();
    if (fn) fn(null, data);
  };

  // add qs component
  url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
  url = url.replace('?&', '?');

  debug('jsonp req "%s"', url);

  // create script
  script = document.createElement('script');
  script.src = url;
  target.parentNode.insertBefore(script, target);

  return cancel;
}

},{"debug":6}],6:[function(require,module,exports){

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Use chrome.storage.local if we are in an app
 */

var storage;

if (typeof chrome !== 'undefined' && typeof chrome.storage !== 'undefined')
  storage = chrome.storage.local;
else
  storage = localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      storage.removeItem('debug');
    } else {
      storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = storage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage(){
  try {
    return window.localStorage;
  } catch (e) {}
}

},{"./debug":7}],7:[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":8}],8:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options.long
    ? long(val)
    : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],9:[function(require,module,exports){
var Assertions = require("./lib/assertions")
var AssertionError = require("./lib/assertion_error")
module.exports = Must

/**
 * The main class that wraps the asserted object and that you call matchers on.
 * 
 * Most of the time you'll be using
 * [`Object.prototype.must`](#Object.prototype.must) to create this wrapper, but
 * occasionally you might want to assert `null`s or `undefined`s and in those
 * cases assigning `Must` to something like `expect` or `demand` works nicely.
 *
 * @example
 * true.must.be.true()
 * [].must.be.empty()
 *
 * var expect = require("must")
 * expect(null).be.null()
 *
 * var demand = require("must")
 * demand(undefined).be.undefined()
 *
 * @class Must
 * @constructor
 * @param actual
 */
function Must(actual) {
  if (!(this instanceof Must)) return new Must(actual)
  this.actual = actual
}

Must.prototype = Object.create(Assertions, {
  constructor: {value: Must, writable: true, configurable: true}
})

Must.AssertionError = AssertionError

/**
 * Creates an instance of [`Must`](#Must) with the current object for asserting
 * and calling matchers on.
 *
 * This property is non-enumerable just like built-in properties, so
 * it'll never interfere with any regular usage of objects.
 *
 * Please note that JavaScript does not allow method calls on `null` or
 * `undefined`, so you'll sometimes have to call [`Must`](#Must) on them by
 * hand.  Assigning `require("must")` to `expect` or `demand` works well with
 * those cases.
 *
 * @example
 * true.must.be.true()
 * [].must.be.empty()
 * 
 * @property must
 * @for Object
 * @on prototype
 */
Object.defineProperty(Object.prototype, "must", {
  get: function() { return new Must(unbox(this)) },

  set: function(value) {
    Object.defineProperty(this, "must", {
      value: value,
      configurable: true,
      enumrable: true,
      writable: true
    })
  },

  // Without configurable, can't redefine it when reloading this file, e.g.
  configurable: true
})

function unbox(obj) {
  // No need to worry about values from other contexts because they won't have
  // the global "must" property on their objects in the first place. And if
  // they did, their context would have its own unbox function with correct
  // references.
  return obj instanceof Boolean ||
         obj instanceof String ||
         obj instanceof Number ? obj.valueOf() : obj
}

},{"./lib/assertion_error":10,"./lib/assertions":11}],10:[function(require,module,exports){
module.exports = AssertionError

/**
 * Error object thrown when an assertion fails.
 *
 * @class AssertionError
 * @constructor
 * @param message
 * @param [options]
 */
function AssertionError(msg, opts) {
  this.message = msg

  /**
   * The asserted object.
   *
   * @property actual
   */
  if (opts && "actual" in opts) this.actual = opts.actual

  /**
   * If the matcher took an argument or asserted against something (like
   * `foo.must.be.true()`), then this is the expected value.
   *
   * @property expected
   */
  if (opts && "expected" in opts) this.expected = opts.expected

  /**
   * Whether it makes sense to compare objects granularly or even show a diff
   * view of the objects involved.  
   *
   * Most matchers (e.g. [`empty`](#Must.prototype.empty) and
   * [`string`](#Must.prototype.string)) are concrete, strict and atomic and
   * don't lend themselves to be compared property by property.  Others however,
   * like [`eql`](#Must.prototype.eql), are more granular and comparing them
   * line by line helps understand how they differ.
   *
   * @property diffable
   */
  if (opts && "diffable" in opts) this.diffable = opts.diffable

  /**
   * The stack trace starting from the code that called `must`.
   *
   * @property stack
   */
  var caller = opts && opts.caller || arguments.callee.caller
  if (Error.captureStackTrace) Error.captureStackTrace(this, caller)
}

AssertionError.prototype = Object.create(Error.prototype, {
  constructor: {value: AssertionError, configurable: true, writable: true}
})

AssertionError.prototype.name = "AssertionError"

/**
 * Some test runners (like [Mocha](http://visionmedia.github.io/mocha/)) expect
 * this property instead.
 *
 * @property showDiff
 * @alias diffable
 */
AssertionError.prototype.__defineGetter__("showDiff", function() {
  return this.diffable
})

},{}],11:[function(require,module,exports){
/**
 * @class Must
 */
var AssertionError = require("./assertion_error")
var kindof = require("kindof")
var inspect = require("./inspect")

exports = module.exports = {
  /**
   * Can also be used a pass-through property for a fluent chain.
   *
   * @example
   * "Hello".must.be.a.string()
   * new Date().must.be.a(Date)
   *
   * @method a
   * @alias instanceof
   */
  get a() {
    return chain.call(this, this.instanceof)
  },

  /**
   * Can also be used a pass-through property for a fluent chain.
   *
   * @example
   * [1, 2].must.be.an.array()
   * new AwesomeClass().must.be.an(AwesomeClass)
   *
   * @method an
   * @alias instanceof
   */
  get an() {
    return chain.call(this, this.instanceof)
  },

  /**
   * Pass-through property for a fluent chain.
   *
   * @example
   * (42).must.be.at.most(69)
   * (1337).must.be.at.least(1337)
   *
   * @property at
   * @on prototype
   */
  get at() {
    return this
  },

  /**
   * Can also be used as a pass-through property for a fluent chain.
   *
   * @example
   * true.must.be.true()
   * (42).must.be(42)
   *
   * @method be
   * @alias equal
   */
  get be() {
    return chain.call(this, this.equal)
  },

  /**
   * Pass-through property for a fluent chain.
   *
   * @example
   * [1, 2].must.have.length(2)
   *
   * @property have
   * @on prototype
   */
  get have() {
    return this
  },

  /**
   * Can also be used as a pass-through property for a fluent chain.
   *
   * @example
   * var claim = require("must")
   * claim(true).is.true()
   * claim(42).is(42)
   *
   * @method is
   * @alias equal
   */
  get is() {
    return chain.call(this, this.equal)
  },

  /**
   * Inverse the assertion.  
   * Use it multiple times to create lots of fun!
   * `true.must.not.not.be.true()` :-)
   *
   * @example
   * true.must.not.be.true()
   * [].must.not.be.empty()
   *
   * @property not
   * @on prototype
   */
  get not() {
    var must = new this.constructor(this.actual)
    must.negative = !this.negative
    return must
  },

  /**
   * Pass-through property for a fluent chain.
   *
   * @example
   * var expect = require("must")
   * expect(true).to.be.true()
   *
   * var wish = require("must")
   * wish(life).to.be.truthy()
   *
   * @property to
   * @on prototype
   */
  get to() {
    return this
  }
}

/**
 * Assert object is `true` or `new Boolean(true)`.
 *
 * @example
 * true.must.be.true()
 *
 * @method true
 */
exports.true = function() {
  var kind = kindof(this.actual)
  insist.call(this, kind == "boolean" && this.actual == true, "be", true)
}

/**
 * Assert object is `false` or `new Boolean(false)`.
 *
 * @example
 * false.must.be.false()
 * @method false
 *
 */
exports.false = function() {
  var kind = kindof(this.actual)
  insist.call(this, kind == "boolean" && this.actual == false, "be", false)
}

/**
 * Assert object is `null`.  
 *
 * Because JavaScript does not allow method calls on `null`, you'll have to
 * wrap an expected null with [`Must`](#Must). Assigning `require("must")` to
 * `expect` or `demand` works well.
 *
 * If you want to assert that an object's property is `null`, see
 * [`property`](#Must.prototype.property).
 *
 * @example
 * var demand = require("must")
 * demand(null).be.null()
 *
 * @method null
 */
exports.null = function() {
  insist.call(this, this.actual === null, "be", null)
}

/**
 * Assert object is `undefined`.
 *
 * Because JavaScript does not allow method calls on `undefined`, you'll have to
 * wrap an expected undefined with [`Must`](#Must). Assigning `require("must")`
 * to `expect` or `demand` works well.
 *
 * If you want to assert that an object's property is `undefined`, see
 * [`property`](#Must.prototype.property).
 *
 * @example
 * var demand = require("must")
 * demand(undefined).be.undefined()
 *
 * @method undefined
 */
exports.undefined = function() {
  insist.call(this, this.actual === undefined, "be", undefined)
}

/**
 * Assert object is a boolean (`true` or `false`).  
 * Considers boxed boolean objects (`new Boolean`) also booleans.
 *
 * @example
 * true.must.be.a.boolean()
 *
 * @method boolean
 */
exports.boolean = function() {
  insist.call(this, kindof(this.actual) == "boolean", "be a boolean")
}

/**
 * Assert object is a number.  
 * Considers boxed number objects (`new Number`) also numbers.
 *
 * @example
 * (42).must.be.a.number()
 *
 * @method number
 */
exports.number = function() {
  insist.call(this, kindof(this.actual) == "number", "be a number")
}

/**
 * Assert object is a string.  
 * Considers boxed string objects (`new String`) also strings.
 *
 * @example
 * "Hello".must.be.a.string()
 *
 * @method string
 */
exports.string = function() {
  insist.call(this, kindof(this.actual) == "string", "be a string")
}

/**
 * Assert object is a date.
 *
 * @example
 * new Date().must.be.a.date()
 *
 * @method date
 */
exports.date = function() {
  insist.call(this, kindof(this.actual) == "date", "be a date")
}

/**
 * Assert object is a regular expression.
 *
 * @example
 * /[a-z]/.must.be.a.regexp()
 *
 * @method regexp
 */
exports.regexp = function() {
  insist.call(this, kindof(this.actual) == "regexp", "be a regular expression")
}

/**
 * Assert object is an array.
 *
 * @example
 * [42, 69].must.be.an.array()
 *
 * @method array
 */
exports.array = function() {
  insist.call(this, Array.isArray(this.actual), "be an array")
}

/**
 * Assert object is a function.
 *
 * @example
 * (function() {}).must.be.a.function()
 *
 * @method function
 */
exports.function = function() {
  insist.call(this, typeof this.actual == "function", "be a function")
}

/**
 * Assert object is an.. object.
 *
 * @example
 * ({}).must.be.an.object()
 *
 * @method object
 */
exports.object = function() {
  var ok = this.actual && typeof this.actual == "object"
  insist.call(this, ok, "be an object")
}

/**
 * Assert object is truthy (`!!obj`).
 *
 * Only `null`, `undefined`, `0`, `false` and `""` are falsy in JavaScript.
 * Everything else is truthy.
 *
 * @example
 * (42).must.be.truthy()
 * "Hello".must.be.truthy()
 *
 * @method truthy
 */
exports.truthy = function() {
  insist.call(this, this.actual, "be truthy")
}

/**
 * Assert object is falsy (`!obj`).
 *
 * Only `null`, `undefined`, `0`, `false` and `""` are falsy in JavaScript.
 * Everything else is truthy.
 *
 * @example
 * 0.must.be.falsy()
 * "".must.be.falsy()
 *
 * @method falsy
 */
exports.falsy = function() {
  insist.call(this, !this.actual, "be falsy")
}

/**
 * Assert object is exists and thereby is not null or undefined.
 *
 * @example
 * 0.must.exist()
 * "".must.exist()
 * ({}).must.exist()
 *
 * @method exist
 */
exports.exist = function() {
  insist.call(this, this.actual != null, "exist")
}

/**
 * Assert that an object is an instance of something.  
 * Uses `obj instanceof expected`.
 *
 * @example
 * new Date().must.be.an.instanceof(Date)
 *
 * @method instanceof
 * @param class
 */
exports.instanceof = function(expected) {
  var ok = this.actual instanceof expected
  insist.call(this, ok, instanceofMessage, expected)
}

function instanceofMessage(expected) {
  var type = expected.displayName || expected.name || inspect(expected)
  return "be an instance of " + type
}

/**
 * @method instanceOf
 * @alias instanceof
 */
exports.instanceOf = exports.instanceof

/**
 * Assert that an object is empty.  
 * Checks either the `length` for arrays and strings or the count of
 * enumerable keys. Inherited keys also counted.
 *
 * @example
 * "".must.be.empty()
 * [].must.be.empty()
 * ({}).must.be.empty()
 *
 * @method empty
 */
exports.empty = function() {
  var length
  if (Array.isArray(this.actual) || kindof(this.actual) == "string")
    length = this.actual.length
  else if (typeof this.actual == "object" || typeof this.actual == "function")
    length = enumerableKeys(this.actual).length
  else
    length = 1

  insist.call(this, length === 0, "be empty")
}

/**
 * Assert object strict equality or identity (`===`).
 *
 * To compare value objects (like `Date` or `RegExp`) by their value rather
 * than identity, use [`eql`](#Must.prototype.eql).  
 * To compare arrays and objects by content, also use
 * [`eql`](#Must.prototype.eql).
 *
 * @example
 * (42).must.equal(42)
 *
 * var date = new Date
 * date.must.equal(date)
 *
 * @method equal
 * @param expected
 */
exports.equal = function(expected) {
  insist.call(this, this.actual === expected, "equal", expected)
}

/**
 * Assert object equality by content and if possible, recursively.  
 * Also handles circular and self-referential objects.
 *
 * For most parts it asserts strict equality (`===`), but:
 * - `Boolean` objects are compared to boolean literals.
 * - `Number` objects are compared to number literals.
 * - `String` objects are compared to string literals.
 * - `RegExp` objects are compared by their pattern and flags.
 * - `Date` objects are compared by their value.
 * - `Array` objects are compared recursively.
 * - `NaN`s are considered equivalent.
 * - Instances of the same class with a `valueOf` function are compared by its
 *   output.
 * - Plain objects and instances of the same class are compared recursively.
 *
 * **Does not coerce types** so **mismatching types fail**.  
 * Inherited enumerable properties are also taken into account.
 *
 * **Instances** are objects whose prototype's `constructor` property is set.
 * E.g. `new MyClass`.  
 * Others, like `{}` or `Object.create({})`, are **plain objects**.
 *
 * @example
 * /[a-z]/.must.eql(/[a-z]/)
 * new Date(1987, 5, 18).must.eql(new Date(1987, 5, 18))
 * ["Lisp", 42].must.eql(["Lisp", 42])
 * ({life: 42, love: 69}).must.eql({life: 42, love: 69})
 * NaN.must.eql(NaN)
 *
 * function Answer(answer) { this.answer = answer }
 * new Answer(42).must.eql(new Answer(42))
 *
 * @method eql
 * @param expected
 */
exports.eql = function(expected) {
  var ok = eql(this.actual, expected)
  insist.call(this, ok, "be equivalent to", expected, {diffable: true})
}

function eql(a, b, aStack, bStack) {
  if (a === b) return true

  var aType = isPlainObject(a) ? "plain" : kindof(a)
  var bType = isPlainObject(b) ? "plain" : kindof(b)
  if (aType != bType) return false

  if (aType == "object" || aType == "plain" || aType == "array") {
    var aPos = aStack && aStack.indexOf(a)
    var bPos = bStack && bStack.indexOf(b)
    if (aPos != bPos) return false
    if (aPos != null && ~aPos) return true

    aStack = aStack ? aStack.concat([a]) : [a]
    bStack = bStack ? bStack.concat([b]) : [b]
  }

  switch (aType) {
    case "number":
      if (isNaN(a) && isNaN(b)) return true
      // Fall through.

    case "boolean":
    case "string":
    case "date":
      return a.valueOf() == b.valueOf()

    case "regexp":
      return a.toString() === b.toString()
    
    case "array":
      if (a.length != b.length) return false
      if (a.length == 0) return true

      for (var i = 0, l = a.length; i < l; ++i) 
        if (!eql(a[i], b[i], aStack, bStack)) return false
      return true

    case "object":
      if (getConstructorOf(a) !== getConstructorOf(b)) return false
      if (getValueOf(a) && getValueOf(b)) return a.valueOf() === b.valueOf()
      // Fall through.

    case "plain":
      var aKeys = enumerableKeys(a)
      var bKeys = enumerableKeys(b)
      if (aKeys.length != bKeys.length) return false
      if (aKeys.length == 0) return true

      for (var key in a) if (!eql(a[key], b[key], aStack, bStack)) return false
      return true
  }

  return false
}

function isPlainObject(obj) {
  if (!obj) return false
  if (typeof obj != "object") return false

  var prototype = Object.getPrototypeOf(obj)
  if (prototype === null) return true
  if (!("constructor" in prototype)) return true
  return prototype.constructor === Object 
}

function getConstructorOf(obj) {
  var prototype = obj && Object.getPrototypeOf(obj)
  return prototype && prototype.constructor
}

function getValueOf(obj) {
  var valueOf = typeof obj.valueOf == "function" && obj.valueOf
  return valueOf && valueOf !== Object.prototype.valueOf ? valueOf : null
}

/**
 * Assert object includes `expected`.
 *
 * For strings it checks the text, for arrays it checks elements and for
 * objects the property values. Everything is checked with strict equals
 * (`===`).
 *
 * @example
 * "Hello, John!".must.include("John")
 * [1, 42, 3].must.include(42)
 * ({life: 42, love: 69}).must.include(42)
 *
 * @method include
 * @param expected
 */
exports.include = function(expected) {
  var found
  if (Array.isArray(this.actual) || kindof(this.actual) == "string")
    found = ~this.actual.indexOf(expected)
  else
    for (var key in this.actual)
      if (this.actual[key] === expected) { found = true; break }

  insist.call(this, found, "include", expected)
}

/**
 * @method contain
 * @alias include
 */
exports.contain = exports.include

/**
 * Assert that an array is a permutation of the given array.
 *
 * An array is a permutation of another if they both have the same elements
 * (including the same number of duplicates) regardless of their order.
 * Elements are checked with strict equals (`===`).
 *
 * @example
 * [1, 1, 2, 3].must.be.a.permutationOf([3, 2, 1, 1])
 * [7, 8, 8, 9].must.not.be.a.permutationOf([9, 8, 7])
 *
 * @method permutationOf
 * @param expected
 */
exports.permutationOf = function(expected) {
  var result = isPermutationOf(this.actual, expected)
  insist.call(this, result, "be a permutation of", expected, {diffable: true})
}

function isPermutationOf(actual, expected) {
  if (!Array.isArray(actual) || !Array.isArray(expected)) return false
  if (actual.length !== expected.length) return false

  actual = actual.slice().sort()
  expected = expected.slice().sort()
  for (var i = 0; i < actual.length; i++) {
    if (actual[i] !== expected[i]) return false
  }

  return true
}

/**
 * Assert object matches the given regular expression.
 *
 * If you pass in a non regular expression object, it'll be converted to one
 * via `new RegExp(regexp)`.
 *
 * @example
 * "Hello, John!".must.match(/john/i)
 * "Wei wu wei".must.match("wu")
 *
 * @method match
 * @param regexp
 */
exports.match = function(expected) {
  var regexp = expected instanceof RegExp ? expected : new RegExp(expected)
  insist.call(this, regexp.exec(this.actual), "match", regexp)
}

/**
 * Assert that a function throws.  
 * Optionally assert it throws `expected` (of possibly instance `constructor`).
 *
 * Given `expected`, the error is asserted as follows:
 * - A **string** is compared with the exception's `message` property.
 * - A **regular expression** is matched against the exception's `message`
 *   property.
 * - A **function** (a.k.a. constructor) is used to check if the error
 *   is an `instanceof` that constructor.
 * - All other cases of `expected` are left unspecified for now.
 *
 * Because of how JavaScript works, the function will be called in `null`
 * context (`this`). If you want to test an instance method, bind it:
 * `obj.method.bind(obj).must.throw()`.
 *
 * @example
 * function omg() { throw new Error("Everything's amazing and nobody's happy") }
 * omg.must.throw()
 * omg.must.throw("Everything's amazing and nobody's happy")
 * omg.must.throw(/amazing/)
 * omg.must.throw(Error)
 * omg.must.throw(Error, "Everything's amazing and nobody's happy")
 * omg.must.throw(Error, /amazing/)
 *
 * @method throw
 * @param [constructor]
 * @param [expected]
 */
exports.throw = function(constructor, expected) {
  if (arguments.length == 1) expected = constructor, constructor = null

  var ok, exception
  try { this.actual.call(null) } catch (ex) { ok = true; exception = ex }
  if (ok && constructor) ok = exception instanceof constructor
  if (ok && arguments.length) ok = exceptionEql(exception, expected)

  var demands = [ok, "throw"]
  if (arguments.length) demands.push(expected)
  insist.apply(this, demands)
}

function exceptionEql(actual, expected) {
  if (expected == null) return actual === expected
  // NOTE: The message in new Error(message) gets converted to a string.
  var msg = kindof(actual) == "string" ? actual : actual.message

  var kind = kindof(expected)
  if (kind == "string") return msg == expected
  if (kind == "regexp") return expected.exec(msg)
  if (kind == "function") return actual instanceof expected

  return msg === expected
}

/**
 * Assert that an object has a length property equal to `expected`.
 *
 * @example
 * "Something or other".must.have.length(18)
 * [1, 2, 3, "Four o'clock rock"].must.have.length(4)
 *
 * @method length
 * @param expected
 */
exports.length = function(expected) {
  insist.call(this, this.actual.length == expected, "have length of", expected)
}

/**
 * Assert that an object is frozen with `Object.isFrozen`.
 *
 * @example
 * Object.freeze({}).must.be.frozen()
 *
 * @method frozen
 */
exports.frozen = function() {
  insist.call(this, Object.isFrozen(this.actual), "be frozen")
}

/**
 * Assert that an object has property `property`.  
 * Optionally assert it *equals* (`===`) to `value`.
 *
 * Takes **inherited properties** into account. To not do so, see
 * [`ownProperty`](#Must.prototype.ownProperty).
 *
 * @example
 * (function() {}).must.have.property("call")
 * ({life: 42, love: 69}).must.have.property("love", 69)
 *
 * @method property
 * @param property
 * @param [value]
 */
exports.property = function(property, expected) {
  var ok = this.actual != null
  ok = ok && property in Object(this.actual)
  if (ok && arguments.length > 1) ok = this.actual[property] === expected

  var msg = "have property \"" + property + "\""
  if (arguments.length > 1) msg += " equal to " + inspect(expected)
  insist.call(this, ok, msg)
}

/**
 * Assert that an object has own property `property`.  
 * Optionally assert it *equals* (`===`) to `value`.
 *
 * **Does not** take **inherited properties** into account. To do so, see 
 * [`property`](#Must.prototype.property).
 *
 * @example
 * ({life: 42, love: 69}).must.have.ownProperty("love", 69)
 *
 * @method ownProperty
 * @param property
 * @param [value]
 */
exports.ownProperty = function(property, expected) {
  var ok = this.actual != null
  ok = ok && Object.prototype.hasOwnProperty.call(this.actual, property)
  if (ok && arguments.length > 1) ok = this.actual[property] === expected

  var msg = "have own property \"" + property + "\""
  if (arguments.length > 1) msg += " equal to " + inspect(expected)
  insist.call(this, ok, msg)
}

/**
 * @method own
 * @alias ownProperty
 */
exports.own = exports.ownProperty

/**
 * Assert that an object has only the expected enumerable `keys`.  
 * Pass an array of strings as `keys`.
 *
 * Takes **inherited properties** into account. To not do so, see
 * [`ownKeys`](#Must.prototype.ownKeys).
 *
 * @example
 * ({life: 42, love: 69}).must.have.keys(["life", "love"])
 * Object.create({life: 42}).must.have.keys(["life"])
 *
 * @method keys
 * @param keys
 */
exports.keys = function(expected) {
  var ok = this.actual != null
  var keys = ok && enumerableKeys(Object(this.actual))
  ok = ok && eql(keys.sort(), expected.sort())
  insist.call(this, ok, "have keys", expected)
}

/**
 * Assert that an object has only the expected enumerable `keys` of its own.  
 * Pass an array of strings as `keys`.
 *
 * **Does not** take **inherited properties** into account. To do so, see 
 * [`keys`](#Must.prototype.keys).
 *
 * @example
 * ({life: 42, love: 69}).must.have.ownKeys(["life", "love"])
 *
 * @method ownKeys
 * @param keys
 */
exports.ownKeys = function(expected) {
  var ok = this.actual != null
  var keys = ok && Object.keys(Object(this.actual))
  ok = ok && eql(keys.sort(), expected.sort())
  insist.call(this, ok, "have own keys", expected)
}

/**
 * Assert that an object has an enumerable property `property`.  
 * It will fail if the object lacks the property entirely.
 *
 * This also checks inherited properties in the prototype chain, something which
 * `Object.prototype.propertyIsEnumerable` itself does not do.
 *
 * For checking if a property exists *and* is non-enumerable, see
 * [`nonenumerable`](#Must.prototype.nonenumerable).
 *
 * @example
 * ({life: 42, love: 69}).must.have.enumerable("love")
 *
 * @method enumerable
 * @param property
 */
exports.enumerable = function(property) {
  var ok = this.actual != null
  ok = ok && isEnumerable(Object(this.actual), property)
  var msg = "have enumerable property \"" + property + "\""
  insist.call(this, ok, msg)
}

/**
 * @method enumerableProperty
 * @alias enumerable
 */
exports.enumerableProperty = exports.enumerable

/**
 * Assert that an object has a non-enumerable property `property`.  
 * It will fail if the object lacks the property entirely.
 *
 * This also checks inherited properties in the prototype chain, something which
 * `Object.prototype.propertyIsEnumerable` itself does not do.
 *
 * It's the inverse of [`enumerable`](#Must.prototype.enumerable).
 *
 * @example
 * (function() {}).must.have.nonenumerable("call")
 * Object.create({}, {love: {enumerable: 0}}).must.have.nonenumerable("love")
 *
 * @method nonenumerable
 * @param property
 */
exports.nonenumerable = function(property) {
  var ok = this.actual != null
  ok = ok && property in Object(this.actual)
  ok = ok && !isEnumerable(Object(this.actual), property)
  var msg = "have nonenumerable property \"" + property + "\""
  insist.call(this, ok, msg)
}

function isEnumerable(obj, name) {
  // Using propertyIsEnumerable saves a possible looping of all keys.
  if (Object.prototype.propertyIsEnumerable.call(obj, name)) return true
  for (var key in obj) if (key == name) return true
  return false
}

/**
 * @method nonenumerableProperty
 * @alias nonenumerable
 */
exports.nonenumerableProperty = exports.nonenumerable

/**
 * Assert that an object is below and less than (`<`) `expected`.  
 * Uses `<` for comparison, so it'll also work with value objects (those
 * implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.
 *
 * @example
 * (42).must.be.below(69)
 *
 * @method below
 * @param expected
 */
exports.below = function(expected) {
  insist.call(this, this.actual < expected, "be below", expected)
}

/**
 * @method lt
 * @alias below
 */
exports.lt = exports.below

/**
 * Works well with dates where saying *before* is more natural than *below* or
 * *less than*.
 *
 * To assert that a date is equivalent to another date, use
 * [`eql`](#Must.prototype.eql). For regular numbers, 
 * [`equal`](#Must.prototype.equal) is fine.
 *
 * @example
 * (42).must.be.before(1337)
 * new Date(2000, 5, 18).must.be.before(new Date(2001, 0, 1))
 *
 * @method before
 * @alias below
 */
exports.before = exports.below

/**
 * Assert that an object is at most, less than or equal to (`<=`), `expected`.  
 * Uses `<=` for comparison, so it'll also work with value objects (those
 * implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.
 *
 * @example
 * (42).must.be.at.most(69)
 * (42).must.be.at.most(42)
 *
 * @method most
 * @param expected
 */
exports.most = function(expected) {
  insist.call(this, this.actual <= expected, "be at most", expected)
}

/**
 * @method lte
 * @alias most
 */
exports.lte = exports.most

/**
 * Assert that an object is above and greater than (`>`) `expected`.  
 * Uses `>` for comparison, so it'll also work with value objects (those
 * implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.
 *
 * @example
 * (69).must.be.above(42)
 *
 * @method above
 * @param expected
 */
exports.above = function(expected) {
  insist.call(this, this.actual > expected, "be above", expected)
}

/**
 * @method gt
 * @alias above
 */
exports.gt = exports.above

/**
 * Works well with dates where saying *after* is more natural than *above* or
 * *greater than*.
 *
 * To assert that a date is equivalent to another date, use
 * [`eql`](#Must.prototype.eql). For regular numbers,
 * [`equal`](#Must.prototype.equal) is fine.
 *
 * @example
 * (1337).must.be.after(42)
 * new Date(2030, 5, 18).must.be.after(new Date(2013, 9, 23))
 *
 * @method after
 * @alias above
 */
exports.after = exports.above

/**
 * Assert that an object is at least, greater than or equal to (`>=`),
 * `expected`.  
 * Uses `>=` for comparison, so it'll also work with value objects (those
 * implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.
 *
 * @example
 * (69).must.be.at.least(42)
 * (42).must.be.at.least(42)
 *
 * @method least
 * @param expected
 */
exports.least = function(expected) {
  insist.call(this, this.actual >= expected, "be at least", expected)
}

/**
 * @method gte
 * @alias least
 */
exports.gte = exports.least

/**
 * Assert that an object is between `begin` and `end` (inclusive).  
 * Uses `<` for comparison, so it'll also work with value objects (those
 * implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.
 *
 * @example
 * (13).must.be.between(13, 69)
 * (42).must.be.between(13, 69)
 * (69).must.be.between(13, 69)
 *
 * @method between
 * @param begin
 * @param end
 */
exports.between = function(begin, end) {
  insist.call(this, begin <= this.actual && this.actual <= end, function() {
    return "be between " + inspect(begin) + " and " + inspect(end)
  })
}

function insist(ok, message, expected, opts) {
  if (!this.negative ? ok : !ok) return

  var not = this.negative ? "not " : ""
  var msg = inspect(this.actual) + " must " + not
  msg += typeof message == "function" ? message(expected) : message
  if (typeof message != "function" && arguments.length >= 3)
    msg += " " + inspect(expected)

  opts = opts ? Object.create(opts) : {}
  opts.actual = this.actual
  opts.caller = arguments.callee.caller
  if (arguments.length >= 3) opts.expected = expected
  throw new AssertionError(msg, opts)
}

function chain(fn) {
  fn.apply = fn.apply
  fn.bind = fn.bind
  fn.call = fn.call
  fn.name = fn.name
  fn.toString = fn.toString
  fn.__proto__ = this
  return fn
}

function enumerableKeys(obj) {
  var keys = []
  for (var key in obj) keys.push(key)
  return keys
}

},{"./assertion_error":10,"./inspect":12,"kindof":13}],12:[function(require,module,exports){
var kindof = require("kindof")

module.exports = function(obj) {
  var root = obj

  switch (kindof(obj)) {
    case "undefined": return "undefined"
    case "number": return obj.toString()
    case "regexp": return obj.toString()
    case "date": return obj.toISOString()
    case "function": return obj.toString()

    case "object":
      obj = flatten(obj)
      // Fall through.

    default:
      var stack = []
      return JSON.stringify(obj, function(key, value) {
        if (!stack.length) return stack.push(value), value

        var thisPos = stack.indexOf(this)
        ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)

        if (value === root || ~stack.indexOf(value)) return "[Circular]"
        return value === undefined ? "[Undefined]" : value
      })
  }
}

function flatten(obj) {
  var flat = {}
  for (var key in obj) flat[key] = obj[key]
  return flat
}

},{"kindof":13}],13:[function(require,module,exports){
if (typeof module != "undefined") module.exports = kindof

function kindof(obj) {
  if (obj === undefined) return "undefined"
  if (obj === null) return "null"

  switch (Object.prototype.toString.call(obj)) {
    case "[object Boolean]": return "boolean"
    case "[object Number]": return "number"
    case "[object String]": return "string"
    case "[object RegExp]": return "regexp"
    case "[object Date]": return "date"
    case "[object Array]": return "array"
    default: return typeof obj
  }
}

},{}],14:[function(require,module,exports){
"use strict";

var qs = require("querystring");
var jsonp = require("jsonp");

var transportConfig = require("./transport-config");

function getJsonp(url, query, callback) {
  url += "?" + qs.stringify(query);
  jsonp(url, { timeout: transportConfig.timeout }, function (err, result) {
    if (err) {
      // for compatibility with timeouts from request module
      if (err.message === "Timeout") err.code = "ETIMEDOUT";
      callback(err);
    }
    callback(null, result);
  });
}

module.exports = getJsonp;

},{"./transport-config":17,"jsonp":5,"querystring":4}],15:[function(require,module,exports){
"use strict";

var defaults = {
  season: 2015
};

function sportVuTransform(x) {
  return x;
}

module.exports = {
  "speed": {
    url: "http://stats.nba.com/js/data/sportvu/__season__/speedData.json",
    defaults: defaults,
    transform: sportVuTransform
  },
  "touches": {
    url: "http://stats.nba.com/js/data/sportvu/__season__/touchesData.json",
    defaults: defaults,
    transform: sportVuTransform
  },
  "passing": {
    url: "http://stats.nba.com/js/data/sportvu/__season__/passingData.json",
    defaults: defaults,
    transform: sportVuTransform
  },
  "defense": {
    url: "http://stats.nba.com/js/data/sportvu/__season__/defenseData.json",
    defaults: defaults,
    transform: sportVuTransform
  },
  "rebounding": {
    url: "http://stats.nba.com/js/data/sportvu/__season__/reboundingData.json",
    defaults: defaults,
    transform: sportVuTransform
  },
  "drives": {
    url: "http://stats.nba.com/js/data/sportvu/__season__/drivesData.json",
    defaults: defaults,
    transform: sportVuTransform
  },
  "shooting": {
    url: "http://stats.nba.com/js/data/sportvu/__season__/shootingData.json",
    defaults: defaults,
    transform: sportVuTransform
  },
  "catchShoot": {
    url: "http://stats.nba.com/js/data/sportvu/__season__/catchShootData.json",
    defaults: defaults,
    transform: sportVuTransform
  },
  "pullUpShoot": {
    url: "http://stats.nba.com/js/data/sportvu/__season__/pullUpShootData.json",
    defaults: defaults,
    transform: sportVuTransform
  }
};

},{}],16:[function(require,module,exports){
(function (process){
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require("./util/string");

var interpolate = _require.interpolate;

var endpoints = require("./sport-vu-endpoints");

var transport = require("./get-json");

var sportVu = Object.create({
  setTransport: function setTransport(_transport) {
    transport = _transport;
  }
});

Object.keys(endpoints).forEach(function (key) {
  sportVu[key] = makeSportVuMethod(endpoints[key]);
});

function makeSportVuMethod(endpoint) {
  var makeUrl = interpolate(endpoint.url);

  return function sportVuMethod(options, callback) {
    if (process.browser) {
      throw new Error("SportVu does not support JSONP");
    }

    if (typeof options === "function") {
      callback = options;
      options = {};
    }

    if (typeof callback !== "function") {
      throw new TypeError("Must pass a callback function.");
    }

    options = _extends({}, endpoint.defaults, options);

    transport(makeUrl(options), {}, callback);
  };
}

module.exports = sportVu;

}).call(this,require('_process'))
},{"./get-json":14,"./sport-vu-endpoints":15,"./util/string":18,"_process":1}],17:[function(require,module,exports){
"use strict";

module.exports = {
  timeout: 60 * 1000
};

},{}],18:[function(require,module,exports){
"use strict";

function hasUnderscoreOrHyphen(str) {
  return str.indexOf("-") > -1 || str.indexOf("_") > -1;
}

// downcases the first letter in a string
// good for converting from PascalCase to camelCase
function downcaseFirst(str) {
  return str[0].toLowerCase() + str.slice(1);
}

// converts a dash or hypen separated string to camelCase
function unDashHyphen(str) {
  return str.trim().toLowerCase().replace(/[-_\s]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : "";
  });
}

function isAllUpperCase(str) {
  return [].every.call(str, function (ch) {
    var n = ch.charCodeAt(0);
    return n >= 65 && n <= 90;
  });
}

function jsify(str) {
  if (isAllUpperCase(str)) {
    return str.toLowerCase();
  }

  if (hasUnderscoreOrHyphen(str)) {
    return unDashHyphen(str);
  }
  return downcaseFirst(str);
}

function interpolate(_str) {
  return function (obj) {
    var str = _str;
    Object.keys(obj).forEach(function (key) {
      str = str.replace(new RegExp("__" + key + "__", "g"), obj[key]);
    });
    return str;
  };
}

module.exports = {
  hasUnderscoreOrHyphen: hasUnderscoreOrHyphen,
  downcaseFirst: downcaseFirst,
  unDashHyphen: unDashHyphen,
  isAllUpperCase: isAllUpperCase,
  jsify: jsify,
  interpolate: interpolate
};

},{}],19:[function(require,module,exports){
(function (global){
"use strict";

var expect = require("must");
delete Object.prototype.must;

var sportVu = require("../../src/sport-vu");

// for interactive inspection
global.SportVuData = {};

describe("#speed", function () {
  it("works", function (done) {
    sportVu.speed(function (err, data) {
      expect(err).to.not.exist();
      global.SportVuData.speed = data;
      done();
    });
  });
});

describe("#touches", function () {
  it("works", function (done) {
    sportVu.touches(function (err, data) {
      expect(err).to.not.exist();
      global.SportVuData.touches = data;
      done();
    });
  });
});

describe("#passing", function () {
  it("works", function (done) {
    sportVu.passing(function (err, data) {
      expect(err).to.not.exist();
      global.SportVuData.passing = data;
      done();
    });
  });
});

describe("#defense", function () {
  it("works", function (done) {
    sportVu.defense(function (err, data) {
      expect(err).to.not.exist();
      global.SportVuData.defense = data;
      done();
    });
  });
});

describe("#rebounding", function () {
  it("works", function (done) {
    sportVu.rebounding(function (err, data) {
      expect(err).to.not.exist();
      global.SportVuData.rebounding = data;
      done();
    });
  });
});

describe("#drives", function () {
  it("works", function (done) {
    sportVu.drives(function (err, data) {
      expect(err).to.not.exist();
      global.SportVuData.drives = data;
      done();
    });
  });
});

describe("#shooting", function () {
  it("works", function (done) {
    sportVu.shooting(function (err, data) {
      expect(err).to.not.exist();
      global.SportVuData.shooting = data;
      done();
    });
  });
});

describe("#catchShoot", function () {
  it("works", function (done) {
    sportVu.catchShoot(function (err, data) {
      expect(err).to.not.exist();
      global.SportVuData.catchShoot = data;
      done();
    });
  });
});

describe("#pullUpShoot", function () {
  it("works", function (done) {
    sportVu.pullUpShoot(function (err, data) {
      expect(err).to.not.exist();
      global.SportVuData.pullUpShoot = data;
      done();
    });
  });
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../src/sport-vu":16,"must":9}]},{},[19]);

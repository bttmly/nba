module.exports = {
  nonEnumRewire: function (rewiredModule) {
    var methods = [
      "__get__",
      "__set__",
      "__with__"
    ];

    methods.forEach( function (key) {
      if (rewiredModule[key] === undefined) {
        throw new Error("Not a rewired module");
      }
      var func = rewiredModule[key];

      Object.defineProperty(rewiredModule, key, {
        enumerable: false,
        value: func
      });
    });

    return rewiredModule;
  }
}
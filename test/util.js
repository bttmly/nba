var util = require("../lib/util");
var chai = require("chai");
var should = chai.should();

describe("util.contains()", function () {
  it("should return true if an item is in the array", function() {
    var result = util.contains("a", ["a", "b", "c"])
    result.should.equal(true);
  });

  it("should return false if the item isn't in the array", function () {
    var result = util.contains("d", ["a", "b", "c"])
    result.should.equal(false);
  })
});

describe("util.find()", function () {
  function test(item) {
    if (item.hello === "world") {
      return true;
    }
    return false;
  }

  it("should return the first item for which the test function is truthy", function () {
    var result = util.find(test, [{ hello: "there"}, { hello: "world"}, { goodbye: "world"}]);
    result.should.eql({ hello: "world"});
  });

  it("should return null if no item is true for the test function", function () {
    var result = util.find(test, [{ hello: "there"}, "hello", "world"]);
    should.not.exist(result);
  });
});

describe("util.downCaseFirst()", function () {
  it("should downcase the first character in a string if it's a letter", function () {
    var result = util.downcaseFirst("HelloWorld");
    result.should.equal("helloWorld");
  });
});

describe("util.hasUnderscoreOrHyphen()", function () {
  it("should return true if the string contains a hyphen", function () {
    var result = util.hasUnderscoreOrHyphen("hello-world");
    result.should.equal(true);
  });

  it("should return true if the string contains an underscore", function () {
    var result = util.hasUnderscoreOrHyphen("hello-world");
    result.should.equal(true);
  });

  it("should return false if the string has neither an underscore or hyphen", function () {
    var result = util.hasUnderscoreOrHyphen("helloworld");
    result.should.equal(false);
  });
});
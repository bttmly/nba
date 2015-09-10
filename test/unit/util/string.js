var string = require("../../../src/util/string");
var chai = require("chai");
var should = chai.should();

describe("string.downCaseFirst()", function () {
  it("should downcase the first character in a string if it's a letter", function () {
    var result = string.downcaseFirst("HelloWorld");
    result.should.equal("helloWorld");
  });
});

describe("string.unDashHyphen()", function () {
  it("should remove any hyphens in a string and uppercase the following character", function () {
    var result = string.unDashHyphen("hello-there-world");
    result.should.equal("helloThereWorld");
  });

  it("should remove any underscores in a string and uppercase the following character", function () {
    var result = string.unDashHyphen("hello_there_world");
    result.should.equal("helloThereWorld");
  });

  it("should remove any spaces in a string and uppercase the following character", function () {
    var result = string.unDashHyphen("hello there world");
    result.should.equal("helloThereWorld");
  });
});
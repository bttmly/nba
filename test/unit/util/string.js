var string = require("../../../src/util/string");
var expect = require("must");

describe("string.downCaseFirst()", function () {
  it("should downcase the first character in a string if it's a letter", function () {
    var result = string.downcaseFirst("HelloWorld");
    expect(result).to.equal("helloWorld");
  });
});

describe("string.unDashHyphen()", function () {
  it("should remove any hyphens in a string and uppercase the following character", function () {
    var result = string.unDashHyphen("hello-there-world");
    expect(result).to.equal("helloThereWorld");
  });

  it("should remove any underscores in a string and uppercase the following character", function () {
    var result = string.unDashHyphen("hello_there_world");
    expect(result).to.equal("helloThereWorld");
  });

  it("should remove any spaces in a string and uppercase the following character", function () {
    var result = string.unDashHyphen("hello there world");
    expect(result).to.equal("helloThereWorld");
  });
});
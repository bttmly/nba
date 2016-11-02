"use strict";

var string = require("../../../lib/util/string");
var expect = require("expect");

describe("string.downCaseFirst()", function () {
  it("should downcase the first character in a string if it's a letter", function () {
    var result = string.downcaseFirst("HelloWorld");
    expect(result).toEqual("helloWorld");
  });
});

describe("string.unDashHyphen()", function () {
  it("should remove any hyphens in a string and uppercase the following character", function () {
    var result = string.unDashHyphen("hello-there-world");
    expect(result).toEqual("helloThereWorld");
  });

  it("should remove any underscores in a string and uppercase the following character", function () {
    var result = string.unDashHyphen("hello_there_world");
    expect(result).toEqual("helloThereWorld");
  });

  it("should remove any spaces in a string and uppercase the following character", function () {
    var result = string.unDashHyphen("hello there world");
    expect(result).toEqual("helloThereWorld");
  });
});
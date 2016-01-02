"use strict";
var path = require('path');
var appDir = path.dirname(require.main.filename);
var test = require(appDir+"/app/hello");
console.log(test());
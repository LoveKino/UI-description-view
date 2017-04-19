'use strict';
let cJs = null;
let unit = require('/Users/yuer/workspaceforme/category/career/container/common/ui/UI-description-view/node_modules/defcomment/src/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];



var testRets = runCases(cases, '/Users/yuer/workspaceforme/category/career/container/common/ui/UI-description-view/test/unit/dest/restraint/contentExtractor/inputValue.js');

if(typeof module === 'object') {
    module.exports = testRets;
}
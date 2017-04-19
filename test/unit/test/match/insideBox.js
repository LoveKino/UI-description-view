'use strict';
let cJs = require('/Users/yuer/workspaceforme/category/career/container/common/ui/UI-description-view/test/unit/dest/match/insideBox.js'); // require source code
let unit = require('/Users/yuer/workspaceforme/category/career/container/common/ui/UI-description-view/node_modules/defcomment/src/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];

cases.push(
    it('/Users/yuer/workspaceforme/category/career/container/common/ui/UI-description-view/test/unit/dest/match/insideBox.js', {"test":"","tar":"function"},
         'inside',
         "[\n [[\n     {left: 60, right: 74, top: 797, bottom: 859, height: 32, width: 14},\n     [[63, 37], [[4, 24], [5, 25]]],\n     {height: 874, width: 1200, x: 0, y: 0}],\n true]\n]",
         [
 [[
     {left: 60, right: 74, top: 797, bottom: 859, height: 32, width: 14},
     [[63, 37], [[4, 24], [5, 25]]],
     {height: 874, width: 1200, x: 0, y: 0}],
 true]
],
         cJs)
);

cases.push(
    it('/Users/yuer/workspaceforme/category/career/container/common/ui/UI-description-view/test/unit/dest/match/insideBox.js', {"test":"","tar":"function"},
         'getGridCoord',
         "[\n   [[{width:1200,height:874,x:0,y:0}, [85, 27], [5 + 1, 25 + 1]], [84.70588235294117,841.6296296296297]]\n]",
         [
   [[{width:1200,height:874,x:0,y:0}, [85, 27], [5 + 1, 25 + 1]], [84.70588235294117,841.6296296296297]]
],
         cJs)
);

var testRets = runCases(cases, '/Users/yuer/workspaceforme/category/career/container/common/ui/UI-description-view/test/unit/dest/match/insideBox.js');

if(typeof module === 'object') {
    module.exports = testRets;
}
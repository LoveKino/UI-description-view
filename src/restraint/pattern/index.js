'use strict';

let urlPattern = require('./urlPattern');

let colorSimilarityPattern = require('./colorSimilarityPattern');

let aroundPercentPattern = require('./aroundPercentPattern');

let {
    mergeMap, reduce
} = require('bolzano');

let equal = (v1, v2) => v1 === v2;

let contain = (pattern, content) => {
    if (pattern === '' && content === '') return true;
    if (!content) return false;
    return content.indexOf(pattern) !== -1;
};

let regExp = (pattern, content) => {
    let reg = new RegExp(pattern);
    return reg.test(content);
};

let trimEqual = (pattern = '', content = '') => {
    if (pattern === null && content !== null) return false;
    if (pattern !== null && content === null) return false;
    return pattern.trim() === content.trim();
};

module.exports = reduce([
    colorSimilarityPattern, urlPattern, aroundPercentPattern, {
        equal,
        contain,
        regExp,
        trimEqual
    }
], (prev, cur) => mergeMap(prev, cur), {});

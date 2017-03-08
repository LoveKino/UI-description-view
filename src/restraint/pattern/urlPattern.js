'use strict';

let url = require('url');

let {
    reduce, mergeMap
} = require('bolzano');

let patternProp = (match) => (prop) => (pattern, content) => {
    if (pattern === '' && content === '') return true;
    if (!content) return false;
    return match(url.parse(content)[prop], pattern);
};

let equalProp = patternProp((propV, pattern) => {
    return propV === pattern;
});

let regProp = patternProp((propV, pattern) => {
    let reg = new RegExp(pattern);
    return reg.test(propV);
});

let containProp = patternProp((propV, pattern) => {
    return propV.indexOf(pattern) !== -1;
});

let getPropPatterns = (prop) => {
    let map = {};

    map[`url_${prop}_equal`] = equalProp(prop);
    map[`url_${prop}_regExp`] = regProp(prop);
    map[`url_${prop}_contain`] = containProp(prop);

    return map;
};

module.exports = reduce(['protocol', 'hostname', 'query', 'pathname', 'path', 'href', 'hash'], (prev, cur) => {
    return mergeMap(prev, getPropPatterns(cur));
}, {});

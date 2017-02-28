'use strict';

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

module.exports = {
    equal,
    contain,
    regExp
};

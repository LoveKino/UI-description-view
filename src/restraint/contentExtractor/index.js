'use strict';

let textContent = require('./textContent');
let containImgUrl = require('./containImgUrl');
let imgUrl = require('./imgUrl');
let inputValue = require('./inputValue');
let {
    isString
} = require('basetype');

let getAttributeAsContent = (type) => (node) => {
    return node.getAttribute(type);
};

let getPlaceholder = getAttributeAsContent('placeholder');

let placeholder = (node) => {
    let nodeName = node.nodeName && node.nodeName.toLowerCase();
    if (nodeName !== 'input' && nodeName !== 'textarea') {
        return undefined; // using undefined as the fail situation
    }

    return getPlaceholder(node) || '';
};

let textLength = (node) => {
    let text = node && node.textContent;
    if (isString(text)) {
        return text.length;
    } else {
        return 0;
    }
};

module.exports = {
    textContent,
    containImgUrl,
    imgUrl,
    placeholder,
    inputValue,
    textLength
};

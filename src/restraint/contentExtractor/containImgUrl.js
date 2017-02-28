'use strict';

let {
    reduce
} = require('bolzano');

// TODO inside or not
module.exports = (node) => {
    return getImgUrlsIncludeChildren(node).join('\n');
};

let getImgUrlsIncludeChildren = (node) => {
    let imgUrls = [];
    let url = getImgUrl(node);
    if (url) {
        imgUrls.push(url);
    }

    return reduce(node.childNodes, (prev, child) => {
        return prev.concat(getImgUrlsIncludeChildren(child));
    }, imgUrls);
};

let getImgUrl = (node) => {
    if (node.tagName && node.tagName.toLowerCase() === 'img') {
        return node.getAttribute('src');
    }
};

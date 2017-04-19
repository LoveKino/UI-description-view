'use strict';

let textContent = require('./textContent');
let containImgUrl = require('./containImgUrl');
let imgUrl = require('./imgUrl');
let inputValue = require('./inputValue');

let getAttributeAsContent = (type) => (node) => {
    return node.getAttribute(type);
};

let getPlaceholder = getAttributeAsContent('placeholder');

let placeholder = (node) => {
    let nodeName = node.nodeName && node.nodeName.toLowerCase();
    if (nodeName !== 'input' && nodeName !== 'textarea') {
        return undefined; // using undefined as the fail situation
    }

    return getPlaceholder(node);
};

module.exports = {
    textContent,
    containImgUrl,
    imgUrl,
    placeholder,
    inputValue
};


!(function () {
    var __exportsVariable = require('/Users/yuer/workspaceforme/category/career/container/common/ui/UI-description-view/node_modules/defcomment/src/unit').exportsVariable;
    
})();
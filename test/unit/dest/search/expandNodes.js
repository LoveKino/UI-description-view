'use strict';

let {
    reduce, filter
} = require('bolzano');

let {
    ImageInnerNode
} = require('../util');

let expandNodes = (nodes) => {
    nodes = reduce(nodes, (prev, node) => {
        // append text node
        prev = prev.concat(filter(node.childNodes, (childNode) => {
            return childNode.nodeType === 3;
        }));

        return prev;
    }, Array.prototype.slice.call(nodes));

    let ret = reduce(nodes, (prev, node) => {
        if (node.nodeName.toLowerCase() === 'img') {
            prev.push(new ImageInnerNode(node));
        }

        return prev;
    }, nodes);

    return ret;
};

module.exports = expandNodes;


!(function () {
    var __exportsVariable = require('/Users/yuer/workspaceforme/category/career/container/common/ui/UI-description-view/node_modules/defcomment/src/unit').exportsVariable;
    
})();
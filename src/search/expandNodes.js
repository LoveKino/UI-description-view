'use strict';

let {
    union, reduce, filter
} = require('bolzano');

let {
    ImageInnerNode
} = require('../util');

let expandNodes = (nodes) => {
    nodes = reduce(nodes, (prev, node) => {
        // append text node
        prev = union(prev, filter(node.childNodes, (childNode) => {
            return childNode.nodeType === 3;
        }));
        return prev;
    }, nodes);

    return reduce(nodes, (prev, node) => {
        if (node.nodeName.toLowerCase() === 'img') {
            prev.push(new ImageInnerNode(node));
        }

        return prev;
    }, nodes);
};

module.exports = expandNodes;

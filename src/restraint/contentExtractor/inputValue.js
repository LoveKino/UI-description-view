'use strict';

module.exports = (node) => {
    let tagName = node.nodeName && node.nodeName.toLowerCase();
    if (tagName === 'input' || tagName === 'textarea') {
        return node.getAttribute('value');
    }
};

'use strict';

module.exports = (node) => {
    if (node.nodeType === 'imageInnerNode') {
        return node.getImageUrl();
    }

    return getImgUrl(node);
};

let getImgUrl = (node) => {
    if (node.tagName && node.tagName.toLowerCase() === 'img') {
        return node.getAttribute('src');
    }
};

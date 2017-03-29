'use strict';

let onecolor = require('onecolor');

let getBoundRect = (node) => {
    if (node.nodeType === 3) {
        let range = document.createRange();
        range.selectNode(node);
        let rect = range.getClientRects()[0] || range.getBoundingClientRect();
        range.detach();
        return rect;
    } else {
        return node.getBoundingClientRect();
    }
};

let getFontSize = (node) => {
    if (node.nodeType === 3) {
        return pxToInt(window.getComputedStyle(node.parentNode).getPropertyValue('font-size'));
    } else if (node.nodeType === 1) {
        return pxToInt(window.getComputedStyle(node).getPropertyValue('font-size'));
    }
};

let getColor = (node) => {
    if (node.nodeType === 3) {
        return onecolor(window.getComputedStyle(node.parentNode).getPropertyValue('color')).cssa();
    } else if (node.nodeType === 1) {
        return onecolor(window.getComputedStyle(node).getPropertyValue('color')).cssa();
    }
};

let ImageInnerNode = function(imageNode) {
    this.imageNode = imageNode;
    this.nodeType = 'imageInnerNode';
};

ImageInnerNode.prototype.getBoundingClientRect = function() {
    let rect = this.imageNode.getBoundingClientRect();
    let imageStyle = window.getComputedStyle(this.imageNode);
    let paddingLeft = pxToInt(imageStyle.getPropertyValue('padding-left'));
    let paddingRight = pxToInt(imageStyle.getPropertyValue('padding-right'));
    let paddingTop = pxToInt(imageStyle.getPropertyValue('padding-top'));
    let paddingBottom = pxToInt(imageStyle.getPropertyValue('padding-bottom'));

    let rec = {
        width: rect.width - paddingLeft - paddingRight,
        height: rect.height - paddingTop - paddingBottom,
        left: rect.left + paddingLeft,
        right: rect.right - paddingRight,
        top: rect.top + paddingTop,
        bottom: rect.bottom - paddingBottom
    };

    return rec;
};

ImageInnerNode.prototype.getImageUrl = function() {
    return this.imageNode.getAttribute('src');
};

let pxToInt = (px) => {
    return px.indexOf('px') !== -1 ? Number(px.substring(0, px.length - 2)) : Number(px);
};

module.exports = {
    getBoundRect,
    ImageInnerNode,
    pxToInt,
    getFontSize,
    getColor
};

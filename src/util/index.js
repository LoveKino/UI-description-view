'use strict';

let getBoundRect = (node) => {
    if (node.nodeType === 3) {
        let range = document.createRange();
        range.selectNode(node);
        let clientRects = range.getClientRects();
        clientRects = Array.prototype.slice.call(clientRects);

        if (!clientRects.length) return {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            right: 0,
            bottom: 0
        };

        let {
            lefts, rights, tops, bottoms, widths
        } = clientRects.reduce((prev, {
            left, right, bottom, top, width, height
        }) => {
            prev.lefts.push(left);
            prev.rights.push(right);
            prev.bottoms.push(bottom);
            prev.tops.push(top);
            prev.widths.push(width);
            prev.heights.push(height);

            return prev;
        }, {
            lefts: [],
            rights: [],
            tops: [],
            bottoms: [],
            widths: [],
            heights: []
        });

        let rect = {
            left: Math.min(...lefts),
            top: Math.min(...tops),
            width: Math.max(...widths),
            height: clientRects.reduce((prev, {
                height
            }) => prev + height, 0),
            right: Math.max(...rights),
            bottom: Math.max(...bottoms)
        };
        rect.leftOffset = clientRects[0].left - rect.left;
        range.detach();
        return rect;
    } else {
        return node.getBoundingClientRect();
    }
};

let getFontSize = (node) => {
    if (node.nodeType === 3) {
        return window.getComputedStyle(node.parentNode).getPropertyValue('font-size');
    } else if (node.nodeType === 1) {
        return window.getComputedStyle(node).getPropertyValue('font-size');
    }
};

let getColor = (node) => {
    if (node.nodeType === 3) {
        return window.getComputedStyle(node.parentNode).getPropertyValue('color');
    } else if (node.nodeType === 1) {
        return window.getComputedStyle(node).getPropertyValue('color');
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

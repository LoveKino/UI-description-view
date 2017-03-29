'use strict';

let onecolor = require('onecolor');

let {
    getFontSize, getColor
} = require('../../util');

let getStyle = (styleName) => (node) => {
    if ((node.nodeType === 1 || node.nodeType === 3) && styleName === 'font-size') {
        return getFontSize(node);
    }
    if ((node.nodeType === 1 || node.nodeType === 3) && styleName === 'color') {
        return getColor(node);
    }

    if (node.nodeType !== 1) return null;

    let ret = window.getComputedStyle(node).getPropertyValue(styleName);
    if (styleName === 'background-color') {
        ret = onecolor(ret).cssa();
    }
    return ret;
};

module.exports = {
    'background-color': getStyle('background-color'),
    'font-size': getStyle('font-size'),
    'color': getStyle('color')
};

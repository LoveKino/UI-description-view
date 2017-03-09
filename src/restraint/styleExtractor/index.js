'use strict';

let onecolor = require('onecolor');

let {
    pxToInt
} = require('../../util');

let getStyle = (styleName) => (node) => {
    if (node.nodeType !== 1) return null;
    let ret = window.getComputedStyle(node).getPropertyValue(styleName);
    if (styleName === 'background-color' || styleName === 'color') {
        ret = onecolor(ret).cssa();
    } else if (styleName === 'font-size') {
        ret = pxToInt(ret);
    }
    return ret;
};

module.exports = {
    'background-color': getStyle('background-color'),
    'font-size': getStyle('font-size'),
    'color': getStyle('color')
};

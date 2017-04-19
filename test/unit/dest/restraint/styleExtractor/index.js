'use strict';

let onecolor = require('onecolor');

let {
    getFontSize, getColor, pxToInt
} = require('../../util');

let getStyle = (styleName) => (node) => {
    if ((node.nodeType === 1 || node.nodeType === 3) && styleName === 'font-size') {
        return pxToInt(getFontSize(node));
    }
    if ((node.nodeType === 1 || node.nodeType === 3) && styleName === 'color') {
        return onecolor(getColor(node)).cssa();
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


!(function () {
    var __exportsVariable = require('/Users/yuer/workspaceforme/category/career/container/common/ui/UI-description-view/node_modules/defcomment/src/unit').exportsVariable;
    
})();
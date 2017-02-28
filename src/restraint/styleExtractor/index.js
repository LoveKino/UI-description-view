'use strict';

let onecolor = require('onecolor');

let getStyle = (styleName) => (node) => {
    let ret = window.getComputedStyle(node).getPropertyValue(styleName);
    if (styleName === 'background-color') {
        ret = onecolor(ret).hex();
    }
    return ret;
};

module.exports = {
    'background-color': getStyle('background-color'),
    'font-size': getStyle('font-size')
};

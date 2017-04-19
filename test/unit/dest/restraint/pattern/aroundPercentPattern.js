'use strict';

let {
    isNumber
} = require('basetype');

let around = (percent) => (pattern, content) => {
    if (!isNumber(pattern) || !isNumber(content)) {
        return false;
    }

    if (pattern === 0) {
        if (content === 0) return true;
        return false;
    }

    let distance = Math.abs(pattern - content);
    let pre = distance / Math.abs(pattern);

    return pre <= percent;
};

let buildAroundPatterns = (step) => {
    let count = Math.floor(100 / step);
    let map = {};
    for (let i = 1; i < count; i++) {
        let name = `around_${i * step}Percent`;
        map[name] = around(i * step / 100);
    }

    return map;
};

module.exports = buildAroundPatterns(10);


!(function () {
    var __exportsVariable = require('/Users/yuer/workspaceforme/category/career/container/common/ui/UI-description-view/node_modules/defcomment/src/unit').exportsVariable;
    
})();
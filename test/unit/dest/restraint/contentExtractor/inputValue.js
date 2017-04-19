'use strict';

module.exports = (node) => {
    let tagName = node.nodeName && node.nodeName.toLowerCase();
    if (tagName === 'input' || tagName === 'textarea') {
        return node.value;
    }
};


!(function () {
    var __exportsVariable = require('/Users/yuer/workspaceforme/category/career/container/common/ui/UI-description-view/node_modules/defcomment/src/unit').exportsVariable;
    
})();
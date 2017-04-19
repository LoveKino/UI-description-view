'use strict';

let gridHelperView = require('./view/gridHelperView');
let search = require('./search');
let blinkView = require('./view/blinkView');
let {
    getBoundRect
} = require('./util');

let lightupSearch = (parent, gridScope, topNode) => {
    let hintGrid = gridHelperView({
        gridScope
    });
    parent.appendChild(hintGrid);

    return (rule) => {
        hintGrid.ctx.update('position', rule.position);
        let nodes = search(topNode, rule, {
            gridScope
        });

        // light up chosen nodes
        nodes.map((node) => {
            let bv = blinkView(getBoundRect(node));
            parent.appendChild(bv);

            // bink a while in the node's face
            setTimeout(() => {
                parent.removeChild(bv);
            }, 2000);
        });

        return nodes;
    };
};

module.exports = {
    lightupSearch
};


!(function () {
    var __exportsVariable = require('/Users/yuer/workspaceforme/category/career/container/common/ui/UI-description-view/node_modules/defcomment/src/unit').exportsVariable;
    
})();
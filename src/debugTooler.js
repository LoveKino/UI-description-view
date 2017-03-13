'use strict';

let gridHelperView = require('./view/gridHelperView');
let search = require('./search');
let blinkView = require('./view/blinkView');
let {
    getBoundRect
} = require('./util');

module.exports = (parent, gridScope, topNode, grid = [0, 0]) => {
    let hintGrid = gridHelperView({
        gridScope,
        grid
    });
    parent.appendChild(hintGrid);

    return (v) => {
        hintGrid.ctx.update('grid', v.position[0]);
        let nodes = search(topNode, v, {
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
    };
};

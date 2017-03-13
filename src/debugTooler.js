'use strict';

let gridHelperView = require('./view/gridHelperView');
let search = require('./search');
let blinkView = require('./view/blinkView');
let {
    getBoundRect
} = require('./util');

module.exports = (gridScope, topNode, grid = [0, 0]) => {
    let hintGrid = gridHelperView({
        gridScope,
        grid
    });
    document.body.appendChild(hintGrid);

    return (v) => {
        hintGrid.ctx.update('grid', v.position[0]);
        let nodes = search(topNode, v, {
            gridScope
        });

        // light up chosen nodes
        nodes.map((node) => {
            let bv = blinkView(getBoundRect(node));
            document.body.appendChild(bv);

            // bink a while in the node's face
            setTimeout(() => {
                document.body.removeChild(bv);
            }, 2000);
        });
    };
};

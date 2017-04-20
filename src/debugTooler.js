'use strict';

let gridHelperView = require('./view/gridHelperView');
let search = require('./search');
let blinkView = require('./view/blinkView');
let {
    getBoundRect
} = require('./util');

let lightupSearch = (parent, gridScope, topNode) => {
    gridScope = gridScope || wndsize();
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

function wndsize() {
    var w = 0;
    var h = 0;
    //IE
    if (!window.innerWidth) {
        if (!(document.documentElement.clientWidth === 0)) {
            //strict mode
            w = document.documentElement.clientWidth;
            h = document.documentElement.clientHeight;
        } else {
            //quirks mode
            w = document.body.clientWidth;
            h = document.body.clientHeight;
        }
    } else {
        //w3c
        w = window.innerWidth;
        h = window.innerHeight;
    }
    return {
        width: w,
        height: h,
        x: 0,
        y: 0
    };
}

module.exports = {
    lightupSearch
};

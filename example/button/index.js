'use strict';

let {
    udView, search, gridHelperView
} = require('../../src');

let gridScope = wndsize();
gridScope.x = 400;
gridScope.width = gridScope.width - 400;

let hintGrid = gridHelperView({
    gridScope,
    grid: [3, 3]
});
document.body.appendChild(hintGrid);

document.body.appendChild(udView({
    onchange: (v) => {
        try {
            hintGrid.ctx.update('grid', v.position[0]);

            let nodes = search(document.querySelectorAll('#searchItem *'), v, {
                gridScope
            });
            console.log(nodes);
            nodes.map((node) => {
                node.setAttribute('class', 'chosen');
                setTimeout(() => {
                    node.setAttribute('class', '');
                }, 2000);
            });
        } catch (err) {
            console.log(err);
        }
    }
}));

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

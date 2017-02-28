'use strict';

let {
    filter
} = require('bolzano');

let InsideBox = require('./insideBox');

/**
 * search target nodes accroding to the description of UI
 *
 * @param nodes array
 *   all nodes used to filter
 */
module.exports = (nodes, {
    position,
    content,
    style
}, {
    gridScope
} = {}) => {
    //
    gridScope = gridScope || wndsize();

    let insideBox = InsideBox(gridScope, position);

    // filter by position
    return filter(nodes, (node) => {
        return insideBox(node.getBoundingClientRect());
    });
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

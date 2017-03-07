'use strict';

let {
    filter, any
} = require('bolzano');

let InsideBox = require('./insideBox');

let matchContent = require('./matchContent');

let matchStyle = require('./matchStyle');

let expandNodes = require('./expandNodes');

let {
    getBoundRect
} = require('../util');

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
    nodes = expandNodes(nodes);
    //
    gridScope = gridScope || wndsize();

    let insideBox = InsideBox(gridScope, position);

    return filter(
        filter(filter(nodes, (node) => {
            let rect = getBoundRect(node);
            if (rect.width === 0 || rect.height === 0) return false; // not showing
            return insideBox(rect);
        }), (node) => {
            return any(content, (item) => {
                return matchContent(node, item);
            });
        }),

        (node) => {
            return any(style, (item) => {
                return matchStyle(node, item);
            });
        }
    );
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

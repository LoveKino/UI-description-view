'use strict';

let insideBox = require('./insideBox');

let matchContent = require('./matchContent');

let matchStyle = require('./matchStyle');

let {
    any, map
} = require('bolzano');

let {
    getBoundRect
} = require('../util');

let match = (node, {
    position,
    content,
    style
}, {
    gridScope
} = {}) => {
    let {
        bottom, height, left, right, top, width, leftOffset
    } = getBoundRect(node);
    let rect = {
        bottom, height, left, right, top, width, leftOffset
    };

    if(node.nodeType === 3 && node.textContent.indexOf('text') !== -1) {
        console.log(node, rect, position, gridScope);
        console.log(insideBox(rect, position, gridScope));
    }

    return insideBox(rect, position, gridScope) && any(content, (item) => {
        return matchContent.match(matchContent.getContent(node, item), item);
    }) && any(style, (item) => {
        return matchStyle.match(matchStyle.getContent(node, item), item);
    });
};

let collectMatchInfos = (node, {
    position,
    content = [], style = []
}, {
    gridScope
} = {}) => {
    let {
        bottom, height, left, right, top, width, leftOffset
    } = getBoundRect(node);
    let rect = {
        bottom, height, left, right, top, width, leftOffset
    };

    return {
        position: [
            insideBox(rect, position, gridScope),
            rect,
            gridScope
        ],

        content: map(content, (item) => {
            let cnt = matchContent.getContent(node, item);
            return [
                matchContent.match(cnt, item),
                cnt
            ];
        }),

        style: map(style, (item) => {
            let cnt = matchStyle.getContent(node, item);
            return [
                matchStyle.match(cnt, item),
                cnt
            ];
        })
    };
};

module.exports = {
    insideBox,
    matchContent,
    matchStyle,
    match,
    collectMatchInfos
};

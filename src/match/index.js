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
        bottom, height, left, right, top, width
    } = getBoundRect(node);
    let rect = {
        bottom, height, left, right, top, width
    };

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
    let rect = getBoundRect(node);

    return {
        position: [insideBox(rect, position, gridScope), {
            feature: rect,
            rule: position,
            gridScope
        }],
        content: map(content, (item) => {
            let cnt = matchContent.getContent(node, item);
            return [
                matchContent.match(cnt, item),

                {
                    feature: cnt,
                    rule: item
                }
            ];
        }),
        style: map(style, (item) => {
            let cnt = matchStyle.getContent(node, item);
            return [
                matchStyle.match(cnt, item),

                {
                    feature: cnt,
                    rule: item
                }
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

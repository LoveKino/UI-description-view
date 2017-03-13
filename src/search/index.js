'use strict';

let searchIn = require('./searchIn');

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
}, options) => {
    let doSearch = searchIn(nodes);

    return doSearch({
        position,
        content,
        style
    }, options);
};

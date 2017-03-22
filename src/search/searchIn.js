'use strict';

let {
    filter
} = require('bolzano');

let {
    match
} = require('../match');

let expandNodes = require('./expandNodes');

/**
 * search target nodes accroding to the description of UI
 *
 * @param nodes array
 *   all nodes used to filter
 */
module.exports = (nodes) => {
    // expand nodes first
    nodes = expandNodes(nodes);

    return (rule, options) => {
        let rets = filter(nodes, (node) => match(node, rule, options));

        return rets;
    };
};

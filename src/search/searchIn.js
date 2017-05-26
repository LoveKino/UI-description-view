'use strict';

let {
    filter, reduce
} = require('bolzano');

let {
    isPassingPositionRule,
    isPassingOneContentRule,
    isPassingOneStyleRule
} = require('../match');

let expandNodes = require('./expandNodes');

/**
 * search target nodes accroding to the description of UI
 *
 * @param nodes array
 *   all nodes used to filter
 *
 *
 * @return
 *  {
 *      nodes, // match nodes
 *      expandedNodes, // ndoes after expanded
 *      filterRouteMap: [{
 *          rule,
 *          nodes
 *      }]
 *  }
 */
module.exports = (nodes) => {
    // expand nodes first
    let expandedNodes = expandNodes(nodes);

    return ({
        style,
        content,
        position
    }, options) => {
        let rest = filter(expandedNodes, (node) => isPassingPositionRule(node, position, options)); // filter by position

        return reduce(style, (prev, item) => { // filter by style
            prev.nodes = filter(prev.nodes, (node) => isPassingOneStyleRule(node, item, options));

            prev.filterRouteMap.push({
                type: 'style',
                rule: item,
                nodes: prev.nodes
            });

            return prev;
        }, reduce(content, (prev, item) => { // filter by content
            prev.nodes = filter(prev.nodes, (node) => isPassingOneContentRule(node, item, options));

            prev.filterRouteMap.push({
                type: 'content',
                rule: item,
                nodes: prev.nodes
            });

            return prev;
        }, {
            nodes: rest,
            expandedNodes,
            filterRouteMap: [{
                type: 'position',
                rule: position,
                nodes: rest
            }]
        }));
    };
};

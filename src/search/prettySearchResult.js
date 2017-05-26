'use strict';

let {
    map
} = require('bolzano');

let exhibit = ({
    nodes,
    filterRouteMap,
    expandedNodes
}, lang = id) => {
    return `${lang('The nodes number finded')}: ${nodes.length}; ${'the nodes number at first'}: ${expandedNodes.length};${map(filterRouteMap, ({
        type, rule, nodes
    }, index) => {
        return ` ${index + 1}. ${lang('apply rule')}: ${getRuleDescription(rule, type, lang)}, ${lang('the nodes number after filtering')}: ${nodes.length};`;
    }).join('')}`;
};

let getRuleDescription = (rule, type, lang) => {
    if(type === 'position') {
        let [grid, coord] = rule;
        return `[${lang(type)}, ${lang('grid')} ${grid[0]} * ${grid[1]}, ${lang('coord')} (${coord[0][0]}, ${coord[0][1]}) - (${coord[0][0]}, ${coord[0][1]})]`;
    } else {
        return `[${lang(type)}, ${rule.extractorType} ${rule.patternType} ${rule.pattern}]`;
    }
};

let id = v => v;

module.exports = {
    exhibit
};

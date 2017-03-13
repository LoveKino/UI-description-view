'use strict';

let contentExtractorMap = require('../restraint/contentExtractor');

let patternMap = require('../restraint/pattern');

module.exports = (node, {
    extractorType,
    patternType,
    pattern,
    active
}) => {
    if(active === false) return true;

    let extractor = contentExtractorMap[extractorType];
    if (!extractor) {
        return false;
    }

    // extract content from node
    let content = extractor(node);
    if(content === undefined) return false;

    let patternWay = patternMap[patternType];
    if (!patternWay) {
        return false;
    }

    return patternWay(pattern, content);
};

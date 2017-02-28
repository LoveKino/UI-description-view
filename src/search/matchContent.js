'use strict';

let contentExtractorMap = require('../restraint/contentExtractor');

let patternMap = require('../restraint/pattern');

module.exports = (node, {
    extractorType,
    patternType,
    pattern
}) => {
    let extractor = contentExtractorMap[extractorType];
    if (!extractor) {
        return false;
    }

    let content = extractor(node);
    let patternWay = patternMap[patternType];
    if (!patternWay) {
        return false;
    }

    return patternWay(pattern, content);
};

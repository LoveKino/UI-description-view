'use strict';

let styleExtractorMap = require('../restraint/styleExtractor');

let patternMap = require('../restraint/pattern');

let onecolor = require('onecolor');

module.exports = (node, {
    extractorType,
    patternType,
    pattern
}) => {
    let extractor = styleExtractorMap[extractorType];
    if (!extractor) {
        return false;
    }

    let content = extractor(node);
    if (extractorType === 'background-color') {
        pattern = onecolor(pattern).hex();
    }

    let patternWay = patternMap[patternType];
    if (!patternWay) {
        return false;
    }

    return patternWay(pattern, content);
};

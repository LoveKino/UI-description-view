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
    if(content === undefined) return false; // using undefined as the fail situation

    if (extractorType === 'background-color') {
        let color = onecolor(pattern);
        if (!color) return false;
        pattern = color.hex();
    }

    let patternWay = patternMap[patternType];
    if (!patternWay) {
        return false;
    }

    return patternWay(pattern, content);
};

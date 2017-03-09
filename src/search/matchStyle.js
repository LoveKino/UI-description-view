'use strict';

let styleExtractorMap = require('../restraint/styleExtractor');

let patternMap = require('../restraint/pattern');

let onecolor = require('onecolor');

let {
    pxToInt
} = require('../util');

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
    if (content === undefined || content === null) return false; // using undefined as the fail situation

    if (extractorType === 'background-color' || extractorType === 'color') {
        let color = onecolor(pattern);
        if (!color) return false;
        pattern = color.cssa();
    } else if (extractorType === 'font-size') {
        pattern = pxToInt(pattern);
    }

    let patternWay = patternMap[patternType];
    if (!patternWay) {
        return false;
    }

    return patternWay(pattern, content);
};

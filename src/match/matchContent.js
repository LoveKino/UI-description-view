'use strict';

let contentExtractorMap = require('../restraint/contentExtractor');

let patternMap = require('../restraint/pattern');

let match = (content, rule) => {
    if (rule.active === false) return true;

    // extract content from node
    if (content === undefined) return false;

    let pattern = getPattern(rule);

    let patternWay = getPatternWay(rule);

    return patternWay(pattern, content);
};

let getContent = (node, {
    extractorType
}) => {
    let extractor = contentExtractorMap[extractorType];
    if (!extractor) {
        throw new Error(`missing content extractor ${extractorType}`);
    }

    // extract content from node
    return extractor(node);
};

let getPatternWay = ({
    patternType
}) => {
    let patternWay = patternMap[patternType];
    if (!patternWay) {
        throw new Error(`missing pattern ${patternType} in content matching`);
    }

    return patternWay;
};

let getPattern = (rule) => rule.pattern;

module.exports = {
    match,
    getContent
};

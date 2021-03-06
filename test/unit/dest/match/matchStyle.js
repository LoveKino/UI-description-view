'use strict';

let styleExtractorMap = require('../restraint/styleExtractor');

let patternMap = require('../restraint/pattern');

let onecolor = require('onecolor');

let {
    pxToInt
} = require('../util');

let match = (content, rule) => {
    if (rule.active === false) return true;

    if (content === undefined || content === null) return false; // using undefined as the fail situation

    let pattern = getPattern(rule);
    if(pattern === undefined) return false;

    let patternWay = getPatternWay(rule);


    return patternWay(pattern, content);
};

let getPatternWay = ({
    patternType
}) => {
    let patternWay = patternMap[patternType];
    if (!patternWay) {
        throw new Error(`missing pattern ${patternType} in style matching.`);
    }

    return patternWay;
};

let getContent = (node, {
    extractorType
}) => {
    let extractor = styleExtractorMap[extractorType];
    if (!extractor) {
        throw new Error(`missing style extractor ${extractorType}.`);
    }

    return extractor(node);
};

let getPattern = ({
    extractorType, pattern
}) => {
    if (extractorType === 'background-color' || extractorType === 'color') {
        let color = onecolor(pattern);
        if (!color) {
            return undefined;
        }
        pattern = color.cssa();
    } else if (extractorType === 'font-size') {
        pattern = pxToInt(pattern);
    }

    return pattern;
};

module.exports = {
    match,
    getContent
};


!(function () {
    var __exportsVariable = require('/Users/yuer/workspaceforme/category/career/container/common/ui/UI-description-view/node_modules/defcomment/src/unit').exportsVariable;
    
})();
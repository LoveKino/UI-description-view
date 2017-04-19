'use strict';

let {
    YUVSimilarity
} = require('color-similarity');

let color = require('onecolor');

let matchSimilarity = (similarity) => (pattern, content) => {
    let patternColor = color(pattern);
    let contentColor = color(content);

    let alphaOffset = patternColor.alpha() - contentColor.alpha();
    let alphaSimilarity = 1 - (Math.sqrt(alphaOffset * alphaOffset) / 1);

    let realSimilarity = alphaSimilarity * YUVSimilarity([
        patternColor.red() * 255,
        patternColor.green() * 255,
        patternColor.blue() * 255
    ], [
        contentColor.red() * 255,
        contentColor.green() * 255,
        contentColor.blue() * 255
    ]);

    return realSimilarity >= similarity;
};

let buildSimilarityPatterns = (step) => {
    let count = Math.floor(100 / step);
    let map = {};
    for (let i = 1; i < count; i++) {
        let name = `color_similarity_ge_${i * step}`;
        map[name] = matchSimilarity(i * step / 100);
    }

    return map;
};

module.exports = buildSimilarityPatterns(10);


!(function () {
    var __exportsVariable = require('/Users/yuer/workspaceforme/category/career/container/common/ui/UI-description-view/node_modules/defcomment/src/unit').exportsVariable;
    
})();
'use strict';

let urlPatterns = require('./restraint/pattern/urlPattern');
let colorSimilarityPattern = require('./restraint/pattern/colorSimilarityPattern');

module.exports = {
    contentPatternMap: {
        'textContent': ['contain', 'equal', 'regExp', 'trimEqual'],
        'imgUrl': ['contain', 'equal', 'regExp', 'trimEqual'].concat(Object.keys(urlPatterns)),
        'containImgUrl': ['contain', 'regExp', 'equal', 'trimEqual'],
        'placeholder': ['contain', 'equal', 'regExp', 'trimEqual'],
    },

    stylePatternMap: {
        'background-color': ['equal'].concat(Object.keys(colorSimilarityPattern)),
        'font-size': ['equal'],
        'color': ['equal'].concat(Object.keys(colorSimilarityPattern))
    }
};

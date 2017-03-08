'use strict';

let urlPatterns = require('./restraint/pattern/urlPattern');

module.exports = {
    contentPatternMap: {
        'textContent': ['contain', 'equal', 'regExp', 'trimEqual'],
        'imgUrl': ['contain', 'equal', 'regExp', 'trimEqual'].concat(Object.keys(urlPatterns)),
        'containImgUrl': ['contain', 'regExp', 'equal', 'trimEqual'],
        'placeholder': ['contain', 'equal', 'regExp', 'trimEqual'],
    },

    stylePatternMap: {
        'background-color': ['equal'],
        'font-size': ['equal'],
        'color': ['equal']
    }
};

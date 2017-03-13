'use strict';

let {
    view, n
} = require('kabanery');

let {
    map
} = require('bolzano');

let Select = require('kabanery-select');

/**
 * content description
 *
 * 1. content extractor
 *
 * 2. pattern matching
 *
 *
 * extractor type -> pattern types
 * pattern type -> pattern
 *
 * user action
 *
 * 1. select extractor type, like text Content, like image url
 * 2. select pattern type, like equal, regular expression
 * 3. input pattern content
 *
 * data = {
 *     value,
 *     onchange,
 *     lang,
 *     extractorPatternsMap,
 *     patternInputMap
 * }
 *
 * value = {
 *   extractorType,
 *   patternType,
 *   pattern
 * };
 *
 * extratorPatternsMap = {
 *   [extractor type]: [pattern type]
 * }
 */

module.exports = ({
    lang,
    extractorPatternsMap
}) => {
    let options = map(extractorPatternsMap, (_, key) => [key, lang(key)]);

    return view((data, {
        update
    }) => {
        let defExtractorType = options[0][0];
        data.value = data.value || {
            extractorType: defExtractorType,
            patternType: extractorPatternsMap[defExtractorType][0],
            pattern: '',
            active: true
        };

        return n('div style="display: inline-block;padding-left: 10px;"', [
            n(`input type="checkbox" ${data.value.active? 'checked="checked"': ''}`, {
                onclick: () => {
                    update('value.active', !data.value.active);
                    data.onchange && data.onchange(data.value);
                }
            }),

            // select extractor
            Select({
                selected: data.value.extractorType,
                options,
                onchange: (v) => {
                    data.value = {
                        extractorType: v,
                        patternType: extractorPatternsMap[v][0],
                        pattern: ''
                    };
                    data.onchange && data.onchange(data.value);
                    update();
                }
            }),

            // select pattern type
            Select({
                options: map(extractorPatternsMap[data.value.extractorType], (v) => [v, lang(v)]),
                selected: data.value.patternType,
                onchange: (v) => {
                    data.value.pattern = '';
                    data.value.patternType = v;
                    data.onchange && data.onchange(data.value);
                    update();
                }
            }),

            // write simple pattern
            n(`input type="text" value="${data.value.pattern}"`, {
                oninput: (e) => {
                    data.value.pattern = e.target.value;
                    data.onchange && data.onchange(data.value);
                }
            })
        ]);
    });
};

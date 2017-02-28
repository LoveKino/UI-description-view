'use strict';

/**
 *
 * view used to describe a UI
 * step1: describe the position of element
 *
 * step2: describe the content of element
 *
 * step3: describe the style of element
 *
 * step4: describe inner UI elements
 *
 * eg: There exists a ui element,
            in area (0, 0) in m X n grid,
            contain content 'test',
            has border,
            background color is white.

 *
 *
 * TODO consider inner UI elements or related elements?
 */

let {
    view, n, N
} = require('kabanery');
let {
    meta, method, RealLetaUI
} = require('leta-ui');

let SimpleForm = require('leta-ui/apply/ui/simpleForm');
let SimpleList = require('leta-ui/apply/ui/simpleList');
let PassPredicateUI = require('leta-ui/apply/ui/passPredicateUI');

let AreaChosen = require('./view/areaChosen');
let ExtractorPatternViewer = require('./view/extractorPatternView');

let completeData = (data) => {
    data.position = data.position || [
        [3, 3],
        [
            [0, 0],
            [0, 0]
        ]
    ];

    data.contentExtractorPatternsMap = data.contentExtractorPatternsMap || {
        'textContent': ['contain', 'equal', 'regExp'],
        'containImgUrl': ['contain', 'regExp', 'equal']
    };

    data.styleExtractorPatternsMap = data.styleExtractorPatternsMap || {
        'background-color': ['equal'],
        'font-size': ['equal']
    };

    data.content = data.content || [];
    data.style = data.style || [];
};

module.exports = view((data) => {
    completeData(data);

    let describeUI = method('describeUI'),

        describePosition = method('position.describePosition'),

        describeContent = method('describeContent'),
        describeStyle = method('describeStyle');

    let {
        lang = id, contentExtractorPatternsMap, styleExtractorPatternsMap
    } = data;

    let defContentKey = Object.keys(contentExtractorPatternsMap)[0];
    let defaultContentItem = {
        extractorType: defContentKey,
        patternType: contentExtractorPatternsMap[defContentKey][0],
        pattern: ''
    };

    let defStyleContentKey = Object.keys(styleExtractorPatternsMap)[0];
    let defaultStyleItem = {
        extractorType: defStyleContentKey,
        patternType: styleExtractorPatternsMap[defStyleContentKey][0],
        pattern: ''
    };

    let ContentView = ExtractorPatternViewer({
        lang,
        extractorPatternsMap: contentExtractorPatternsMap
    });

    let StyleView = ExtractorPatternViewer({
        lang,
        extractorPatternsMap: styleExtractorPatternsMap
    });

    let letaUI = RealLetaUI(
        describeUI(
            describePosition(data.position),
            describeContent(data.content),
            describeStyle(data.style)
        ),

        {
            predicates: {
                describeUI: meta((position, content, style) => {
                    data.onchange && data.onchange({
                        position,
                        content,
                        style
                    });
                }, {
                    viewer: SimpleForm,
                    title: lang('describe a UI element')
                }),

                position: {
                    describePosition: meta((position) => {
                        return position;
                    }, {
                        viewer: N('div', [
                            n('h3', lang('position')),
                            N('div style="padding:8px"', [PassPredicateUI])
                        ]),
                        args: [{
                            viewer: AreaChosen
                        }]
                    }),
                },

                describeContent: meta((content) => {
                    return content;
                }, {
                    viewer: N('div', [
                        n('h3', lang('content')),
                        PassPredicateUI
                    ]),
                    args: [{
                        viewer: SimpleList,
                        itemRender: ContentView,
                        defaultItem: defaultContentItem
                    }]
                }),

                describeStyle: meta((style) => {
                    return style;
                }, {
                    viewer: N('div', [
                        n('h3', lang('style')),
                        PassPredicateUI
                    ]),
                    args: [{
                        viewer: SimpleList,
                        itemRender: StyleView,
                        defaultItem: defaultStyleItem
                    }]
                }),
                // TODO other like tag name, attribute values
            }
        });

    return n('div', [
        letaUI
    ]);
});

const id = v => v;

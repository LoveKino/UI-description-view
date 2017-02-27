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
 */

let {
    view, n, N
} = require('kabanery');
let {
    meta, method, RealLetaUI
} = require('leta-ui');

let SimpleForm = require('leta-ui/apply/ui/simpleForm');
let SimpleInput = require('leta-ui/apply/ui/simpleInput');
let PassPredicateUI = require('leta-ui/apply/ui/passPredicateUI');

let AreaChosen = require('./view/areaChosen');

module.exports = view(({
    lang = id
}, {
    update
}) => {
    let describeUI = method('describeUI'),

        describePosition = method('position.describePosition'),
        defineGrid = method('position.defineGrid'),
        choseArea = method('position.choseArea'),

        describeContent = method('describeContent'),
        describeStyle = method('describeStyle');

    let horizontalGrid = 1,
        verticalGrid = 1;

    let area = [
        [0, 0],
        [0, 0]
    ];

    return () => {
        let letaUI = RealLetaUI(
            describeUI(
                describePosition(defineGrid(horizontalGrid, verticalGrid), area),
                describeContent(),
                describeStyle()
            ),

            {
                predicates: {
                    describeUI: meta((position, content, style) => {
                        //
                    }, {
                        viewer: SimpleForm,
                        title: lang('describe a UI element')
                    }),

                    position: {
                        describePosition: meta((grid, area) => {
                            console.log(area);
                        }, {
                            viewer: N('div', [
                                n('h3', lang('position')),
                                N('div style="padding:8px"', [PassPredicateUI])
                            ]),
                            args: [null, {
                                viewer: AreaChosen,
                                horizontalGrid,
                                verticalGrid
                            }]
                        }),

                        defineGrid: meta((m, n) => {
                            //
                            if (m !== horizontalGrid) {
                                horizontalGrid = m;
                                area = [
                                    [0, 0],
                                    [0, 0]
                                ]
                                update();
                            }

                            if (n !== verticalGrid) {
                                area = [
                                    [0, 0],
                                    [0, 0]
                                ]
                                verticalGrid = n;
                                update();
                            }
                        }, {
                            viewer: N('div', [
                                n('span', [lang('grid')]),
                                N('div style="display:inline-block"', [PassPredicateUI])
                            ]),
                            args: [{
                                viewer: N('div style="display:inline-block"', [SimpleInput])
                            }, {
                                viewer: N('div style="display:inline-block"', [SimpleInput])
                            }]
                        })
                    },

                    describeContent: meta(() => {}, {}),

                    describeStyle: meta(() => {}, {}),
                    // TODO other like tag name, attribute values
                }
            });

        return n('div', [
            letaUI
        ]);
    };
});

const id = v => v;

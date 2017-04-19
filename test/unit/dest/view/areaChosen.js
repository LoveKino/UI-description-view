'use strict';

let {
    n, view
} = require('kabanery');

let isItemChosen = (i, j, lt, rb) => {
    if (!lt || !rb) return false;
    let [x1, y1] = lt, [x2, y2] = rb;
    return (x1 <= i && i <= x2) && (y1 <= j && j <= y2);
};

let connectArea = (point1, point2) => {
    if (!point2) return [
        point1,
        point1
    ];

    return [
        [
            Math.min(point1[0], point2[0]),
            Math.min(point1[1], point2[1]),
        ],
        [
            Math.max(point1[0], point2[0]),
            Math.max(point1[1], point2[1]),
        ]
    ];
};

let GridView = view((data, {
    update
}) => {
    let width = data.width || 150,
        height = data.height || 240;

    let chosenPoint1 = null,
        chosenPoint2 = null;

    return () => {
        let {
            grid,
            area,
            onchange
        } = data;

        let [horizontalGrid, verticalGrid] = grid;

        let unitWidth = width / horizontalGrid,
            unitHeight = height / verticalGrid;

        let grids = [];
        for (let i = 0; i < horizontalGrid; i++) {
            for (let j = 0; j < verticalGrid; j++) {
                let bgcolor = isItemChosen(i, j, area[0], area[1]) ? 'green' : null;

                grids.push(n('div', {
                    style: {
                        width: unitWidth,
                        height: unitHeight,
                        borderLeft: i > 0 ? 0 : '1px solid gray',
                        borderRight: '1px solid gray',
                        borderTop: j > 0 ? 0 : '1px solid gray',
                        borderBottom: '1px solid gray',
                        position: 'absolute',
                        left: unitWidth * i,
                        top: unitHeight * j,
                        backgroundColor: bgcolor,
                        boxSizing: 'border-box'
                    },

                    onclick: () => {
                        if (!chosenPoint1 || chosenPoint2) {
                            area[0] = null;
                            area[1] = null;
                            chosenPoint1 = [i, j];
                            let newArea = connectArea(chosenPoint1, chosenPoint2);
                            onchange && onchange(newArea);
                            update('area', newArea);
                        } else {
                            chosenPoint2 = [i, j];
                            let newArea = connectArea(chosenPoint1, chosenPoint2);
                            onchange && onchange(newArea);
                            update('area', newArea);
                            chosenPoint1 = null;
                            chosenPoint2 = null;
                        }
                    }
                }));
            }
        }

        // draw a n * m grids
        return n('div', [
            n('div', {
                style: {
                    boxSizing: 'border-box',
                    width,
                    height,
                    position: 'relative'
                }
            }, [
                grids
            ]),

            area[0] && n('span', {
                style: {
                    color: 'gray',
                    fontSize: 12,
                    padding: 5
                }
            }, `(${area[0][0]}, ${area[0][1]}) - (${area[1][0]}, ${area[1][1]})`)
        ]);
    };
});

let PositionView = view(({
    value, onchange
}, {
    update
}) => {
    let grid = value.value[0];
    // TODO why without div wrapper, won't update in the gridview
    return n('div', [
        n('label', 'grid'),

        n(`input type=number value=${grid[0]}`, {
            style: {
                width: 100,
                minWidth: 100,
                marginRight: 10
            },
            oninput: (e) => {
                let m = Number(e.target.value);
                if (m !== grid[0]) {
                    grid[0] = m;
                    value.value[1] = [
                        [0, 0],
                        [0, 0]
                    ];
                    update();
                    onchange && onchange(value);
                }
            }
        }),
        n(`input type=number value=${grid[1]}`, {
            style: {
                width: 100,
                minWidth: 100
            },

            oninput: (e) => {
                let n = Number(e.target.value);
                if (n !== grid[1]) {
                    grid[1] = n;
                    value.value[1] = [
                        [0, 0],
                        [0, 0]
                    ];
                    update();
                    onchange && onchange(value);
                }
            }
        }),

        n('br'),
        n('br'),

        GridView({
            area: value.value[1],
            grid,
            onchange: (newArea) => {
                value.value[1] = newArea;
                onchange && onchange(value);
            }
        })
    ]);
});

/**
 * chosen a area from n * m view
 *
 * area: [leftTopCoord, rightBottomCoord]
 *
 * coord: [x, y]
 */
module.exports = ({
    value,
    onchange
}, {
    grid
}) => {
    return PositionView({
        value, onchange, grid
    });
};


!(function () {
    var __exportsVariable = require('/Users/yuer/workspaceforme/category/career/container/common/ui/UI-description-view/node_modules/defcomment/src/unit').exportsVariable;
    
})();
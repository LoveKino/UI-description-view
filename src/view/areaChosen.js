'use strict';

let {
    n, view
} = require('kabanery');

let jsoneq = require('cl-jsoneq');

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
    let width = 200,
        height = 300;

    let chosenPoint1 = null,
        chosenPoint2 = null;

    return () => {
        let {
            horizontalGrid,
            verticalGrid,
            area,
            onchange
        } = data;

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
    horizontalGrid,
    verticalGrid
}) => {
    // TODO why without div wrapper, won't update in the gridview
    return n('div', [
        GridView({
            horizontalGrid,
            verticalGrid,
            area: value.value,
                onchange: (newArea) => {
                    value.value = newArea;
                    onchange && onchange(value);
                }
        })
    ]);
};

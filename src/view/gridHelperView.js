'use strict';

let {
    n, view
} = require('kabanery');

module.exports = view(({
    position = [], gridScope
}) => {
    let [grid, area] = position;
    grid = grid || [0, 0];
    let [horizontalGrid, verticalGrid] = grid;

    let unitWidth = gridScope.width / horizontalGrid,
        unitHeight = gridScope.height / verticalGrid;

    let grids = [];

    for (let i = 0; i < horizontalGrid; i++) {
        for (let j = 0; j < verticalGrid; j++) {
            let backgroundColor = isItemChosen(i, j, area[0], area[1]) ? 'rgba(100,200,100,0.5)' : 'rgba(200, 200, 200, 0.1)';

            grids.push(n('div', {
                style: {
                    width: unitWidth,
                    height: unitHeight,
                    borderLeft: i > 0 ? 0 : '1px solid rgba(100, 100, 100, 0.3)',
                    borderRight: '1px solid rgba(100, 100, 100, 0.3)',
                    borderTop: j > 0 ? 0 : '1px solid rgba(100, 100, 100, 0.3)',
                    borderBottom: '1px solid rgba(100, 100, 100, 0.3)',
                    position: 'absolute',
                    left: unitWidth * i,
                    top: unitHeight * j,
                    boxSizing: 'border-box',
                    backgroundColor
                }
            }));
        }
    }

    return n('div', {
        style: {
            position: 'fixed',
            boxSizing: 'border-box',
            left: gridScope.x,
            top: gridScope.y,
            width: gridScope.width,
            height: gridScope.height
        }
    }, [grids]);
});

let isItemChosen = (i, j, lt, rb) => {
    if (!lt || !rb) return false;
    let [x1, y1] = lt, [x2, y2] = rb;
    return (x1 <= i && i <= x2) && (y1 <= j && j <= y2);
};

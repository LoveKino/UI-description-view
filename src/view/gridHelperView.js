'use strict';

let {
    n, view
} = require('kabanery');

module.exports = view(({
    grid,
    gridScope
}) => {
    let [horizontalGrid, verticalGrid] = grid;

    let unitWidth = gridScope.width / horizontalGrid,
        unitHeight = gridScope.height / verticalGrid;

    let grids = [];
    for (let i = 0; i < horizontalGrid; i++) {
        for (let j = 0; j < verticalGrid; j++) {
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
                    backgroundColor: 'rgba(200, 200, 200, 0.1)'
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

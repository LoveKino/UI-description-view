'use strict';

module.exports = (gridScope, position) => {
    let [grid, area] = position;
    let [leftGrid, topGrid] = area[0];
    let [rightGrid, bottomGrid] = area[1];
    let leftTopCoord = getGridCoord(gridScope, grid, [leftGrid, topGrid]);
    let rightBottomCoord = getGridCoord(gridScope, grid, [rightGrid + 1, bottomGrid + 1]);

    return ({
        left, top, right, bottom
    }) => {
        return insideBox([left, top], leftTopCoord, rightBottomCoord) && insideBox([right, bottom], leftTopCoord, rightBottomCoord);
    };
};

let insideBox = ([x, y], [l, t], [r, b]) => {
    return x >= l && y >= t && x <= r && y <= b;
};

let getGridCoord = (scope, [m, n], [t, r]) => {
    return [
        (scope.width / m) * t + scope.x, (scope.height / n) * r + scope.y
    ];
};

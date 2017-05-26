'use strict';

/**
 * ## test
 *
 * [
 *  [[
 *      {left: 60, right: 74, top: 797, bottom: 859, height: 32, width: 14},
 *      [[85, 27], [[4, 24], [5, 25]]],
 *      {height: 874, width: 1200, x: 0, y: 0}],
 *  true]
 * ]
 */
let inside = ({
    left, top, right, bottom
}, position, gridScope) => {
    gridScope = gridScope || wndsize();

    let [grid, area] = position;
    let [leftGrid, topGrid] = area[0];
    let [rightGrid, bottomGrid] = area[1];
    let leftTopCoord = getGridCoord(gridScope, grid, [leftGrid, topGrid]);
    let rightBottomCoord = getGridCoord(gridScope, grid, [rightGrid + 1, bottomGrid + 1]);

    return insideBox([left, top], leftTopCoord, rightBottomCoord) && insideBox([right, bottom], leftTopCoord, rightBottomCoord);
};

let insideBox = ([x, y], [l, t], [r, b]) => {
    return x >= l && y >= t && x <= r && y <= b;
};

/**
 * ## test
 * [
 *    [[{width:1200,height:874,x:0,y:0}, [85, 27], [5 + 1, 25 + 1]], [84.70588235294117,841.6296296296297]]
 * ]
 */
let getGridCoord = (scope, [m, n], [t, r]) => {
    return [
        (scope.width / m) * t + scope.x, (scope.height / n) * r + scope.y
    ];
};

function wndsize() {
    var w = 0;
    var h = 0;
    //IE
    if (!window.innerWidth) {
        if (!(document.documentElement.clientWidth === 0)) {
            //strict mode
            w = document.documentElement.clientWidth;
            h = document.documentElement.clientHeight;
        } else {
            //quirks mode
            w = document.body.clientWidth;
            h = document.body.clientHeight;
        }
    } else {
        //w3c
        w = window.innerWidth;
        h = window.innerHeight;
    }
    return {
        width: w,
        height: h,
        x: 0,
        y: 0
    };
}

module.exports = inside;

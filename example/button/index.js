'use strict';

let {
    udView, debugTooler, collectMatchInfos, search
} = require('../../src');

let {
    lightupSearch
} = debugTooler;

let gridScope = wndsize();
gridScope.x = 400;
gridScope.width = gridScope.width - 400;

let showLight = lightupSearch(document.body, gridScope, document.querySelectorAll('#searchItem *'));

document.body.appendChild(udView({
    onchange: (v) => {
        try {
            showLight(v);

            console.log(collectMatchInfos(document.querySelector('img'), v, gridScope));
            console.log(search(document.querySelectorAll('*'), v, {
                gridScope
            }));
        } catch (err) {
            console.log(err); // eslint-disable-line
        }
    }
}));

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

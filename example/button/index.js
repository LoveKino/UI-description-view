'use strict';

let {
    udView, search
} = require('../../src');

document.body.appendChild(udView({
    onchange: (v) => {
        let nodes = search(document.querySelectorAll('#searchItem *'), v);
        nodes.map((node) => {
            node.setAttribute('class', 'chosen');
            setTimeout(() => {
                node.setAttribute('class', '');
            }, 2000);
        });
    }
}));

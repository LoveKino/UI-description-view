'use strict';

let {
    search
} = require('../../../..');

let assert = require('assert');

let {
    n, mount
} = require('kabanery');

mount(n('div', {
    style: {
        width: 300,
        height: 300,
        position: 'fixed',
        left: 0,
        top: 0
    }
}, [
    n('div', {
        style: {
            position: 'fixed',
            left: 0,
            top: 0,
            width: 120,
            height: 120,
            fontSize: 5,
            textAlign: 'left'
        }
    }, '1234')
]), document.body);

let content = [{
    active: true,
    extractorType: 'textContent',
    pattern: '1234',
    patternType: 'contain'
}];

let nodes = document.body.querySelectorAll('*');

let gridScope = {
    x: 0,
    y: 0,
    width: 300,
    height: 300
};

assert.equal(search(nodes, {
    position: [
        [3, 3],
        [
            [2, 2],
            [2, 2]
        ]
    ],
    content,
    style: []
}, {
    gridScope
}).length, 0);

assert(search(nodes, {
    position: [
        [3, 3],
        [
            [0, 0],
            [1, 1]
        ]
    ],
    content,
    style: []
}, {
    gridScope
}).length > 1);

assert.equal(search(nodes, {
    position: [
        [3, 3],
        [
            [0, 0],
            [0, 0]
        ]
    ],
    content,
    style: []
}, {
    gridScope
}).length, 1);

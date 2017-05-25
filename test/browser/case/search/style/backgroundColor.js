'use strict';

let {
    search
} = require('../../../../..');

let assert = require('assert');

let {
    n, mount
} = require('kabanery');

mount(n('div id="test"', [
    n('div', {
        style: {
            width: 300,
            height: 300
        }
    }, [
        n('div', {
            style: {
                backgroundColor: 'red'
            }
        }, 'first'),

        n('div', {
            style: {
                backgroundColor: 'blue'
            }
        }, 'next')
    ])
]), document.body);

let nodes = document.getElementById('test').querySelectorAll('*');

let position = [
    [1, 1],
    [
        [0, 0],
        [0, 0]
    ]
];

let rets = search(nodes, {
    style: [{
        active: true,
        extractorType: 'background-color',
        pattern: 'red',
        patternType: 'equal'
    }],
    content: [],
    position,
});

assert.equal(rets.length, 1);
assert.equal(rets[0].outerHTML, '<div style="background-color: red">first</div>');

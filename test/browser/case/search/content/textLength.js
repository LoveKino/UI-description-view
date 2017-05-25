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
        }, '1234'),

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
        }, ' 123')
    ])
]), document.body);

let nodes = document.getElementById('test').querySelectorAll('*');
let gridScope = {
    x: 0,
    y: 0,
    width: 300,
    height: 300
};

let position = [
    [3, 3],
    [
        [0, 0],
        [0, 0]
    ]
];

let allText = (rets) => {
    rets.forEach((ret) => {
        assert.equal(ret.nodeType, 3);
    });

    return rets;
};

let checkLen = (rets, len) => {
    assert.equal(rets.length, len);
    return rets;
};

checkLen(allText(search(nodes, {
    style: [],
    content: [{
        active: true,
        extractorType: 'textLength',
        pattern: '4',
        patternType: '='
    }],
    position,
}, {
    gridScope
})), 2);

checkLen(allText(search(nodes, {
    style: [],
    content: [{
        active: true,
        extractorType: 'textLength',
        pattern: '3',
        patternType: '>='
    }],
    position,
}, {
    gridScope
})), 2);

checkLen(allText(search(nodes, {
    style: [],
    content: [{
        active: true,
        extractorType: 'textLength',
        pattern: '5',
        patternType: '>='
    }],
    position,
}, {
    gridScope
})), 0);

checkLen(allText(search(nodes, {
    style: [],
    content: [{
        active: true,
        extractorType: 'textLength',
        pattern: '3',
        patternType: '<='
    }],
    position,
}, {
    gridScope
})), 0);

checkLen(allText(search(nodes, {
    style: [],
    content: [{
        active: true,
        extractorType: 'textLength',
        pattern: '5',
        patternType: '<='
    }],
    position,
}, {
    gridScope
})), 2);

'use strict';

let InsideBox = require('../../src/match/insideBox');

let assert = require('assert');

describe('insideBox', () => {
    it('base', () => {
        let insideBox = (rect) => InsideBox(rect, [
            [3, 3],
            [
                [2, 0],
                [2, 0]
            ]
        ], {
            x: 0,
            y: 0,
            height: 459,
            width: 720
        });

        assert.equal(insideBox({
            left: 630,
            top: 37,
            right: 666,
            bottom: 55
        }), true);

        assert.equal(insideBox({
            left: 670,
            top: 0,
            right: 720,
            bottom: 50
        }), true);
    });

    it('base2', () => {
        let insideBox = (rect) => InsideBox(rect, [
            [3, 3],
            [
                [1, 0],
                [2, 0]
            ]
        ], {
            x: 0,
            y: 0,
            height: 459,
            width: 720
        });

        assert.equal(insideBox({
            left: 630,
            top: 37,
            right: 666,
            bottom: 55
        }), true);

        assert.equal(insideBox({
            left: 670,
            top: 0,
            right: 720,
            bottom: 50
        }), true);
    });
});

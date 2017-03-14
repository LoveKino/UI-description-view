'use strict';

let {
    view, n
} = require('kabanery');

module.exports = view(({
    left, top, width, height
}) => {
    return n('div', {
        style: {
            position: 'fixed',
            left,
            top,
            width,
            height,
            backgroundColor: 'rgba(200, 100, 100, 0.6)',
            zIndex: 100000
        }
    });
});

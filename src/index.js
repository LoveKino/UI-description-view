'use strict';

/**
 * UI assertion, a simple UI DSL, used to describe the restraint of some UI elements
 *
 * after description a ui element, we can try to search in the page to find some elements which conform to these descriptions.
 */

let udView = require('./udView');

let search = require('./search');

let gridHelperView = require('./view/gridHelperView');

let blinkView = require('./view/blinkView');

let {
    getBoundRect
} = require('./util');

module.exports = {
    udView,
    search,
    gridHelperView,
    blinkView,
    getBoundRect
};

module.exports = require('./src');

/**
 * @readme-quick-run
 *
 * ## test tar=js env=browser r_c=uiDescription
 * let {search} = uiDescription;
 *
 * search(document.querySelectorAll('*'), {
 *      position: [
 *          [3, 3],
 *          [[0, 0], [1, 2]]
 *      ],
 *      content: [{
 *          active: true,
 *          extractorType: 'textContent',
 *          pattern: '1234',
 *          patternType: 'contain'
 *      }],
 *      style: []
 * });
 */

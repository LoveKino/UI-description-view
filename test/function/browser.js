'use strict';

let browserJsEnv = require('browser-js-env');
let promisify = require('es6-promisify');
let fs = require('fs');
let path = require('path');
let readFile = promisify(fs.readFile);

let runFileInBrowser = (file) => {
    return readFile(file).then((str) => {
        return browserJsEnv(str, {
            testDir: path.join(path.dirname(file), `../../__test/${path.basename(file)}`),
            //clean: true
        });
    });
};

let testFiles = {
    'search:position': path.join(__dirname, '../browser/case/search/position.js'),
    'search:content:textContent': path.join(__dirname, '../browser/case/search/content/textContent.js')
};

describe('browser', () => {
    for (let name in testFiles) {
        it(name, () => {
            return runFileInBrowser(testFiles[name]);
        });
    }
});

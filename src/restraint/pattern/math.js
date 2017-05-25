'use strict';

module.exports = {
    '>=': (pattern, content) => Number(content) >= Number(pattern),
    '<=': (pattern, content) => Number(content) <= Number(pattern),
    '>': (pattern, content) => Number(content) > Number(pattern),
    '<': (pattern, content) => Number(content) < Number(pattern),
    '=': (pattern, content) => Number(content) === Number(pattern)
};

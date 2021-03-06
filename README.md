# ui-description-view

[中文文档](./README_zh.md)   [document](./README.md)

UI assertion, a simple UI DSL, used to describe the restraint of some UI elements, after description a UI element, we can try to search in the area of page to find some elements which conform to these descriptions.
- [install](#install)
- [usage](#usage)
  * [API quick run](#api-quick-run)
- [develop](#develop)
  * [file structure](#file-structure)
  * [run tests](#run-tests)
- [license](#license)

## install

`npm i ui-description-view --save` or `npm i ui-description-view --save-dev`

Install on global, using `npm i ui-description-view -g`



## usage








### API quick run



```js
let uiDescription = require('ui-description-view')
let {search} = uiDescription;

search(document.querySelectorAll('*'), {
     position: [
         [3, 3],
         [[0, 0], [1, 2]]
     ],
     content: [{
         active: true,
         extractorType: 'textContent',
         pattern: '1234',
         patternType: 'contain'
     }],
     style: []
});
```




## develop

### file structure

```
.    
│──LICENSE    
│──README.md    
│──README_zh.md    
│──TODO.md    
│──example    
│   └──button    
│       │──assets    
│       │   └──app.js    
│       │──index.html    
│       │──index.js    
│       └──webpack.config.js    
│──index.js    
│──package.json    
│──src    
│   │──debugTooler.js    
│   │──index.js    
│   │──match    
│   │   │──index.js    
│   │   │──insideBox.js    
│   │   │──matchContent.js    
│   │   └──matchStyle.js    
│   │──patternMap.js    
│   │──restraint    
│   │   └──contentExtractor    
│   │       │──containImgUrl.js    
│   │       │──imgUrl.js    
│   │       │──index.js    
│   │       │──inputValue.js    
│   │       └──textContent.js    
│   │──search    
│   │   │──expandNodes.js    
│   │   │──index.js    
│   │   └──searchIn.js    
│   └──udView.js    
└──test    
    │──browser    
    │   └──__test    
    └──function    
        │──browser.js    
        └──insidebox.js     
```


### run tests

`npm test`

## license

MIT License

Copyright (c) 2017 chenjunyu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

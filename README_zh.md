# ui-description-view

[中文文档](./README_zh.md)   [document](./README.md)

UI assertion, a simple UI DSL, used to describe the restraint of some UI elements, after description a UI element, we can try to search in the area of page to find some elements which conform to these descriptions.
- [安装](#%E5%AE%89%E8%A3%85)
- [使用方法](#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
  * [API 快速运行](#api-%E5%BF%AB%E9%80%9F%E8%BF%90%E8%A1%8C)
- [开发](#%E5%BC%80%E5%8F%91)
  * [文件结构](#%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84)
  * [运行测试用例](#%E8%BF%90%E8%A1%8C%E6%B5%8B%E8%AF%95%E7%94%A8%E4%BE%8B)
- [许可证](#%E8%AE%B8%E5%8F%AF%E8%AF%81)

## 安装

`npm i ui-description-view --save` 或者 `npm i ui-description-view --save-dev`

全局安装, 使用 `npm i ui-description-view -g`



## 使用方法








### API 快速运行



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




## 开发

### 文件结构

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


### 运行测试用例

`npm test`

## 许可证

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

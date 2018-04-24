表单设计器
==

# 简介

这是一个在线的表单设计工具，[Webpack](https://webpack.github.io/) + [React](https://facebook.github.io/react/) + [Flux](https://github.com/facebook/flux) + ES6等技术进行开发。

# 代码
主要提供了两个核心模块，core+display。core是所有表单设计时的模块的集合，而display是所有表单显示时的模块的集合。

## core
React + Flux实现，UI部分使用了[Material UI](http://www.material-ui.com/)。每种组件都实现为一个 React Component，打包后，暴露为window.FormDesigner.core。

#### FormElement
核心类，对表单元素的抽象，只关心其本身的数据以及和其他表单元素的关系。

## display
只使用了jQuery，考虑到表单显示需要兼容ie8，则无法使用React。display中组件的解析过程类似与easyui解析组件的方式。打包后，暴露为window.FormDesigner.display。

## 其他
#### 主题
核心功能支持主题的切换，详见 /theme ，但目前只设置了一种主题，所以界面上这个功能没有开放出来。

#### 多语言
核型功能支持切换不同的语言，只需要增加语言文件即可。

# 开发环境

安装nodejs

```
npm install（npm若被墙，可以用 cnpm install）
npm start
open http://localhost:3000
```
开发时可以使用 HotReload 等特性

# 语义化版本号
发布代码的版本号遵循[语义化版本号](http://semver.org/lang/zh-CN/)
同时发布日志CHANGELOG.md会记录改动点。

# 发布代码

```
npm run build 未压缩版本
npm run release 压缩版本
```

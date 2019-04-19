# free-layout-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## 核心组件
- Canvas.vue 画布组件。布局容器。
- FlexiBlock.vue 布局块组件。在画布上用于组件内容展示，拖拽布局，尺寸调整。
- Widget.vue 控件组件。主要存储控件信息以及提供拖拽的交互能力。

## 特性
- 基于html5 drag API实现拖拽交互，代码量和复杂度低。
- 支持自定义组件用于布局。
- 画布、控件尺寸可自由改变。（画布的尺寸始终为10的倍数）
- 控件支持自由拖拽布局，自动贴靠布局网格线。
- 支持还原布局，方便布局多次编辑等功能开发。
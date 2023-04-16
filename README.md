# Hurricane

## Complete Vue Developer 2023: Zero to Mastery (Pinia, Vitest)

## 一、介绍 (Introduction)

### 1. Vue/React/Angular 哪个好？

- Angular 它是谷歌在 2010 年发布的，优点是提供了完整的工具链供开发人员使用，其缺点是学习曲线陡峭。
- React 是由 Facebook 公司与 2013 年发布的，适合初创公司或需要灵活性的人，可将不同的库和工具与 React 一起构建，其可能导致的问题是给了开发人员太多选择，当最终选择了一些时髦的库和工具，并将所有东西混合在一起时，会造成既混乱又复杂的代码。
- Vue 是个人开发者尤雨溪在 2014 年发布的，结合了 Angular 与 React 两者的优点，允许团队快速构建事物，它提供了一些好用的工具，不必挑选太多库。

### 2. Composition API 与 Options API

随着 Vue3 的发布引入了 Composition API，这是构建视图的不同方式。本课程两种方式都会使用。

## 二、基础

- 加载 Vue
- 创建 Vue 新实例

- CDN (Content delivery network)
  1. 它们是一个庞大的服务器网络，托管 CSS、JavaScript 或图片等静态文件。
  2. CDN 会将文件副本存放在全球的不同服务器上，当用户使用时网络会找出离用户最近的服务器。

### 1. 数据

创建 Vue 实例并返回数据对象

```js
const vm = Vue.createApp({
  data() {
    return {
      firstName: "John",
    };
  },
}).mount("#app");
```

使用数据对象

```html
<div id="#app">
  <p>{{firstName}}</p>
</div>
```

### 2.方法

在 Vue 实例中添加方法

```js
const vm = Vue.createApp({
  data() {
    return {
      firstName: "John",
      lastName: "Doe",
    };
  },
  methods: {
    fullName() {
      return `${this.firstName} ${this.lastName.toUpperCase()}`;
    },
  },
}).mount("#app");
```

调用方法

```html
<div id="#app">
  <p>{{fullName()}}</p>
</div>
```

### 3. 隐藏尚未完成编译的 DOM 模板。

在 html 中添加 v-cloak

```html
<div id="#app" v-cloak>
  <p>{{fullName()}}</p>
</div>
```

在 css 中隐藏改元素

```css
[v-cloak] {
  display: none;
}
```

### 4. 双向绑定

使用 `v-model` 绑定元素数据

```html
<input type="text" v-mode="firstName" />
```

### 5. 绑定属性

使用 `v-bind` 绑定属性

```html
<a v-bind:href="url">必应</a>
```

也可使用简写形式 `:` 来进行属性绑定

```html
<a :href="url">必应</a>
```

### 6. 输出原生 html

- 跨站脚本攻击 (Cross Site Scripting, XSS)
  1. 当恶意或有害的 html 注入到网页中，会发生跨站点脚本在应用中导致意外发生。

当数据内容为网页标签

```js
data(){
  return {
    raw_url: '<a href="https://bing.com" target="_blank">必应</a>'
  }
}
```

网页会直接渲染内容

```html
<p>{{ raw_url }}</p>
```

使用 `v-html` 来渲染 html 元素内容

```html
<p v-html="raw_url"></p>
```

### 7. 点击事件

使用 `v-on:click` 绑定点击事件

```js
<button type="button" v-on:click="increment">
  Increment
</button>
```

也可使用简写形式 `@`

```js
<button type="button" @click="age--">Decrement</button>
```

### 8.事件修饰符(Event Modifiers)

```js
<input type="text" :value="lastName" @input.prevent="updateLastName" />
```

### 9.双向绑定修饰符(v-model Modifiers)

将输入的数据转换为 number 类型

```js
<input type="text" v-model.number="age" />
```

清除字符串前后多于空格

```js
<input type="text" v-model.lazy.trim="firstName" />
```

### 10.计算属性(Computed Properties)

计算属性是以某种方式计算你的属性。

在 `computed` 中添加计算属性方法

```js
computed: {
  fullName() {
    return `${this.firstName} ${this.lastName.toUpperCase()}`;
  }
}
```

在 html 中使用计算属性

```html
<p>{{ fullName }}</p>
```

### 11.观察者(Watchers)

观察者用于观察数据的变化，每当发生改变时，都可以运行一个函数来执行其他逻辑。

在 `watch` 中定义与数据同名的方法来观察数据的变更并执行该函数。

```js
watch: {
  age(newVal, oldVal) {
    setTimeout(() => {
      this.age = 20;
    }, 3000);
  }
}
```

### 12.绑定类样式

使用 `:class` 来绑定类样式，当值为 `true` 的时候才会应用该样式。

```html
<div class="circle" :class="{ purple: true}"></div>
```

### 13.绑定样式

使用 `:style` 里绑定样式

```html
<div
  :style="[{ width: '10px', height: '10px', lineHeight: '10px' },{ transform: 'rotate(30deg)' }]"
>
  Hi
</div>
```

### 14.条件判断

使用 `v-if`、`v-else-if`、`v-else` 进行条件判断

```html
<p v-if="mode == 1">Showing v-if directive content</p>
<p v-else-if="mode == 2">v-else-if</p>
<p v-else>v-else</p>
```

### 15.隐藏元素

使用 `v-show` 显示或隐藏元素

```html
<i v-show="mode == 1">v-show</i>
```

### 16.循环

在数据中定义数组数据

```js
data() {
  return {
    people: [
      { name: "John", age: 20 },
      { name: "Rick", age: 18 },
      { name: "Amy", age: 33 },
    ],
  };
},
```

使用 `v-for` 循环遍历数据内容

```html
<ul>
  <li v-for="person in people">
    <div v-for="(value, key, index) in person">
      {{ key }} : {{ value }} - Index {{ index }}
    </div>
  </li>
</ul>
```

## 三、Vue 实例

### 1.生命周期(Lifecycle)

生命周期使我们能够在某个时候运行代码。

将 Vue 实例插入到文档中的过程被称为 `mounting` 装载，表示视图已经挂载。

1. `Vue.createApp().mount()` - 创建实例
2. `beforeCreate` - 创建实例之前的钩子函数
3. 初始化 `data` 和 `methods`
4. `created` - 实例创建完成的钩子函数
5. `beforeMount` - 渲染视图之前的钩子函数
6. 编译模板
7. `mounted` - 视图渲染完成的钩子函数

### 2.虚拟 DOM(Virtual DOM)

虚拟 DOM 是一个 JavaScript 对象，它是实际 DOM 的轻量级副本，每当数据发生变化时，虚拟 DOM 也会更新。虚拟 DOM 更新后会与实际 DOM 同步。

### 3.模板

```js
let vm = Vue.createApp({
  data() {
    return {
      message: " Hello World !",
    };
  },
  template: `{{message}}`,
});

vm.mount("#app");
```

### 4.组件

创建组件

```js
vm.component("hello", {
  template: `<h1>{{ message }}</h1>`,
  data() {
    return {
      message: "HELLO WORLD!",
    };
  },
});
```

使用组件

```html
<hello />
```

## 四、构建工具

- Vite
- ESLint
- Webpack
- PostCSS
- SASS

### 1.Vite

Vite 将所有东西整合在一起，它是 JavaScript 生态系统的最新软件包之一。

Vite 是应用程序的模块打包工具

创建 Vite 项目

```bash
npm create vite@latest
```

运行项目

```bash
npm run dev
```

构建项目

```bash
npm run build
```

预览项目

```bash
npm run preview
```

### 2.SASS

SASS 是为了扩展 CSS 的编程语言，可以定义函数遍、历数组数据等。但浏览器不支持，所以需要将 SASS 编译成 CSS 文件。

安装 sass

```bash
npm install sass
```

### 3.PostCSS

安装第三方插件

[PostCSS 插件](https://postcss.parts)

```bash
npm install autoprefixer --save-dev
```

创建 `postcss.config.cjs` 文件来启用 PostCSS

```js
module.exports = {
  plugins: [require("autoprefixer")],
};
```

### 4.ESLint

ESLint 用以确保我们编写的 JavaScript 代码的质量。

[ESLint](https://eslint.org)

安装 `eslint`

```bash
npm install eslint --save-dev
npm install vite-plugin-eslint --save-dev
```

创建 `vite.config.js` 文件

```js
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [eslint()],
});
```

## 四、Vue 项目

### 1.创建 Vue 项目

```bash
npm init vue@latest
```

> 在 VSCode 中安装 `Volar` 插件来高亮显示 vue 代码。

### 2.添加 sass

```bash
npm install sass --save-dev
```

### 3.Props

用于组件中通信的方式。

### 4.Emitting Events

通过 `emit` 来出发事件

### 5. 验证 Props

```js
props: {
    age: {
        // 类型
        type: Number,
        // 是否为必填项
        required: true,
        // 默认值
        default: 20,
        // 自定义验证器
        validator(value) {
            return value < 130
        }
    }
},
```

### 6.插槽(Slot)

创建项目

```js
npm init vue@latest
npm install
```

使用 `slot` 标签来标记插槽位置

```html
<div>
  <slot name="title"></slot>
</div>
```

使用 `v-slot` 指定插槽

```html
<template v-slot:help>
  <p>This is some help text.</p>
</template>
```

### 7.动态组件(Dynamic Components)

创建项目

```bash
npm init vue@latest
```

使用 `component` 标签来指定加载的组件，使用 `keep-alive` 保持组件的活跃状态。

```html
<keep-alive>
  <component :is="componentName"></component>
</keep-alive>
```

## 五、实战项目 Music

### 1. 创建项目

```bash
npm init vue@latest

Vue.js - The Progressive JavaScript Framework

√ Project name: ... music
√ Add TypeScript? ... No / Yes
√ Add JSX Support? ... No / Yes
√ Add Vue Router for Single Page Application development? ... No / Yes
√ Add Pinia for state management? ... No / Yes
√ Add Vitest for Unit Testing? ... No / Yes
√ Add an End-to-End Testing Solution? » Cypress
√ Add ESLint for code quality? ... No / Yes
√ Add Prettier for code formatting? ... No / Yes
```

### 2. 项目结构说明

- `.eslintrc.cjs` 此文件包含 ESLint 的配置。
- `.cypress.config.js` - Cypress 是一种用于对应用程序执行测试的工具。

### 3. Tailwind

`Tailwind` 是一个能够快速构建站点的 CSS 框架。

安装 tailwind

```bash
npm i -D tailwindcss postcss autoprefixer
# 创建配置文件
npx tailwindcss init -p
```

### 4. 状态管理 (Pinia)

```bash
npm install pinia
```

### 5. 表单验证

表单验证是检查用户输入的格式是否正确的过程。

安装 `VeeValidate`

```bash
npm i vee-validate
```

安装验证规则

```bash
npm install @vee-validate/rules
```

### 6.Stores

用于存储一些全局数据

### 7.Actions

- 可用于所有组件。 -可以是异步的。
- 可以提交多个 `mutations`。

如果更改影响存储/状态，则在操作中定义逻辑。

### 8. JSON Web Token(JWT)

- 用于存储数据的编码字符串。
- 数字签名

[jwt.io](https://jwt.io)

### 9. 路由

- RouterView
- RouterLink
- 命名路由
- catchAll 404 页面处理
- 路由守卫 - 指的是在呈现组件之前对请求执行检查的能力

### 10.上传文件

### 11.无限滚动

### 12.播放音乐

1. 在单击播放按钮时将歌曲存储在状态中
2. 播放歌曲。
3. 切换播放/暂停
4. 将歌曲信息呈现到播放器上

- 持续时间/当前时间
- 歌曲名称
- 艺术家

5. 跟踪歌曲的当前进程
6. 允许用户拖动洗涤器
7. 暂停播放完后的歌曲

- Howler.js

```bash
npm install howler
```

### 13.自定义指令

- arg
- modifier

### 14. 国际化(i18n)

```bash
npm install vue-i18n@9
```

## 六、什么是渐进式Web应用程序

- Progressive web app 是一个术语，用于描述浏览器中的一组功能和应用程序。
- PWA功能可以在非单页应用的网站上实现

```bash
npm i vite-plugin-pwa -D
```

Manifest 文件配置
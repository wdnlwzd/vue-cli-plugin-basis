# *This package has been deprecated*
> ## This project has been renamed to `vue-cli-plugin-basis`. Install using [vue-cli-plugin-basis](https://www.npmjs.com/package/vue-cli-plugin-basis) instead.

## vue-cli-plugin-ym-basis
Vue-CLI 3.x plugin for ym.

[![npm](https://img.shields.io/npm/v/vue-cli-plugin-ym-basis.svg)](https://www.npmjs.com/package/vue-cli-plugin-ym-basis)

### :page_with_curl: Index
* [:warning: Heads up](#warning-heads-up)
* [:book: Intro](#book-intro)
* [:rocket: Getting Started](#rocket-getting-started)
* [:arrow_down: Install](#arrow_down-install)
* [:white_check_mark: TODO](#white_check_mark-todo)
* [:exclamation: Issues](#exclamation-issues)
* [:copyright: License](#copyright-license)

### :warning: Heads up

Currently this is just a beta version.

**If you switch from partial import to full import UI framework,
You need to rerun the service.**

### :book: Intro

`ym-basis` plugin to add:
1. [Element](https://github.com/ElemeFE/element),
2. [Vuetify](https://github.com/vuetifyjs/vuetify),
3. [Vue Hamlet](https://github.com/yimian/vue-hamlet),
4. [Vue I18n](https://github.com/kazupon/vue-i18n),
5. [Moment](https://github.com/moment/moment),

to your Vue Project.

This plugin will provide login and homepage.

### :rocket: Getting Started

### :arrow_down: Install:

:warning: Make sure you have Vue-CLI 3.x:

```
vue --version
```

If you haven't yet installed Vue-CLI 3.x,

first follow the install instructions here: https://github.com/vuejs/vue-cli

Create your new project with Vue-CLI 3.x:

```bash
vue create my-app
```

Before installing the `ym-basis` plugin, make sure to commit or stash your changes in case you need to revert.

Navigate to the newly created project folder,
Then, to install the ym-basis plugin:

```bash
cd my-app
vue add ym-basis
```

Finally, serve your project which will be available at http://localhost:8090

Start your app:

```bash
npm run serve
```

Open http://localhost:8090 to see the demo.

### :white_check_mark: TODO

- ~~add: [ECharts](https://github.com/apache/incubator-echarts)~~
- add: [Vue-ECharts](https://github.com/ecomfe/vue-echarts)
- add: Remote Presets.
- mod: styles folder.
- mod: change VueResource to axios.
- ......
- ......

### :exclamation: Issues

If you run into any issues you can hit us up on [issues](https://github.com/vasttian/vue-cli-plugin-ym-basis/issues)

### :copyright: License

[MIT](http://opensource.org/licenses/MIT)

# Vue 预渲染 （优化单页应用SEO）

如果你调研服务器端渲染 (SSR) 只是用来改善少数营销页面（例如 `/`, `/about`, `/contact` 等）的 SEO，那么你可能需要**预渲染**。无需使用 web 服务器实时动态编译 HTML，而是使用预渲染方式，在构建时 (build time) 简单地生成针对特定路由的静态 HTML 文件。优点是设置预渲染更简单，并可以将你的前端作为一个完全静态的站点。

基于vue-cli 3 配置

## 1.安装 [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin)

```shell
npm install prerender-spa-plugin -D
```



## 2.修改路由模式为history

```javascript
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
```



## 3.修改webpack配置

### (1) vue-cli3.0

```javascript
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');
module.exports = {
    configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return
    return {
      plugins: [
        new PrerenderSPAPlugin({
          // 生成文件的路径，也可以与webpakc打包的一致。
          // 下面这句话非常重要！！！
          // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会				卡着不动。
          staticDir: path.join(__dirname, 'dist'),
          // 需要预渲染的路由地址（比如a有参数，就需要写成 /a/param1）
          routes: ['/', '/ad'],

          // 对生成html进行压缩
          // minify: {
          //   collapseBooleanAttributes: true,
          //   collapseWhitespace: true,
          //   decodeEntities: true,
          //   keepClosingSlash: true,
          //   sortAttributes: true
          // },

          renderer: new Renderer({
            inject: {
              foo: 'bar'
            },
            headless: false,
            // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名				  称要对应上。
            renderAfterDocumentEvent: 'render-event'
          })
        })
      ]
    }
  }
}
```

官方配置项

```js
const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
  plugins: [
    ...
    new PrerenderSPAPlugin({
      // Required - The path to the webpack-outputted app to prerender.
      staticDir: path.join(__dirname, 'dist'),

      // Optional - The path your rendered app should be output to.
      // (Defaults to staticDir.)
      outputDir: path.join(__dirname, 'prerendered'),

      // Optional - The location of index.html
      indexPath: path.join(__dirname, 'dist', 'index.html'),

      // Required - Routes to render.
      routes: [ '/', '/about', '/some/deep/nested/route' ],

      // Optional - Allows you to customize the HTML and output path before
      // writing the rendered contents to a file.
      // renderedRoute can be modified and it or an equivelant should be returned.
      // renderedRoute format:
      // {
      //   route: String, // Where the output file will end up (relative to outputDir)
      //   originalRoute: String, // The route that was passed into the renderer, before redirects.
      //   html: String, // The rendered HTML for this route.
      //   outputPath: String // The path the rendered HTML will be written to.
      // }
      postProcess (renderedRoute) {
        // Ignore any redirects.
        renderedRoute.route = renderedRoute.originalRoute
        // Basic whitespace removal. (Don't use this in production.)
        renderedRoute.html = renderedRoute.html.split(/>[\s]+</gmi).join('><')
        // Remove /index.html from the output path if the dir name ends with a .html file extension.
        // For example: /dist/dir/special.html/index.html -> /dist/dir/special.html
        if (renderedRoute.route.endsWith('.html')) {
          renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route)
        }

        return renderedRoute
      },

      // Optional - Uses html-minifier (https://github.com/kangax/html-minifier)
      // To minify the resulting HTML.
      // Option reference: https://github.com/kangax/html-minifier#options-quick-reference
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true
      },

      // Server configuration options.
      server: {
        // Normally a free port is autodetected, but feel free to set this if needed.
        port: 8001
      },

      // The actual renderer to use. (Feel free to write your own)
      // Available renderers: https://github.com/Tribex/prerenderer/tree/master/renderers
      renderer: new Renderer({
        // Optional - The name of the property to add to the window object with the contents of `inject`.
        injectProperty: '__PRERENDER_INJECTED',
        // Optional - Any values you'd like your app to have access to via `window.injectProperty`.
        inject: {
          foo: 'bar'
        },

        // Optional - defaults to 0, no limit.
        // Routes are rendered asynchronously.
        // Use this to limit the number of routes rendered in parallel.
        maxConcurrentRoutes: 4,

        // Optional - Wait to render until the specified event is dispatched on the document.
        // eg, with `document.dispatchEvent(new Event('custom-render-trigger'))`
        renderAfterDocumentEvent: 'custom-render-trigger',

        // Optional - Wait to render until the specified element is detected using `document.querySelector`
        renderAfterElementExists: 'my-app-element',

        // Optional - Wait to render until a certain amount of time has passed.
        // NOT RECOMMENDED
        renderAfterTime: 5000, // Wait 5 seconds.

        // Other puppeteer options.
        // (See here: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions)
        headless: false // Display the browser window when rendering. Useful for debugging.
      })
    })
  ]
}
```

### (2) vue-cli 2.x

webpack.prod.conf.js

```js
// 头部引入
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

// plugins里面添加：
new PrerenderSPAPlugin({
  // 生成文件的路径，也可以与webpakc打包的一致。
  // 下面这句话非常重要！！！
  // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
  staticDir: path.join(__dirname, '../dist'),

  // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
  routes: ['/', '/a', '/b', '/c', '/d'],

  // 预渲染代理接口
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9018',
        secure: false
      }
    }
  },

  // 这个很重要，如果没有配置这段，也不会进行预编译
  renderer: new Renderer({
    inject: {
      foo: 'bar'
    },
    headless: false,
    // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应		上。
    renderAfterDocumentEvent: 'render-event'
  })
}),
```



### (3) main.js 配置修改

```
new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
```

## 4.开始打包

```shell
npm run build
```



## 5.查看dist文件夹，并运行服务

### 1.安装 [http server](https://www.npmjs.com/package/http-server)

```shell
npm i http-server -g   // 全局安装
```

### 2、进入到dist目录，启动本地服务器

```shell
hs -o -p 9999  // 自动启动本地dist目录下的index.html
```



## 6. 安装 vue-meta-info 配置title和meta：

```
npm install vue-meta-info --save
```

main.js

```js
import MetaInfo from 'vue-meta-info'
Vue.use(MetaInfo)
```

.vue 配置

```vue
<script>
export default {
  // 配置title和meta数据
  metaInfo: {
    title: '我是一个title',
    meta: [
      {
        name: 'keywords',
        content: '关键字1,关键字2,关键字3'
      },
      {
        name: 'description',
        content: '这是一段网页的描述'
      }
    ]
  },
  data () {
    return {}
  }
}
</script>
```

![生成的页面](C:\Users\Administrator\Desktop\1562226189521.png)

![1562226910444](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1562226910444.png)

## eg:

使用cli3.0插件添加

<https://github.com/SolarLiner/vue-cli-plugin-prerender-spa>

```
vue add prerender-spa
```


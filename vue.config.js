const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const path = require('path')
module.exports = {
  // baseUrl: './',
  // assetsDir: './',
  devServer: {
    port: 8989,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    }
    // proxy: {
    //   '/api': {
    //     target: '<url>',
    //     ws: true,
    //     changeOrigin: true
    //   },
    //   '/foo': {
    //     target: '<other_url>'
    //   }
    // }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return
    return {
      plugins: [
        new PrerenderSPAPlugin({
          // 生成文件的路径，也可以与webpakc打包的一致。
          // 下面这句话非常重要！！！
          // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
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
            // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
            renderAfterDocumentEvent: 'render-event'
          })
        })
      ]
    }
  }
}

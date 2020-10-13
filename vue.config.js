const path = require('path')
const debug = process.env.NODE_ENV !== 'production';

module.exports = {
    // 根域上下文目录
    publicPath:'/'　,

    // 将构建好的文件输出到哪里（或者说将编译的文件）
    outputDir: 'dist',
  
    // 放置静态资源的地方 (js/css/img/font/...)
    assetsDir: 'assets',

    // 是否在保存的时候使用 `eslint-loader` 进行检查。
    // 有效的值：`ture` | `false` | `"error"`
    // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
    lintOnSave: true,
  
    // 使用带有浏览器内编译器的完整构建版本
    // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
    runtimeCompiler: false,
  
    // 是否为生产环境构建生成 source map？
    productionSourceMap: true,
  
    // CSS 相关选项
    css: {
      // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
      // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
      extract: true,
  
      // 是否开启 CSS source map？
      sourceMap: false,
  
      // 为预处理器的 loader 传递自定义选项。比如传递给
      // sass-loader 时，使用 `{ sass: { ... } }`。
      loaderOptions: {},
  
      // 为所有的 CSS 及其预处理文件开启 CSS Modules。
      // 这个选项不会影响 `*.vue` 文件。
      modules: false
    },
  
    // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
    // 在多核机器下会默认开启。
    parallel: require('os').cpus().length > 1,
  
    // 配置 webpack-dev-server 行为。
    devServer: {
      open: true,
      host: 'localhost',
      port: 8080,
      https: false,
      hotOnly: false,
      // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
      proxy: {
          //配置跨域
            '/api': {
                  target: 'http://localhost:5000/api',
  ws:true,
                  changeOrigin: true,
                  pathRewrite:{
                '^/api':''
                }
            }
     },
     before: app => {}
    },
  
    // 三方插件的选项
    pluginOptions: {
      // ...
    }
  }
// 配置文件
// const pxtorem = require("postcss-pxtorem"); // rem(不手动方式)
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { getGenerateEntries } = require('./mutiple-entry')

const resolve = dir => path.join(__dirname, dir) // resolve方法
const generateEntries = getGenerateEntries()
const outputDir = getOutPutDir() // 出口根路径
const IS_DEV = process.env.NODE_ENV === 'development'

// console.log('mutiple-generateEntries:',generateEntries)
console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
console.log('process.env.VUE_APP_BASIC_API：', process.env.VUE_APP_BASIC_API);


// // 项目APP配置文件
// const appConfig = require('./app.config')
// // 多入口config
// const mulPagesConfig = getMulPagesConfig()
// const pageDir = mulPagesConfig.outputDir.split('/')[1] ?  mulPagesConfig.outputDir.split('/')[1] : ''
// console.log('mulPagesConfig, pageDir:', mulPagesConfig, pageDir)


function getOutPutDir(){
  let outputDir = 'dist'
 if(process.env.NODE_ENV === 'production'){
  outputDir = 'dist-prod'
 }else if(process.env.NODE_ENV === 'sit'){
  outputDir = 'dist-sit'
 }else{
  //
 }
 return outputDir
}

/*  */
module.exports = {
  publicPath: IS_DEV ? "/": "/", // 访问根目录
  outputDir: outputDir, // 'dist' // vue-cli-service build 时出口文件
  assetsDir: 'assets', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  lintOnSave: false, // process.env.NODE_ENV === 'development'
  // runtimeCompiler: true, // 运行时版本是否需要编译

  // 多入口
  pages: generateEntries,
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       // // 插件
  //       // plugins: [
  //       //   pxtorem({  // const pxtorem = require("postcss-pxtorem")
  //       //     rootValue: 37.5,
  //       //     propList: ["*"]
  //       //   })
  //       // ]
  //     }
  //   },
  // },
  devServer: {
    port: 8080,
    progress: true,  // 显示打包的进度条
    contentBase: resolve('dist'),  // 根目录
    open: true,  // 自动打开浏览器
    compress: true,  // 启动 gzip 压缩
    hot: true, //hot
    // 设置代理
    proxy: {
      // 将本地 /api2/xxx 代理到 localhost:3000/xxx
      '/api_dev': {
        target: 'http://rap2api.taobao.org/app/mock/23080/resources/search',
        changeOrigin: true,
        pathRewrite: {
            '/api_dev': ''
        }
      },
      '/api_sit': {
          target: 'http://rap2api.taobao.org/app/mock/23080/resources/search',
          changeOrigin: true,
          pathRewrite: {
              '/api_sit': ''
          }
      }
    }
  },
  chainWebpack: config => {
    /* delete something */
    Object.keys(generateEntries).forEach((entry) => {
      config.plugins.delete(`preload-${entry}`)
      config.plugins.delete(`prefetch-${entry}`)
    })
    /* 添加别名 */
    config.resolve.alias
      .set("@components", resolve('src/components/'))
      .set("@utils", resolve('src/utils/'))
      .set("@styles", resolve('src/styles/'))
      .set("@src", resolve('src/'))
    /* output.filename  js[contenthash:8] */
    if (IS_DEV) {
      config.output
        .filename(bundle => {
          console.log('bundle.chunk.name:', bundle.chunk.name)
          return 'assets/js/[name].js'
        })
    }else{
      config.output
        .filename(bundle => {
          console.log('bundle.chunk.name:', bundle.chunk.name)
          return 'assets/js/[name].[contenthash:8].js'
        })
    }
  },
  configureWebpack: config=>{ 
    console.log('config.optimization.splitChunks：',config.optimization.splitChunks);
    
    if (IS_DEV) { // dev
      config.devtool = 'cheap-module-eval-source-map'
      Object.assign(config, {
        plugins:[
          ...config.plugins,
          new MiniCssExtractPlugin({
             filename: 'assets/css/[name].css'
          })
        ]
      })
    } else { 
      // 非dev
      config.devtool = 'source-map'
      Object.assign(config, {
        plugins:[
          ...config.plugins,
          new MiniCssExtractPlugin({
             filename: 'assets/css/[name].[contentHash:8].css'
          })
        ]
      })
    }

    Object.assign(config, {
      plugins:[
        ...config.plugins,
        new webpack.IgnorePlugin(/\.\/locale/, /moment/),
        new CopyWebpackPlugin({
          patterns:[
            { from: path.resolve(__dirname,'src/addImg'), to: path.resolve(__dirname, outputDir, 'addImg'), force: true }
          ]
        }),
        // new TerserPlugin({
        //   // cache: true,
        //   parallel: true,
        //   sourceMap: false, // Must be set to true if using source-maps in production
        //   terserOptions: {
        //     compress: {
        //       warnings: false,
        //       drop_console: true,
        //       drop_debugger: true,
        //     },
        //   },
        // })
      ],
      optimization: {
        ...config.optimization,
        // 分割代码块
        splitChunks: {
            // ...config.optimization.splitChunks,
            /**
             * initial 入口chunk，对于异步导入的文件不处理
                async 异步chunk，只对异步导入的文件处理
                all 全部chunk
             */
            chunks: "all",
            // 缓存分组
            cacheGroups: {
                // ...config.optimization.splitChunks.cacheGroups,
                // vendors:{
                //   name: 'chunk-vendors',
                //   test: /[\\\/]node_modules[\\\/]/,
                //   priority: -10,
                //   chunks: 'initial' 
                // },
                // common:{ 
                //   name: 'chunk-common',
                //   minChunks: 2,
                //   priority: -20,
                //   chunks: 'initial',
                //   reuseExistingChunk: true 
                // },
                vendors: {
                  name: "chunk-vendors",
                  test: /[\\\/]node_modules[\\\/]/,
                  priority: 10,
                  chunks: "initial"// 只打包初始时依赖的第三方
                },
                elementUI: {
                  name: "chunk-elementUI",// 单独将 elementUI 拆包
                  priority: 20,// 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                  test: /[\\\/]node_modules[\\\/]element-ui[\\\/]/
                },
                echarts: {
                  name: "chunk-echarts",// 单独将 elementUI 拆包
                  priority: 20,// 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                  test: /[\\\/]node_modules[\\\/]echarts[\\\/]/
                },
                commons: {
                  name: "chunk-comomns",
                  // test: resolve("src/components"),// 可自定义拓展你的规则
                  minChunks: 2,// 最小共用次数
                  priority: 5,
                  reuseExistingChunk: true
                }
                  
                  
                // commons: {
                //   test: /node_modules/,
                //   name: 'vendor',
                //   chunks: 'initial',
                //   minSize: 1
                // },
                // // 第三方模块
                // vendor: {
                //   chunks: 'all',
                //     name: 'chunk-vendors', // chunk 名称
                //     priority: 100, // 权限更高，优先抽离，重要！！！
                //     test: /(vue|vue-router|vuex)/,
                // },
                // echarts: {
                //   chunks: 'all',
                //   name: 'chunk-echarts', // split elementUI into a single package
                //   priority: 100, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                //   test: /echarts/ // in order to adapt to cnpm
                // },
                // elementUI: {
                //   chunks: 'all',
                //   name: 'chunk-elementUI', // split elementUI into a single package
                //   priority: 100, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                //   test: /element-ui/ // in order to adapt to cnpm
                // },
                // 公共的模块
                
            }
        }
      }
      // output:{
      //   ...config.output,
      //   filename: `static/js/[name].[chunkhash].${version}.js`,
      //   chunkFilename: `static/js/[name].[chunkhash].${version}.js`
      // },
     
      // optimization,
      // plugins:[
      //   ...config.plugins,
      //   ...Object.keys(library).map(name => {
      //     return new webpack.DllReferencePlugin({
      //       context: process.cwd(),
      //       manifest: require(`./libs/package/json/${name}.manifest.json`),
      //     })
      //   }),
      //   new AddAssetHtmlPlugin(Object.keys(library).map(name => {
      //     return {
      //       filepath: require.resolve(path.resolve(`libs/package/js/${name}.${version_lib}.dll.js`)),
      //       outputPath: 'static/lib/js',
      //       publicPath:'./static/lib/js',
      //       includeSourcemap: false
      //     }
      //   })),
      // ]
     
    })
  },
  // pluginOptions:{
  // }
}

// module.exports = {
  // // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  // lintOnSave: false, // process.env.NODE_ENV !== 'production'

  // // 部署应用时的基本 URL
  // publicPath: process.env.NODE_ENV === 'production' ? '192.168.60.110:8080' : '192.168.60.110:8080',
 
  // // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
  // outputDir: 'dist',
 
  // // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  // assetsDir: '',
 
  // // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  // indexPath: 'index.html',
 
  // // 默认在生成的静态资源文件名中包含hash以控制缓存
  // filenameHashing: true,
 
  // // 构建多页面应用，页面的配置
  // pages: {
  //   index: {
  //     // page 的入口
  //     entry: 'src/index/main.js',
  //     // 模板来源
  //     template: 'public/index.html',
  //     // 在 dist/index.html 的输出
  //     filename: 'index.html',
  //     // 当使用 title 选项时，
  //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: 'Index Page',
  //     // 在这个页面中包含的块，默认情况下会包含
  //     // 提取出来的通用 chunk 和 vendor chunk。
  //     chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   },
  // // 当使用只有入口的字符串格式时，
  // // 模板会被推导为 `public/subpage.html`
  // // 并且如果找不到的话，就回退到 `public/index.html`。
  // // 输出文件名会被推导为 `subpage.html`。
  // subpage: 'src/subpage/main.js'
  // },
 
  // // 是否使用包含运行时编译器的 Vue 构建版本
  // runtimeCompiler: false,
 
  // // Babel 显式转译列表
  // transpileDependencies: [],
 
  // // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  // productionSourceMap: true,
 
  // // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性（注：仅影响构建时注入的标签）
  // crossorigin: '',
 
  // // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  // integrity: false,
 
  // // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
  // // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象
  // configureWebpack: {
  //   // 别名
  //   alias: {
  //     '@components': path.resolve(__dirname, './src/components/'),
  //     '@styles': path.resolve(__dirname, './src/styles/'),
  //     '@src': path.resolve(__dirname, './src/')
  //   }
  // },
 
  // // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
  // chainWebpack: () =>{
 
  // },
 
  // // css的处理
  // css: {
  //   // 当为true时，css文件名可省略 module 默认为 false
  //   requireModuleExtension: true,
  //   // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
  //   // 默认生产环境下是 true，开发环境下是 false
  //   extract: false,
  //   // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
  //   sourceMap: false,
  //   //向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
  //   loaderOptions: {
  //     css: {},
  //     less: {},
  //     postcss: {
  //       // // 插件
  //       // plugins: [
  //       //   pxtorem({ // const pxtorem = require("postcss-pxtorem")
  //       //     rootValue: 37.5,
  //       //     propList: ["*"]
  //       //   })
  //       // ]
  //     }
  //   }
  // },
 
  // // 所有 webpack-dev-server 的选项都支持
  // devServer: {},
 
  // // 是否为 Babel 或 TypeScript 使用 thread-loader
  // parallel: require('os').cpus().length > 1,
 
  // // 向 PWA 插件传递选项
  // pwa: {},
 
  // // 可以用来传递任何第三方插件选项
  // pluginOptions: {}
//}

/* plugins */
// const console_plugins = {
//   VueLoaderPlugin: {},
//   DefinePlugin: { definitions: { 'process.env': [Object] } },      
//   CaseSensitivePathsPlugin: {
//     options: {},
//     logger:['log','debug'],
//     pathCache: {},
//     fsOperations: 0,
//     primed: false 
//   },
//   FriendlyErrorsWebpackPlugin: {
//     compilationSuccessInfo: {},
//     onErrors: undefined,
//     shouldClearConsole: true,
//     formatters,
//     transformers,
//     previousEndTimes: {} 
//   },
//   MiniCssExtractPlugin: {
//     options:{ 
//       filename: 'css/[name].[contenthash:8].css',
//       moduleFilename: [Function: moduleFilename],
//       ignoreOrder: false,
//       chunkFilename: 'css/[name].[contenthash:8].css' 
//     } 
//   },
//   OptimizeCssnanoPlugin: { options: { sourceMap: false, cssnanoOptions: [Object] } },
//   HashedModuleIdsPlugin: {
//     options:{ 
//        context: null,
//        hashFunction: 'md4',
//        hashDigest: 'hex',
//        hashDigestLength: 4 
//       } 
//   },
//   NamedChunksPlugin: { nameResolver: [Function] },
//   HtmlWebpackPlugin: {
//     options:
//      { template:
//         'xxx\\vue-component-demo\\public\\index.html',
//        templateParameters,
//        filename: 'index.html',
//        hash: false,
//        inject: true,
//        compile: true,
//        favicon: false,
//        minify: [Object],
//        cache: true,
//        showErrors: true,
//        chunks: 'all',
//        excludeChunks: []
//      }
//   }
// }


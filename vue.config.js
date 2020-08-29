// 配置文件
// // const px2rem = require('postcss-px2rem')
// const pxtorem = require("postcss-pxtorem"); // rem(不手动方式)

// const postcss = px2rem({
//   remUnit: 37.5, // 换算的基数 默认100，如37.5 作用 设计稿上元素宽375px,最终页面会换算成 10rem
// })

const path = require('path');

module.exports = {
  lintOnSave: false, // process.env.NODE_ENV === 'development'
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       // 插件
  //       plugins: [
  //         // postcss,
  //         pxtorem({
  //           rootValue: 37.5,
  //           propList: ["*"]
  //         })
  //       ]
  //     }
  //   },
  // }
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...

      // 只修改开发环境配置，打包会出现找不到定义的别名的错误
      // return {
      //     resolve: {
      //         alias: {
      //             '@c': path.resolve(__dirname, './src/components/'),
      //             '@css': path.resolve(__dirname, './src/assets/css'),
      //             '@img': path.resolve(__dirname, './src/assets/img'),
      //             '@js': path.resolve(__dirname, './src/assets/js'),
      //         }
      //     }
      // }
    }

    return {
        resolve: {
            alias: {
                '@components': path.resolve(__dirname, './src/components/'),
                '@styles': path.resolve(__dirname, './src/styles/'),
                '@src': path.resolve(__dirname, './src/')
            }
        }
    }
  }

  
  
}

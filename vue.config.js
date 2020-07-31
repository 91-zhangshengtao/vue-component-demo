// 配置文件
// const px2rem = require('postcss-px2rem')
const pxtorem = require("postcss-pxtorem");


/** pc端一般基数为37.5，移动端一般为16或者32 */
// const postcss = px2rem({
//   remUnit: 37.5, // 换算的基数 默认100，如37.5 作用 设计稿上元素宽375px,最终页面会换算成 10rem
// })
module.exports = {
  lintOnSave: false, // process.env.NODE_ENV === 'development'

  css: {
    loaderOptions: {
      postcss: {
        // 插件
        plugins: [
          // postcss,
          pxtorem({
            rootValue: 64,
            propList: ["*"]
          })
        ]
      }
    },
  }
  
}

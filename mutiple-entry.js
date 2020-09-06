const path = require('path')
const glob = require('glob')

const getGenerateEntries = () => {
  // 默认查询多页面地址
  const PATH_ENTRY = path.resolve(__dirname, './src')
  // 约定构建出的页面用folder名字，默认入口为每个页面的main.js
  const entryFilePaths = glob.sync(PATH_ENTRY + '/**/main.js') // ['路径1','路径2',...]
  console.log('glob-entryFilePaths:',entryFilePaths )
  
  const entry = {}

  entryFilePaths.forEach((filePath) => {
    console.log('filePath.match:',filePath.match(/([^/]+)\/main\.js$/))
    // 类似解析: https://zhidao.baidu.com/question/1308245802259692019.html
    // [ 
    //    'index1/main.js','index1',index: 60,
    //    input: 'D:/x/project-study/vue-project-study/vue-component-demo/src/index1/main.js',
    //    groups: undefined 
    // ]
      
    const FILENAME = filePath.match(/([^/]+)\/main\.js$/)[1]
    entry[FILENAME] = {
      entry: filePath,
      template: 'public/index.html',
      filename:  `${FILENAME}.html`,
      // title可不传，每个页面单独设置
      title: `${FILENAME} Page`,
      chunks: ['chunk-vendors', "chunk-elementUI","chunk-comomns", FILENAME]
    }
  })

  return entry
}

module.exports = {
    getGenerateEntries
}
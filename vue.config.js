// const path = require('path')
// const defaultSettings = require('./src/setting.js')

// function resolve (dir) {
//   return path.join(__dirname, dir)
// }

// const name = defaultSettings.title || 'vue Element Admin' // page title

module.exports = {
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        //
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      //配置跨域
      '/recommend': {
        target: "http://10.16.153.37:30050",
        changOrigin: true,
        ws: true,
        pathRewrite: {
          '^/recommend': ''
        }
      }
    }
  },
};
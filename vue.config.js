// const path = require('path')
// const defaultSettings = require('./src/setting.js')

// function resolve (dir) {
//   return path.join(__dirname, dir)
// }

// const name = defaultSettings.title || 'vue Element Admin' // page title

// // If your port is set to 80,
// // use administrator privileges to execute the command line.
// // For example, Mac: sudo npm run
// // You can change the port by the following method:
// // port = 9527 npm run dev OR npm run dev --port = 9527
// const port = process.env.port || process.env.npm_config_port || 9527 // dev port
module.exports = {
  // publicPath: '/',
  // outputDir: 'dist',
  // assetsDir: 'static',
  // lintOnSave: process.env.NODE_ENV === 'development',
  // productionSourceMap: false,
  // devServer: {
  //   port: port,
  //   open: true,
  //   overlay: {
  //     warnings: false,
  //     errors: true
  //   },
  //   before: require('./mock/mock-server.js')
  // },
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
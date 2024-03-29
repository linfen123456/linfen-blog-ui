'use strict'
const path = require('path')

module.exports = {

  dev: {
    assetsSubDirectory: 'static',
    // assetsPublicPath: '/',//本地开发时运行需要注释掉
    proxyTable: {
      '/linfen': {
        target: 'http://localhost:8081',//后端接口地址
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/linfen': '/',//重写,
        }
      }

    },

    // 本地开发使用
    host: 'localhost',
    port: 9527,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: false,
    devtool: 'cheap-source-map',
    cssSourceMap: false
  },

  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    productionSourceMap: false,
    devtool: 'source-map',
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report || false,
    generateAnalyzerReport: process.env.npm_config_generate_report || false
  }
}

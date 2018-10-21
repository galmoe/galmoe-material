// const path = require('path')
// const chalk = require('chalk')
// // const CompressionWebpackPlugin = require('compression-webpack-plugin')
// // const PrerenderSPAPlugin = require('prerender-spa-plugin')
// CDN
// const externals = {
//   'vue': 'Vue',
//   'vue-router': 'VueRouter',
//   'vuex': 'Vuex',
//   'axios': 'axios',
//   'element-ui': 'ELEMENT'
// }
//
// const cdn = {
//   css: [
//     'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
//     'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css'
//   ],
//   js: [
//     'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
//     'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
//     'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
//     'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.js',
//     'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js'
//   ]
// }

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  // baseUrl: process.env.NODE_ENV === 'production'
  //   ? 'http://47.94.16.206:3000/'
  //   : 'http://localhost:3000/',
  baseUrl: '/',
  // 打包目录
  outputDir: 'dist',
  // eslint
  lintOnSave: true,
  filenameHashing: true,
  productionSourceMap: false,
  devServer: {
    // open: process.platform === 'darwin',
    // host: '0.0.0.0',
    // port: 8080,
    // https: false,
    // hotOnly: false,
    // proxy: null,
    // before: app => {}
  },
  // 开启gzip
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
      )
    }
  }
}

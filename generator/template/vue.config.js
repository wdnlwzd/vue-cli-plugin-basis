const authApi = 'xxx';
const commonApi = 'xxx';

module.exports = {
  devServer: {
    proxy: {
      '/api/auth': {
        target: authApi,
        changeOrigin: true,
        pathRewrite: {'/api/auth': '/auth'},
      },
      '/api/common': {
        target: commonApi,
        changeOrigin: true,
        pathRewrite: {'/api/common': '/api'}
      },
    },
    host: '0.0.0.0',
    port: 8090,
    https: false,
    open: false,
  },
  css: {
    sourceMap: true,
  },
  productionSourceMap: false,
  runtimeCompiler: true,
}

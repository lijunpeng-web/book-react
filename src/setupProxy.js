const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://192.168.122.230:3000/wab/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  )
}

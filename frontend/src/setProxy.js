const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = app => {
  app.use(
    "ws",
    createProxyMiddleware(
      {
        target: 'https://13.125.211.176:8080',
        changeOrigin: true,
        ws: true,
      }
    )
  )
}
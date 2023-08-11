const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = app => {
  app.use(
    "ws",
    createProxyMiddleware(
      {
        target: 'http://i9a407.p.ssafy.io:8080',
        changeOrigin: true,
        ws: true,
      }
    )
  )
}
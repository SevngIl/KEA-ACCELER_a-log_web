const { createProxyMiddleware } = require("http-proxy-middleware");

// src/setupProxy.js

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/login", {
      target: "https://github.com",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/user", {
      target: "https://api.github.com",
      changeOrigin: true,
    })
  );
};

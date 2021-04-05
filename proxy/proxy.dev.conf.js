proxyConfig = [
  {
    context: ["/auth", "/api"],
    target: "http://localhost:3000/",
    changeOrigin: true,
    secure: false,
  },
];

module.exports = proxyConfig;

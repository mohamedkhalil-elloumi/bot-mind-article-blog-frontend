proxyConfig = [
  {
    context: ["/auth", "/api"],
    target: "https://bot-mind.herokuapp.com/",
    changeOrigin: true,
    secure: false,
  },
];

module.exports = proxyConfig;

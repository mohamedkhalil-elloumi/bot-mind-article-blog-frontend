const express = require("express");
const path = require("path");
const proxy = require("express-http-proxy");
const url = require("url");
const app = express();

const apiProxy = proxy("https://bot-mind.herokuapp.com/", {
  forwardPath: (req) => url.parse(req.baseUrl).path,
});

app.use("/api/*", apiProxy);
app.use("/auth/*", apiProxy);
// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/frontend"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/src"));
});
app.listen(process.env.PORT || 4000);

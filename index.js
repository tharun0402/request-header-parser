var express = require("express");
var app = express();

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/whoami", function (req, res) {
  var ip =
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket.remoteAddress ||
    req.ip;

  var language = req.headers["accept-language"] || "";
  var software = req.headers["user-agent"] || "";

  res.json({
    ipaddress: ip,
    language: language,
    software: software
  });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Your app is listening on port " + listener.address().port
  );
});
var express = require("express");
var router = express.Router();

router.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

router.get("/debug-sentry", function(req, res, next) {
  res.render("index", {
    title: "Sarthak Mohanty"
  });
});

module.exports = router;
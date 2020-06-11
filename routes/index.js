
module.exports = router;

var express = require("express");
var secured = require("../lib/middleware/secured");
var router = express.Router();

/* GET debug page. */
router.get("/index", secured(), function(req, res, next) {
  const { _raw, _json, usermetadata, ...userProfile} = req.user;
  res.render("index", {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: "Sarthak Mohanty"
  });
});

module.exports = router;


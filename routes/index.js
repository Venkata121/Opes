var express = require("express");
var secured = require("../lib/middleware/secured");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    title: "Sarthak Mohanty"
  });
});

/* GET debug page. */
router.get("/debug", secured(), function(req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  res.render("debug", {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: "Debug"
  });
});

/* GET resources page. */
router.get("/resources", secured(), function(req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  res.render("resources", {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: "Resources",
  });
});

router.get("/test/:body", secured(), function(req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  res.render( 'test', { output: req.params.body });
});

module.exports = router;
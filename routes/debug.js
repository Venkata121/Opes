var express = require("express");
var secured = require("../lib/middleware/secured");
var router = express.Router();

/* GET user profile. */
router.get("/debug", secured(), function(req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  res.render("debug", {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: "Debug"
  });
});

module.exports = router;
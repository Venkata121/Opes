var express = require("express");
var secured = require("../lib/middleware/secured");
var router = express.Router();

/* GET resources page. */
router.get("/resources", secured(), function(req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  res.render("resources", {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: "Resources"
  });
});

module.exports = router;
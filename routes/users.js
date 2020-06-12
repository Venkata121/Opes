var express = require("express");
var secured = require("../lib/middleware/secured");
var router = express.Router();

/* GET user profile. */
router.get("/user", secured(), function(req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  res.render("user", {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: "Profile Page",
    subjects: ["ArtHistory","Biology","CalcBC","Chemistry","CompGov","CompSci","CompSciA","EnglishLang","EnglishLit","EnvSci","Euro","HumanGeo","Macro","Micro","MusicTheory","Physics1","Physics2","PhysicsCEM","PhysicsCMech","Psychology","Statistics","USGov","USHistory","WorldHistory"]
  });
});

module.exports = router;

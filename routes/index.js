var express = require("express");
var secured = require("../lib/middleware/secured");
var router = express.Router();
var AWS = require("aws-sdk");
var s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const pug = require("pug");

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
  var AWS = require("aws-sdk");
  var s3 = new AWS.S3({ apiVersion: "2006-03-01" });
  var subject = [
    "ArtHistory",
    "Biology",
    "CalcBC",
    "Chemistry",
    "CompGov",
    "CompSci",
    "CompSciA",
    "EnglishLang",
    "EnglishLit",
    "EnvSci",
    "Euro",
    "HumanGeo",
    "Macro",
    "Micro",
    "MusicTheory",
    "Physics1",
    "Physics2",
    "PhysicsCEM",
    "PhysicsCMech",
    "Psychology",
    "Statistics",
    "USGov",
    "USHistory",
    "WorldHistory"
  ];
  var params = {
    Bucket: "sarthakcdn",
    Key: "/secured/QB/" + subject,
    Expires: 60
  };
  var url = s3.getSignedUrl("getObject", params);
  var compiledSubjectLink = pug.compileFile("resources.pug");
  console.log(
    compiledSubjectLink({
      url: url
    })
  );
  // "<p>Timothy's Pug source code!</p>"

  res.render("resources", {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: "Resources",
    subjects: [
      "ArtHistory",
      "Biology",
      "CalcBC",
      "Chemistry",
      "CompGov",
      "CompSci",
      "CompSciA",
      "EnglishLang",
      "EnglishLit",
      "EnvSci",
      "Euro",
      "HumanGeo",
      "Macro",
      "Micro",
      "MusicTheory",
      "Physics1",
      "Physics2",
      "PhysicsCEM",
      "PhysicsCMech",
      "Psychology",
      "Statistics",
      "USGov",
      "USHistory",
      "WorldHistory"
    ]
  });
});

module.exports = router;

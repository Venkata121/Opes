var express = require("express");
var secured = require("../lib/middleware/secured");
var router = express.Router();
var AWS = require("aws-sdk");
var s3 = new AWS.S3({ apiVersion: "2006-03-01" });
var pug = require("pug");

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
  var s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    signatureVersion: "v4",
    region: "us-east-2"
  });
  var qbahurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/ArtHistory/index.html",
    Expires: 300
  });
  var qbburl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/Biology/index.html",
    Expires: 300
  });
  var qbcbcurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/CalcBC/index.html",
    Expires: 300
  });
  var qbchemurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/Chemistry/index.html",
    Expires: 300
  });
  var qbcgovurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/CompGov/index.html",
    Expires: 300
  });
  var qbcsurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/CompSci/index.html",
    Expires: 300
  });
  var qbcsaurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/CompSciA/index.html",
    Expires: 300
  });
  var qbelaurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/EnglishLang/index.html",
    Expires: 300
  });
  var qbeliurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/EnglishLit/index.html",
    Expires: 300
  });
  var qbesurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/EnvSci/index.html",
    Expires: 300
  });
  var qbeuurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/Euro/index.html",
    Expires: 300
  });
  var qbhgurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/HumanGeo/index.html",
    Expires: 300
  });
  var qbmaurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/Macro/index.html",
    Expires: 300
  });
  var qbmiurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/Micro/index.html",
    Expires: 300
  });
  var qbmturl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/MusicTheory/index.html",
    Expires: 300
  });
  var qbp1url = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/Physics1/index.html",
    Expires: 300
  });
  var qbp2url = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/Physics2/index.html",
    Expires: 300
  });
  var qbpcemurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/PhysicsCEM/index.html",
    Expires: 300
  });
  var qbpcmurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/PhysicsCMech/index.html",
    Expires: 300
  });
  var qbpsurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/Psychology/index.html",
    Expires: 300
  });
  var qbsturl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/USGov/index.html",
    Expires: 300
  });
  var qbusgurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/USHistory/index.html",
    Expires: 300
  });
  var qbushurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/WorldHistory/index.html",
    Expires: 300
  });
  res.render("resources", {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: "Resources",
    qbahurl: qbahurl,
    qbburl: qbburl,
    qbcbcurl: qbcbcurl,
    qbchemurl: qbchemurl,
    qbcgovurl: qbcgovurl,
    qbcsaurl: qbcsaurl,
    qbelaurl: qbelaurl,
    qbeliurl:qbeliurl,
    qbesurl: qbesurl,
    qbeuurl: qbeuurl,
    qbhgurl: qbhgurl,
    qbmaurl: qbmaurl,
    qbmiurl: qbmiurl,
    qbmturl: qbmturl,
    qbp1url: qbp1url,
    qbp2url: qbp2url,
    qbpcemurl: qbpcemurl,
    qbpcmurl: qbpcmurl,
    qbpsurl: qbpsurl,
    qbsturl: qbsturl,
    qbusgurl: qbusgurl,
    qbushurl: qbushurl,
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

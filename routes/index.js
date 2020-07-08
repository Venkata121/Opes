var express = require("express");
var secured = require("../lib/middleware/secured");
var router = express.Router();
var AWS = require("aws-sdk");
var pug = require("pug");
var fs = require("fs");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    title: "Sarthak Mohanty"
  });
});

/* GET debug page. */
router.get("/debug", secured(), function(req, res, next) {
  const userProfile = req.user;
  res.render("debug", {
    userProfile: JSON.stringify(req.user, null, 2),
    title: "Debug"
  });
});

/* GET resources page. */
router.get("/resources", secured(), function(req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;

  // QUESTION BANK FEATURE

  var AWS = require("aws-sdk");
  const cloudFront = new AWS.CloudFront.Signer(
    process.env.CLOUDFRONT_KEY_PAIR_ID,
    process.env.CLOUDFRONT_PRIVATE_KEY
  );

  const policy = JSON.stringify({
    Statement: [
      {
        Resource: "http*://cdn.sarthakmohanty.me/*", // http* => http and https
        Condition: {
          DateLessThan: {
            "AWS:EpochTime":
              Math.floor(new Date().getTime() / 1000) + 60 * 60 * 1 // Current Time in UTC + time in seconds, (60 * 60 * 1 = 1 hour)
          }
        }
      }
    ]
  });

  // AUTH PAGE FEATURE

  var authpage = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/index.html",
    policy: policy
  });

  // SESSION ID FEATURE

  function randomString(length, chars) {
    var mask = "";
    if (chars.indexOf("a") > -1) mask += "abcdefghijklmnopqrstuvwxyz";
    if (chars.indexOf("A") > -1) mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (chars.indexOf("#") > -1) mask += "0123456789";
    if (chars.indexOf("!") > -1) mask += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
    var result = "";
    for (var i = length; i > 0; --i)
      result += mask[Math.floor(Math.random() * mask.length)];
    return result;
  }
  const SessionID = randomString(32, "#aA");

  var date = Date.now();

  // function log(message) {
  //   console.log(message);
  //   fs.writeFileSync("./output.txt");
  // }
  const log =
    date +
    ": " +
    req.user._json["email"] +
    "-" +
    req.user._json["https://idkwhythathadtobethere/premium"] +
    ": " +
    SessionID;

  fs.writeFileSync("output.txt", log, function(err) {
    if (err) return console.log(err);
    console.log(log);
    console.log("The file has been updated!");
  });

  fs.appendFile("output.txt", log, function(err) {
    if (err) return console.log(err);
    console.log(log);
    console.log("The file has been updated!");
  });

  console.log(fs.readFileSync("output.txt").toString());

  const cdnnamespace = "https://cdn.sarthakmohanty.me/secured";

  res.render("resources", {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: "Resources",
    cdnnamespace: cdnnamespace,
    authpage: authpage,
    SessionID: SessionID,
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

router.get("/shutdown", (req, res) => {
  res.end("OK");
  // A small timeout so that the app has the time to respond
  setTimeout(() => {
    process.exit(0);
  }, 500);
});

router.get("/privacy", function(req, res, next) {
  res.render("privacy", {
    title: "Privacy Policy"
  });
});

router.get("/terms", function(req, res, next) {
  res.render("terms", {
    title: "Terms and Conditions"
  });
});

/* GET payment page. */
router.get("/pay", function(req, res, next) {
  res.render("pay", {
    title: "Pay"
  });
});

/* GET payment page. */
router.get("/discount", function(req, res, next) {
  res.render("discount", {
    title: "Discount"
  });
});

module.exports = router;

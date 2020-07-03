var express = require("express");
var secured = require("../lib/middleware/secured");
var router = express.Router();
var AWS = require("aws-sdk");
var s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  signatureVersion: "v4",
  region: "us-east-2"
});
var pug = require("pug");

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
  const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAjNrNlHfwpHM/LzyogGi2cEVXDcWSUHgh4Fgrlrh7ZIJD83md
pHX2wLFhbVlId4fFRaqQTLu6XuiVrdlZj+m9YN6EAjQSmoK+0zVFXInCpJsCTDYs
mNRMR7z7o2yfgIegzHRZwPe7R2H9rtHMUtHXcZFbK5rLruiQpc1kq4qiNgKF269a
GDhOsG7d8FSuK+5BWNqEh9WcZnkf4LfjI21uLdgympwyKsCPY4PGbkRBFrUWPTna
3w4hiZNVVcFItbpa5d50I0ICapwBqCOJu9RnaE/ExuTyYtksccn5B9NGufplRx9Q
TpeFBwAzX8U2/WYTrQ9VKV8+u5XpoW/0rusF2wIDAQABAoIBADf35UI+Wl9t78hc
SPQlJ4D6/HlbbSUOZx+WyVMtYNJyNH/1bh9gRDkTAoyJspLUXx2shYQIACkgMAGR
YNYfYYGxSTD68f11QE/6VeJMVwxDD6mqyRO9H8ZNoIuyaLqQqeMzxEo55a+aj0u8
z3yFJx9YS6rK6m5IuNk5AOxsvMHKq4g4t94p3O3bjrDdMicSMTD/DMe6xJgGNYKi
fn/qY/t0bYRwpTUFOxzwFEL3663TaAN6nWEIsUfOtsVuc6hAqD13/rittEdyvrnf
PIe6dy90NxUmzSlhAAcvuFXOyHlghXWLs9V70okuDqVtg1w3UvL9fy7cSDAcm47A
IQb4iyECgYEA4u5UCDhBDwJpyJcw27LFB+BxB6gP4nNi8sH2lukASL+I+Io/4lq5
oOL8s5V2TeGB3jiqHh5wHix2nBjdOryhHaBycrG5m4ihIBmGJsA3+3+elHafOSNr
SmcDgHWrp5iTzb53VJzGUe+wQv6yEVZwOXeg9T4wY3YeEdk/YBHcB9ECgYEAnuXN
569xweY6C6kupUJuLxZb2FSxWCB0/1mkAEhMaUELjYmKm5cuk82E98hbJC1BjbFt
Y/IdJl2iHq3NsuUcGuRkHBj75I5ozkNmnbsuVDK+FM3Fh2KK8DnTxsxNSjYz0/tZ
S3981S3HgEaHzLeJtq16ixdlkEoDDFVISM7xiesCgYEAo1KBuhS6hhHnjk16BXSJ
J50Z3DfRjtoaqbp9Pald4f2vl6jwR3miRa93zcvRBEY7kHLZxKmFacH4b2nZts9R
aaAzHmbYvZ68z/xut276G5CC0jj5aUcbjcXMGGUX8Jv4LEhbW9MlTI0kH2NtRtse
E84MUtS6QKsfAxuG6B6SbDECgYBwmTY9DNVW6veNFdlJIHcGBRkWhoWZhn6CCJqv
3IvRNleid6nyMcK+2C92itMTIsLGTsnOvl4rtsRQaydNsw8ke135jzbIsqXQLHEG
KwNchQyvn1VvZ8Q/EStiP5oxkZFOkVmop3HleuhZnSFUT2dWPT6OXAkLo3bfgXuU
pJkC+wKBgHHCnC+BKysg7/uXmsvRRactpQO0BtdHuL0TT7t8ekJkwbHWl9QeAOYf
3BFWrWJd8ttm5h4rNUGW4c6qsPUAGKyC0LxPS0HN6Usb3gvHtq7rhA8lF00YqqSz
ODVirisnt8NMcWirxTWVd/uMfbOiB3Xt3g3LEI4L9bUtUJ76t7lR
-----END RSA PRIVATE KEY-----`;
  // QUESTION BANK FEATURE

  var AWS = require("aws-sdk");
  const cloudFront = new AWS.CloudFront.Signer(
    process.env.CLOUDFRONT_KEY_PAIR_ID,
    privateKey
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

  var qbahurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/ArtHistory/index.html",
    policy: policy
  });
  var qbburl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/Biology/index.html",
    policy: policy
  });
  var qbcbcurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/CalcBC/index.html",
    policy: policy
  });
  var qbchemurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/Chemistry/index.html",
    policy: policy
  });
  var qbcgovurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/CompGov/index.html",
    policy: policy
  });
  var qbcsurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/CompSci/index.html",
    policy: policy
  });
  var qbcsaurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/CompSciA/index.html",
    policy: policy
  });
  var qbelaurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/EnglishLang/index.html",
    policy: policy
  });
  var qbeliurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/EnglishLit/index.html",
    policy: policy
  });
  var qbesurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/EnvSci/index.html",
    policy: policy
  });
  var qbeuurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/Euro/index.html",
    policy: policy
  });
  var qbhgurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/HumanGeo/index.html",
    policy: policy
  });
  var qbmaurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/Macro/index.html",
    policy: policy
  });
  var qbmiurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/Micro/index.html",
    policy: policy
  });
  var qbmturl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/MusicTheory/index.html",
    policy: policy
  });
  var qbp1url = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/Physics1/index.html",
    policy: policy
  });
  var qbp2url = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/Physics2/index.html",
    policy: policy
  });
  var qbpcemurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/PhysicsCEM/index.html",
    policy: policy
  });
  var qbpcmurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/PhysicsCMech/index.html",
    policy: policy
  });
  var qbpsurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/Psychology/index.html",
    policy: policy
  });
  var qbsturl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/Statistics/index.html",
    policy: policy
  });
  var qbusgurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/USGov/index.html",
    policy: policy
  });
  var qbushurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/USHistory/index.html",
    policy: policy
  });
  var qbwhurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/QB/WorldHistory/index.html",
    policy: policy
  });

  // PERSONAL PROGRESS CHECK FEATURE

  var ppcahurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/ArtHistory/index.html",
    policy: policy
  });
  var ppcburl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/Biology/index.html",
    policy: policy
  });
  var ppccbcurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/CalcBC/index.html",
    policy: policy
  });
  var ppcchemurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/Chemistry/index.html",
    policy: policy
  });
  var ppccgovurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/CompGov/index.html",
    policy: policy
  });
  var ppccsurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/CompSci/index.html",
    policy: policy
  });
  var ppccsaurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/CompSciA/index.html",
    policy: policy
  });
  var ppcelaurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/EnglishLang/index.html",
    policy: policy
  });
  var ppceliurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/EnglishLit/index.html",
    policy: policy
  });
  var ppcesurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/EnvSci/index.html",
    policy: policy
  });
  var ppceuurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/Euro/index.html",
    policy: policy
  });
  var ppchgurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/HumanGeo/index.html",
    policy: policy
  });
  var ppcmaurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/Macro/index.html",
    policy: policy
  });
  var ppcmiurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/Micro/index.html",
    policy: policy
  });
  var ppcmturl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/MusicTheory/index.html",
    policy: policy
  });
  var ppcp1url = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/Physics1/index.html",
    policy: policy
  });
  var ppcp2url = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/Physics2/index.html",
    policy: policy
  });
  var ppcpcemurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/PhysicsCEM/index.html",
    policy: policy
  });
  var ppcpcmurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/PhysicsCMech/index.html",
    policy: policy
  });
  var ppcpsurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/Psychology/index.html",
    policy: policy
  });
  var ppcsturl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/Statistics/index.html",
    policy: policy
  });
  var ppcusgurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/USGov/index.html",
    policy: policy
  });
  var ppcushurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/USHistory/index.html",
    policy: policy
  });
  var ppcwhurl = cloudFront.getSignedUrl({
    url: "https://cdn.sarthakmohanty.me/secured/PPC/WorldHistory/index.html",
    policy: policy
  });

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
  var SessionID = randomString(32, "#aA");

  console.log(SessionID);

  res.render("resources", {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: "Resources",
    qbahurl: qbahurl,
    qbburl: qbburl,
    qbcbcurl: qbcbcurl,
    qbchemurl: qbchemurl,
    qbcgovurl: qbcgovurl,
    qbcsurl: qbcsurl,
    qbcsaurl: qbcsaurl,
    qbelaurl: qbelaurl,
    qbeliurl: qbeliurl,
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
    qbwhurl: qbwhurl,
    ppcahurl: ppcahurl,
    ppcburl: ppcburl,
    ppccbcurl: ppccbcurl,
    ppcchemurl: ppcchemurl,
    ppccgovurl: ppccgovurl,
    ppccsurl: ppccsurl,
    ppccsaurl: ppccsaurl,
    ppcelaurl: ppcelaurl,
    ppceliurl: ppceliurl,
    ppcesurl: ppcesurl,
    ppceuurl: ppceuurl,
    ppchgurl: ppchgurl,
    ppcmaurl: ppcmaurl,
    ppcmiurl: ppcmiurl,
    ppcmturl: ppcmturl,
    ppcp1url: ppcp1url,
    ppcp2url: ppcp2url,
    ppcpcemurl: ppcpcemurl,
    ppcpcmurl: ppcpcmurl,
    ppcpsurl: ppcpsurl,
    ppcsturl: ppcsturl,
    ppcusgurl: ppcusgurl,
    ppcushurl: ppcushurl,
    ppcwhurl: ppcwhurl,
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
router.get("/payment", function(req, res, next) {
  res.render("payment", {
    title: "Payment"
  });
});

/* GET account page. */
router.get("/account", function(req, res, next) {
  res.render("account", {
    title: "Account"
  });
});

/* GET prices page. */
router.get("/prices", function(req, res, next) {
  res.render("prices", {
    title: "prices"
  });
});

module.exports = router;

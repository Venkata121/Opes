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
  const { _raw, _json, ...userProfile } = req.user;
  res.render("debug", {
    userProfile: JSON.stringify(userProfile, null, 2),
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
  const cloudFront = new AWS.CloudFront.Signer(
    process.env.CLOUDFRONT_KEY_PAIR_ID,
    privateKey
  );

  const policy = JSON.stringify({
    Statement: [
      {
        Resource: "http*://d2d3mdelw3jx6o.cloudfront.net/*", // http* => http and https
        Condition: {
          DateLessThan: {
            "AWS:EpochTime":
              Math.floor(new Date().getTime() / 1000) + 60 * 60 * 1 // Current Time in UTC + time in seconds, (60 * 60 * 1 = 1 hour)
          }
        }
      }
    ]
  });
  const cookie = cloudFront.getSignedCookie({
    policy
  });

  res.cookie("CloudFront-Key-Pair-Id", cookie["CloudFront-Key-Pair-Id"], {
    domain: ".cloudfront.net",
    path: "/",
    secure: true
  });

  res.cookie("CloudFront-Policy", cookie["CloudFront-Policy"], {
    domain: ".cloudfront.net",
    path: "/",
    secure: true
  });

  res.cookie("CloudFront-Signature", cookie["CloudFront-Signature"], {
    domain: ".cloudfront.net",
    path: "/",
    secure: true
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
    Key: "secured/QB/Statistics/index.html",
    Expires: 300
  });
  var qbusgurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/USGov/index.html",
    Expires: 300
  });
  var qbushurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/USHistory/index.html",
    Expires: 300
  });
  var qbwhurl = s3.getSignedUrl("getObject", {
    Bucket: "sarthakcdn",
    Key: "secured/QB/WorldHistory/index.html",
    Expires: 300
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

module.exports = router;

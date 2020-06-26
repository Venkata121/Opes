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
  console.log(req.user);
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
  // QUESTION BANK FEATURE

  var AWS = require("aws-sdk");
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

  var qbahurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/ArtHistory/index.html",
    policy: policy
  });
  var qbburl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/Biology/index.html",
    policy: policy
  });
  var qbcbcurl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/CalcBC/index.html",
    policy: policy
  });
  var qbchemurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/Chemistry/index.html",
    policy: policy
  });
  var qbcgovurl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/CompGov/index.html",
    policy: policy
  });
  var qbcsurl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/CompSci/index.html",
    policy: policy
  });
  var qbcsaurl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/CompSciA/index.html",
    policy: policy
  });
  var qbelaurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/EnglishLang/index.html",
    policy: policy
  });
  var qbeliurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/EnglishLit/index.html",
    policy: policy
  });
  var qbesurl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/EnvSci/index.html",
    policy: policy
  });
  var qbeuurl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/Euro/index.html",
    policy: policy
  });
  var qbhgurl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/HumanGeo/index.html",
    policy: policy
  });
  var qbmaurl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/Macro/index.html",
    policy: policy
  });
  var qbmiurl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/Micro/index.html",
    policy: policy
  });
  var qbmturl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/MusicTheory/index.html",
    policy: policy
  });
  var qbp1url = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/Physics1/index.html",
    policy: policy
  });
  var qbp2url = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/Physics2/index.html",
    policy: policy
  });
  var qbpcemurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/PhysicsCEM/index.html",
    policy: policy
  });
  var qbpcmurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/PhysicsCMech/index.html",
    policy: policy
  });
  var qbpsurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/Psychology/index.html",
    policy: policy
  });
  var qbsturl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/Statistics/index.html",
    policy: policy
  });
  var qbusgurl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/USGov/index.html",
    policy: policy
  });
  var qbushurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/USHistory/index.html",
    policy: policy
  });
  var qbwhurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/WorldHistory/index.html",
    policy: policy
  });

  // PERSONAL PROGRESS CHECK FEATURE

  var ppcahurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/ArtHistory/index.html",
    policy: policy
  });
  var ppcburl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/Biology/index.html",
    policy: policy
  });
  var ppccbcurl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/CalcBC/index.html",
    policy: policy
  });
  var ppcchemurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/Chemistry/index.html",
    policy: policy
  });
  var ppccgovurl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/CompGov/index.html",
    policy: policy
  });
  var ppccsurl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/CompSci/index.html",
    policy: policy
  });
  var ppccsaurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/CompSciA/index.html",
    policy: policy
  });
  var ppcelaurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/EnglishLang/index.html",
    policy: policy
  });
  var ppceliurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/EnglishLit/index.html",
    policy: policy
  });
  var ppcesurl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/EnvSci/index.html",
    policy: policy
  });
  var ppceuurl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/Euro/index.html",
    policy: policy
  });
  var ppchgurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/HumanGeo/index.html",
    policy: policy
  });
  var ppcmaurl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/Macro/index.html",
    policy: policy
  });
  var ppcmiurl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/Micro/index.html",
    policy: policy
  });
  var ppcmturl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/MusicTheory/index.html",
    policy: policy
  });
  var ppcp1url = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/Physics1/index.html",
    policy: policy
  });
  var ppcp2url = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/Physics2/index.html",
    policy: policy
  });
  var ppcpcemurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/PhysicsCEM/index.html",
    policy: policy
  });
  var ppcpcmurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/PhysicsCMech/index.html",
    policy: policy
  });
  var ppcpsurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/Psychology/index.html",
    policy: policy
  });
  var ppcsturl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/Statistics/index.html",
    policy: policy
  });
  var ppcusgurl = cloudFront.getSignedUrl({
    url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/USGov/index.html",
    policy: policy
  });
  var ppcushurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/USHistory/index.html",
    policy: policy
  });
  var ppcwhurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/WorldHistory/index.html",
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

var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => "Hello world!" };

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

module.exports = router;

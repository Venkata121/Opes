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
  const privateKey = process.env.CLOUDFRONT_PRIVATE_KEY;
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

// No reason to create a cookie since it must be placed on the header of recipient object
// Currently keeping it "just in case"

  // const cookie = cloudFront.getSignedCookie({
  //   policy
  // });

  // res.cookie("CloudFront-Key-Pair-Id", cookie["CloudFront-Key-Pair-Id"], {
  //   domain: ".sarthakmohanty.me",
  //   path: "/",
  //   httpOnly: true
  // });

  // res.cookie("CloudFront-Policy", cookie["CloudFront-Policy"], {
  //   domain: ".sarthakmohanty.me",
  //   path: "/",
  //   httpOnly: true
  // });

  // res.cookie("CloudFront-Signature", cookie["CloudFront-Signature"], {
  //   domain: ".sarthakmohanty.me",
  //   path: "/",
  //   httpOnly: true
  // });

  // INSERT cloudfront-url-example.js HERE

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

  var fetch = require("node-fetch");

  fetch("https://scibowldb.com/api/questions/random") // Call the fetch function passing the url of the API as a parameter
    .then(function() {
      console.log();
    })
    .catch(function() {
      // This is where you run code if the server returns any errors
    });

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

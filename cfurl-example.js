// DO NOT COPY THIS LINE
let privateKey;
//


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
          "AWS:EpochTime": Math.floor(new Date().getTime() / 1000) + 60 * 60 * 1 // Current Time in UTC + time in seconds, (60 * 60 * 1 = 1 hour)
        }
      }
    }
  ]
});

var qbahurl = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/ArtHistory/index.html",
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
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/Chemistry/index.html",
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
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/EnglishLang/index.html",
  policy: policy
});
var qbeliurl = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/EnglishLit/index.html",
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
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/MusicTheory/index.html",
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
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/PhysicsCEM/index.html",
  policy: policy
});
var qbpcmurl = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/PhysicsCMech/index.html",
  policy: policy
});
var qbpsurl = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/Psychology/index.html",
  policy: policy
});
var qbsturl = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/Statistics/index.html",
  policy: policy
});
var qbusgurl = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/USGov/index.html",
  policy: policy
});
var qbushurl = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/USHistory/index.html",
  policy: policy
});
var qbwhurl = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/WorldHistory/index.html",
  policy: policy
});

// PERSONAL PROGRESS CHECK FEATURE


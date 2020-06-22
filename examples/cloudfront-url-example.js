// This is a template to generate cloudfront presigned urls
// Used in ./routes/index.js

const AWS = require("aws-sdk");
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

var qbahurl = cloudFront.getSignedUrl({
    url:
      "https://d2d3mdelw3jx6o.cloudfront.net/secured/QB/ArtHistory/index.html",
    policy: policy
  });
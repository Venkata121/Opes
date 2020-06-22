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

var ppcahurl = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/ArtHistory/index.html",
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
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/Chemistry/index.html",
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
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/CompSciA/index.html",
  policy: policy
});
var ppcelaurl = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/EnglishLang/index.html",
  policy: policy
});
var ppceliurl = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/EnglishLit/index.html",
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
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/HumanGeo/index.html",
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
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/MusicTheory/index.html",
  policy: policy
});
var ppcp1url = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/Physics1/index.html",
  policy: policy
});
var ppcp2url = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/Physics2/index.html",
  policy: policy
});
var ppcpcemurl = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/PhysicsCEM/index.html",
  policy: policy
});
var ppcpcmurl = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/PhysicsCMech/index.html",
  policy: policy
});
var ppcpsurl = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/Psychology/index.html",
  policy: policy
});
var ppcsturl = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/Statistics/index.html",
  policy: policy
});
var ppcusgurl = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/USGov/index.html",
  policy: policy
});
var ppcushurl = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/USHistory/index.html",
  policy: policy
});
var ppcwhurl = cloudFront.getSignedUrl({
  url: "https://d2d3mdelw3jx6o.cloudfront.net/secured/PPC/WorldHistory/index.html",
  policy: policy
});
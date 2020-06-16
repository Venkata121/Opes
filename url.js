var AWS = require("aws-sdk");
var s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  signatureVersion: "v4",
  region: "us-east-2"
});
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

var ahurl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/ArtHistory/index.html",
  Expires: 300
});
var burl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
});
var cbcurl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/CalcBC/index.html",
  Expires: 300
});
var chemurl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Chemistry/index.html",
  Expires: 300
});
var cgovurl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/CompGov/index.html",
  Expires: 300
});
var csurl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/CompSci/index.html",
  Expires: 300
});
var csaurl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/CompSciA/index.html",
  Expires: 300
});
var elaurl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/EnglishLang/index.html",
  Expires: 300
});
var eliurl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/EnglishLit/index.html",
  Expires: 300
});
var esurl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/EnvSci/index.html",
  Expires: 300
});
var euurl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Euro/index.html",
  Expires: 300
});
var hgurl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/HumanGeo/index.html",
  Expires: 300
});
var maurl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Macro/index.html",
  Expires: 300
});
var miurl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Micro/index.html",
  Expires: 300
});
var mturl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/MusicTheory/index.html",
  Expires: 300
});
var p1url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Physics1/index.html",
  Expires: 300
});
var p2url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Physics2/index.html",
  Expires: 300
});
var pcemurl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/PhysicsCEM/index.html",
  Expires: 300
});
var pcmurl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/PhysicsCMech/index.html",
  Expires: 300
});
var psurl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Psychology/index.html",
  Expires: 300
});
var sturl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/USGov/index.html",
  Expires: 300
});
var usgurl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/USHistory/index.html",
  Expires: 300
});
var ushurl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/WorldHistory/index.html",
  Expires: 300
});

module.exports;

var AWS = require("aws-sdk");
var s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  signatureVersion: "v4",
  region: "us-east-2"
});
var subjects = [
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
];

var ahurl = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/ArtHistory/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/CalcBC/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/CompGov/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/CompSci/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/CompSciA/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/EnglishLang/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/EnglishLit/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/EnvSci/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Euro/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/HumanGeo/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Macro/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Micro/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/MusicTheory/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
});
var url = s3.getSignedUrl("getObject", {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
});

module.exports;

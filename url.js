var AWS = require("aws-sdk");
var s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  signatureVersion: "v4",
  region: "us-east-2"
});
var subjects = [
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
];
var QBArtHistoryparams = {
    Bucket: "sarthakcdn",
    Key: "secured/QB/ArtHistory/index.html",
    Expires: 300
  };
var QBArtHistoryurl = s3.getSignedUrl("getObject", QBArtHistoryparams);

var QBBiologyparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var QBBiologyurl = s3.getSignedUrl("getObject", QBBiologyparams);

var QBCalcBCparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/CalcBC/index.html",
  Expires: 300
};
var QBCalcBCurl = s3.getSignedUrl("getObject", QBCalcBCparams);

var QBChemistryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Chemistry/index.html",
  Expires: 300
};
var QBChemistryurl = s3.getSignedUrl("getObject", QBChemistryparams);

var QBCompGovparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/CompGov/index.html",
  Expires: 300
};
var QBCompGovurl = s3.getSignedUrl("getObject", QBCompGovparams);

var ArtHistoryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var ArtHistoryurl = s3.getSignedUrl("getObject", ArtHistoryparams);
var ArtHistoryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var ArtHistoryurl = s3.getSignedUrl("getObject", ArtHistoryparams);
var ArtHistoryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var ArtHistoryurl = s3.getSignedUrl("getObject", ArtHistoryparams);
var ArtHistoryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var ArtHistoryurl = s3.getSignedUrl("getObject", ArtHistoryparams);
var ArtHistoryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var ArtHistoryurl = s3.getSignedUrl("getObject", ArtHistoryparams);
var ArtHistoryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var ArtHistoryurl = s3.getSignedUrl("getObject", ArtHistoryparams);
var ArtHistoryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var ArtHistoryurl = s3.getSignedUrl("getObject", ArtHistoryparams);
var ArtHistoryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var ArtHistoryurl = s3.getSignedUrl("getObject", ArtHistoryparams);
var ArtHistoryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var ArtHistoryurl = s3.getSignedUrl("getObject", ArtHistoryparams);
var ArtHistoryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var ArtHistoryurl = s3.getSignedUrl("getObject", ArtHistoryparams);
var ArtHistoryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var ArtHistoryurl = s3.getSignedUrl("getObject", ArtHistoryparams);
var ArtHistoryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var ArtHistoryurl = s3.getSignedUrl("getObject", ArtHistoryparams);
var ArtHistoryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var ArtHistoryurl = s3.getSignedUrl("getObject", ArtHistoryparams);
var ArtHistoryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var ArtHistoryurl = s3.getSignedUrl("getObject", ArtHistoryparams);
var ArtHistoryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var ArtHistoryurl = s3.getSignedUrl("getObject", ArtHistoryparams);
var ArtHistoryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var ArtHistoryurl = s3.getSignedUrl("getObject", ArtHistoryparams);
var ArtHistoryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var ArtHistoryurl = s3.getSignedUrl("getObject", ArtHistoryparams);
var ArtHistoryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var ArtHistoryurl = s3.getSignedUrl("getObject", ArtHistoryparams);
var ArtHistoryparams = {
  Bucket: "sarthakcdn",
  Key: "secured/QB/Biology/index.html",
  Expires: 300
};
var ArtHistoryurl = s3.getSignedUrl("getObject", ArtHistoryparams);

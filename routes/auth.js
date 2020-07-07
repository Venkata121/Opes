var express = require("express");
var router = express.Router();
var passport = require("passport");
var dotenv = require("dotenv");
var util = require("util");
var url = require("url");
var querystring = require("querystring");

dotenv.config();

// Perform the login, after login Auth0 will redirect to callback
router.get(
  "/login",
  passport.authenticate("auth0", {
    scope: "openid email profile"
  }),
  function(req, res) {
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

    // Set Cookies after successful verification
    const cookie = cloudFront.getSignedCookie({
      policy
    });

    res.cookie("CloudFront-Key-Pair-Id", cookie["CloudFront-Key-Pair-Id"], {
      domain: "cdn.sarthakmohanty.me",
      path: "/",
      //httpOnly: true
    });

    res.cookie("CloudFront-Policy", cookie["CloudFront-Policy"], {
      domain: "cdn.sarthakmohanty.me",
      path: "/",
      //httpOnly: true
    });

    res.cookie("CloudFront-Signature", cookie["CloudFront-Signature"], {
      domain: "cdn.sarthakmohanty.me",
      path: "/",
      //httpOnly: true
    });
    res.redirect("/index.html");
  }
);

// Perform the final stage of authentication and redirect to previously requested URL or '/user'
router.get("/callback", function(req, res, next) {
  passport.authenticate("auth0", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      const returnTo = req.session.returnTo;
      delete req.session.returnTo;
      res.redirect(returnTo || "/user");
    });
  })(req, res, next);
});

// Perform session logout and redirect to homepage
router.get("/logout", (req, res) => {
  req.logout();

  var returnTo = req.protocol + "://" + "rb.sarthakmohanty.me";
  var port = req.connection.localPort;
  if (port !== undefined && port !== 80 && port !== 443 && port !== 3000) {
    returnTo;
  }

  var logoutURL = new url.URL(
    util.format("https://%s/v2/logout", process.env.AUTH0_DOMAIN)
  );
  var searchString = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo: returnTo
  });
  logoutURL.search = searchString;

  res.redirect(logoutURL);
});

module.exports = router;

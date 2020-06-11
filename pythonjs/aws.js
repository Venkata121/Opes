var base64 = require("base64");
var hmac = require("hmac")
var hashlib = require("sha1")


access_key = 'AKIAIOSFODNN7EXAMPLE'.encode("UTF-8")
secret_key = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'.encode("UTF-8")

string_to_sign = 'GET\n\n\nTue, 27 Mar 2007 19:36:42 +0000\n/awsexamplebucket1/photos/puppy.jpg'.encode("UTF-8")
signature = base64.encodestring(
                                hmac.new(
                                         secret_key, string_to_sign, sha1
                                         ).digest()
                                ).strip()


print(f"AWS {access_key.decode()}:{signature.decode()}")
const speakeasy = require('speakeasy');


var verified = speakeasy.totp.verify({
    secret:"",
    encoding:'ascii'

});
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');


var secret = speakeasy.generateSecret({
    length: 20,
    name: "ExcessiveAuth"
});
console.log(secret);


QRCode.toDataURL(secret.otpauth_url, function(err, data) {
    console.log(data);
});
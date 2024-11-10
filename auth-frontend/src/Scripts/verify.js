const speakeasy = require('speakeasy');

function verify (tokenInput, secretInput) {
    return speakeasy.totp.verify({
        secret: secretInput,
        encoding: 'ascii',
        token: tokenInput
    });    
}

export default verify;

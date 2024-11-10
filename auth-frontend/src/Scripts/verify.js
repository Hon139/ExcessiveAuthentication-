const OTOP = require('OTOP');

function verify (tokenInput, secretInput) {
    return OTOP.totp.verify({
        secret: secretInput,
        encoding: 'ascii',
        token: tokenInput
    });    
}

export default verify;

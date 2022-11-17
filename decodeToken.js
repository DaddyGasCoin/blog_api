require('dotenv').config()
const jwt = require('jsonwebtoken');

exports.decode = (bearerHeader) => {
    // Get auth header value
    let out
    // const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        const token = bearerToken;
        jwt.verify(token, process.env.secret_key, (err, authData) => {
            if (err) {
                out = '404'
            } else {
                out = authData
            }
        });
    } else {
        // Forbidden
        out = '404'
    }

    return out
}

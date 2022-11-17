const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config()

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret_key

module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload.user != "undefined") {
        return done(null, true)
    }
    return done(null, false)
})

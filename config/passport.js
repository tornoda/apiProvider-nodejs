const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require("mongoose")
const User = mongoose.model('users')
const keys = require('../config/key').secretKey

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys

module.exports = passport => {
    //下面的jwt_payload参数，是解析后的Authorization头信息，可以尝试把jwt_payload打印出来学习
    //console.log(jwt_payload):
    // { id: '5bbdd2b81638af1191feb2d5',
    // name: 'loo',
    // iat: 1539781092,
    // exp: 1539784692 }
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload)
        User.findById(jwt_payload.id)
            .then((user) => {
                if (!user) return done(null, false)
                return done(null, user)
            })
            .catch((err) => {
                console.log(err)
            })
    }))
}
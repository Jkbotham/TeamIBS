const FacebookStrategy = require("passport-facebook").Strategy;
const db = require("../models");
const config = require("./config")

module.exports = (app, passport) => {

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        done(null, id)
    })

    passport.use(new FacebookStrategy({
        clientID: config.facebook_api_key,
        clientSecret: config.facebook_api_secret,
        callbackURL: config.call_back_url,
        profileFields: ["id", "email", "displayName"]
    },
        function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                console.log(JSON.stringify(profile))
                if (config.use_database) {
                    db.User.findAll({
                        where: {
                            user_id: profile.id
                        }
                    }).then((results) => {
                        if (results[0]) {
                            console.log("User already exists")
                        } else {
                            db.User.create({
                                user_id: profile.id,
                                user_displayName: profile.displayName
                            })
                        }
                    });
                }
                // console.log(profile)
                return done(null, profile);
            });

        }
    ));



}
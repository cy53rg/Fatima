const LocalStrategy = require('passport-local').Strategy
const Passport = require('passport')
const bcrypt = require('bcrypt')
const User = require('../models/User');

module.exports = function UserAuth() {
    Passport.use('local', 
    new LocalStrategy({usernameField: 'username', passwordField: 'password'}, async (username, password, done) => {
        try {
            const user = await User.findOne({
                // attributes: ['username', 'password', 'status'],
                where: {
                    'username': username
                }
            });
            if (user === null) {
                return done(null, false, { message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password)
            // return console.log(isMatch)


            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, user);
            
        } catch (error) {
            return done(error);
        }
    }));

    Passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    Passport.deserializeUser(async function(id, done) {
        try {
            const user = await User.findByPk(id);
           
            done(null, user);
            
        } catch (error) {
            console.log(error)
        }
    });
};

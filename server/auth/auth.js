const LocalStrategy = require('passport-local')
const Passport = require('passport')

module.exports = function UserAuth(){

    passport.use('userAuth', 
    new LocalStrategy({usernameField: 'email', password: 'password'}, (email, password, done)=>{

    }))
}
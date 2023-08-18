const passport = require('passport')

module.exports = function AuthCheck(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    req.flash('errorMsg', 'session Expired')
    return res.redirect('/login')
}
const App = require('express')
const Router = App.Router()
const IndexController = require('../controllers/indexController')
const AuthenticateController = require('../controllers/authController')
const {body} = require('express-validator')
const passport = require('passport')
const IndexControllers =  new IndexController()
const AuthenticateControllers =  new AuthenticateController()
Router.get('/', IndexControllers.home)
Router.get('/about', IndexControllers.about)
Router.get('/gallery', IndexControllers.gallery)
Router.route('/contact')
.get(IndexControllers.contact)
.post(
    body('names').trim().notEmpty().isString().withMessage('empty field'),
    body('email').trim().notEmpty().isEmail().withMessage('invalid email address'),
    body('subject').trim().notEmpty().withMessage('empty field'),
    body('message').trim().notEmpty().withMessage('empty field'),
    IndexControllers.contactPost)

    // login
Router.route('/login')
.get(AuthenticateControllers.login)
.post(passport.authenticate('local', {
    session: true,
    failureRedirect: '/login', 
    failureFlash: true
}), (req, res)=>{
    res.redirect('/dashboard')
})

module.exports = Router
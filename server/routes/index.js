const App = require('express')
const Router = App.Router()
const IndexController = require('../controllers/indexController')
const {body} = require('express-validator')

const IndexControllers =  new IndexController()

Router.get('/', IndexControllers.home)
Router.get('/about', IndexControllers.about)
Router.get('/gallery', IndexControllers.gallery)
Router.route('/contact')
.get(IndexControllers.contact)
.post(
    body('names').trim().notEmpty().isString(),
    body('email').trim().notEmpty().isEmail(),
    body('subject').trim().notEmpty().isString(),
    body('message').trim().notEmpty().isString(),
    IndexControllers.contactPost)

module.exports = Router
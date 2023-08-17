const Express = require('express')
const ejs = require('ejs')
const Layout  = require('express-ejs-layouts')
// const BodyParser = require('body-parser')
const path = require('path')
const expressSession = require('express-session')
const App = Express()
const flash = require('connect-flash')
const cookieParser =  require('cookie-parser')
require('dotenv').config()
const {DBConnect} = require('./Database/connect')

App.use(Express.urlencoded({extended: true}))
// App.use(BodyParser.urlencoded({extended: false}))
App.use(Express.static(path.join('./', 'public')))
const PORT = process.env.PORT || 3000


App.use(Layout)
App.set('view engine', 'ejs')

App.use(expressSession({
    secret: 'hello fatima', 
    resave: false, 
    saveUninitialized: true
}))


App.use(cookieParser())
App.use(flash())

App.use((req, res, next)=>{
    res.locals.errorMsg = req.flash('errorMsg')
    res.locals.successMsg = req.flash('successMsg')
    next()
})

// routes
App.use('/', require('./routes/index'))


App.listen(PORT, ()=> {
    DBConnect()
    console.log(`server running on ${PORT}`)})

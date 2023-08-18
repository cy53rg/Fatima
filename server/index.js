const Express = require('express')
const ejs = require('ejs')
const Layout  = require('express-ejs-layouts')
const path = require('path')
const expressSession = require('express-session')
const flash = require('connect-flash')
const cookieParser =  require('cookie-parser')
const Passport  = require('passport')
const { Strategy } = require('passport-local')
const {v2} = require('cloudinary')

const {DBConnect} = require('./Database/connect')
const userAuth = require('./auth/auth')
require('dotenv').config()


// async function cloudConnect(){
//     try {
        
//         let response = await 

//     } catch (error) {
//         console.log(error)
//     }

// }

v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.ClOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const App = Express()
App.use(Express.urlencoded({extended: false}))
App.use(Express.static(path.join('./', 'public')))
const PORT = process.env.PORT || 3000


App.use(Layout)
App.set('view engine', 'ejs')

App.use(expressSession({
    secret: 'hello fatima', 
    resave: true, 
    saveUninitialized: true
}))


App.use(cookieParser())
App.use(flash())

App.use((req, res, next)=>{
    res.locals.errorMsg = req.flash('errorMsg')
    res.locals.successMsg = req.flash('successMsg')
    next()
})
DBConnect()

// passport 
App.use(Passport.initialize());
App.use(Passport.session());

Passport.use(Strategy, userAuth())
// routes
App.use('/', require('./routes/index'))
App.use('/dashboard', require('./routes/dashboard'))


App.listen(PORT, ()=> {
    
    console.log(`server running on ${PORT}`)})

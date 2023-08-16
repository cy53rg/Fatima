const Express = require('express')
const Ejs = require('ejs')
const Layout  = require('express-ejs-layouts')
const BodyParser = require('body-parser')
const path = require('path')
const App = Express()
require('dotenv').config()


App.use(Express.static(path.join()))
App.use(BodyParser.urlencoded({extended: true}))

const PORT = process.env.PORT || 3000


App.use(Layout)
App.listen(PORT, ()=> {console.log(`server running on ${PORT}`)})

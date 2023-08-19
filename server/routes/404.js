const App = require('express')
const Router = App.Router()
const Banner = require('../models/Banner')
Router.get('/', (req, res)=>{
    (async()=>{
        try {
            let banner = await Banner.findOne({where:{title:'home'}})
            return res.render('pages/404', {
                banner,
                layout: './layouts/Layout'
            })

        } catch (error) {
            console.log(error)
        }
    })()
})


module.exports = Router
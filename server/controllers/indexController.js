const {validationResult, matchedData} = require('express-validator');
const Contact = require('../models/Contact');
const Post = require('../models/Post');
const Teacher = require('../models/Teacher');
const Banner = require('../models/Banner');
class IndexController{
   home(req, res){

        (async()=>{
            try {
                let banner = await Banner.findOne({where:{title:'home'}})
                res.render('./pages/index', {
                    banner,
                    layout: './layouts/layout'
                })
            } catch (error) {
                console.log(error)
            }
        })()
        
    }
   about(req, res){
        (async()=>{
            try {
                let banner = await Banner.findOne({where:{title:'about'}})
                let contents = await Teacher.findAll()
                res.render('./pages/about', {
                    contents,
                    banner,
                    layout: './layouts/layout'
                })
            } catch (error) {
                console.log(error)
            }
        })()
    }
   contact(req, res){

        res.render('./pages/contact', {
            layout: './layouts/layout'
        })
    }
   gallery(req, res){
        (async()=>{
            try {
                let banner = await Banner.findOne({where:{title:'gallery'}})
               let contents = await Post.findAll()
               console.log(banner)

                res.render('./pages/gallery', {
                    contents,
                    banner,
                    layout: './layouts/layout'
                })
                
            } catch (error) {
                console.log(error)
            }
        })()
    }
    contactPost(req, res){
        const errors = validationResult(req).errors
        // return console.log(errors)
        if(errors.length <= 0){
            const result = matchedData(req)
            async function save(){
                try {
                    const saved = await Contact.create({
                        'names': result.names,
                        'subject': result.subject,
                        'email': result.email,
                        'message': result.message,
                    })
                    console.log(saved.toJSON())
                    req.flash('successMsg', 'Sent successfully')
                    req.flash('successMsg', 'We contact you through you email')
                    return res.redirect('/contact')
                } catch (error) {
                    console.log(error)
                }
            }
            
            save()
        }
        // return (console.log(errors))
        errors?.forEach((err)=>{
            req.flash('errorMsg', (err.msg.toString()))
        })
        return console.log(res)
        return res.redirect('/contact')
    }
}

module.exports = IndexController;
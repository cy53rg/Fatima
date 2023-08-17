const {validationResult, matchedData} = require('express-validator');
const Contact = require('../models/Contact');
class IndexController{
    static getIndexInstance(){
        return instance ? instance : new Index();
    }

   home(req, res){

        res.render('./pages/index', {
            layout: './layouts/layout'
        })
    }
   about(req, res){

        res.render('./pages/about', {
            layout: './layouts/layout'
        })
    }
   contact(req, res){

        res.render('./pages/contact', {
            layout: './layouts/layout'
        })
    }
   gallery(req, res){

        res.render('./pages/gallery', {
            layout: './layouts/layout'
        })
    }
    contactPost(req, res){
        const errors = validationResult(req).errors

        if(errors.length == 0){
            const result = matchedData(req)
            return console.log(result)
            async function save(){
                try {
                    const saved = await new Contact.create({
                        'name': result.names,
                        'subject': result.subject,
                        'email': result.email,
                        'message': result.message,
                    })
                    console.log(saved)
                } catch (error) {
                    
                }
            }
            save()
        }
        console.log(errors)
    }
}

module.exports = IndexController;
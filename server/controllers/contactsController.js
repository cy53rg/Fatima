const {validationResult, matchedData} = require('express-validator');
const Contact = require('../models/Contact');

class ContactContoller{
    static getIndexInstance(){
        return instance ? instance : new Index();
    }

    index(req, res){
        async function getAll(){

            try {
                const all = await Contact.findAll()

                res.render('./pages/admin/contacts', {
                    contacts: all,
                    layout: './layouts/Adminlayout'
                })
            } catch (error) {
                console.log(error)
            }

        }
        getAll()
    }

    delete(req, res){
        const query = req.query

        if(query.id != null || query.id != ''){
                async function destroy(){
                    try {
                        const deleted = await Contact.destroy({where: {id:query.id}})
                        console.log(deleted.toJSON())
                        req.flash('successMsg', 'deleted')
                        return res.redirect('/dashboard/contacts')

                    } catch (error) {
                        console.log(error)
                    }
                }
                
                destroy()
        }
        req.flash('errorMsg', 'error')
        return res.redirect('/dashboard/contacts')
    }
}

module.exports = ContactContoller;
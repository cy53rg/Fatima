const {validationResult, matchedData} = require('express-validator');
const User = require('../models/User');

class UserContoller{
   

    index(req, res){
        async function getAll(){

            try {
                const all = await User.findAll()

                res.render('./pages/admin/user', {
                    users: all,
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
                        const deleted = await User.destroy({where: {id:query.id}})
                        console.log(deleted.toJSON())
                        req.flash('successMsg', 'deleted')
                        return res.redirect('/dashboard/users')

                    } catch (error) {
                        console.log(error)
                    }
                }
                
                destroy()
        }
        req.flash('errorMsg', 'error')
        return res.redirect('/dashboard/users')
    }
}

module.exports = UserContoller;
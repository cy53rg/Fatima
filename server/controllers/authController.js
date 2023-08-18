const User = require('../models/User')
const bcrypt = require('bcrypt')
class AuthenticateController {

    login(req, res){
        const user = {
            username: 'Admin',
            password: '@Admin',
            email: 'admin@mail.com',
            fullName: 'Admin Admin',
        }
        async function check(){
            let {count, rows} = await User.findAndCountAll()

            if(count == 0){
                await create()
            }
        }
        check()

        async function create(){
            let password = await bcrypt.hash(user.password, 8)
            user.password = password
            try {
                const newuser = await User.create(user)
                console.log(newuser.toJSON())
            } catch (error) {
                console.log(error)
            }
        }
       
        return res.render('./pages/login', {
            layout : './layouts/layout'
        })
    }

    // authenticate(req, res){

    //     res.redirect('/dashboard')
    // }
}

module.exports = AuthenticateController
const Router = require('express').Router()
const ContactContollers = require('../controllers/contactsController')
const DashboardControllers = require('../controllers/dashboardController')
const UserControllers = require('../controllers/userController')
const galleryControllers = require('../controllers/galleryController')
const TeacherControllers = require('../controllers/teacherController')
const AuthCheck = require('../middleware/authcheck')
const Banner = require('../models/Banner')
const {body} = require('express-validator')


const DashboardController = new DashboardControllers()
const ContactContoller = new ContactContollers()
const UserController = new UserControllers()
const galleryController = new galleryControllers()
const TeacherController = new TeacherControllers()



Router.get('/',AuthCheck, DashboardController.index)
Router.post('/banner',AuthCheck, DashboardController.save)
Router.get('/banner/delete',AuthCheck, DashboardController.delete)
Router.get('/logout',AuthCheck, DashboardController.logout)



Router.get('/contacts',AuthCheck, ContactContoller.index)
Router.get('/contacts/delete',AuthCheck, ContactContoller.delete)


Router.get('/users',AuthCheck, UserController.index)
Router.get('/users/delete',AuthCheck, UserController.delete)

Router.route('/gallery')
.get(AuthCheck, galleryController.index)
.post(AuthCheck,galleryController.save)
Router.get('/gallery/delete',AuthCheck, galleryController.delete)
Router.post('/gallery/updateimage',AuthCheck, galleryController.updateImage)
Router.route('/gallery/edit')
.get(AuthCheck, galleryController.edit)
.post(AuthCheck, galleryController.editPost)

Router.route('/staff')
.get(AuthCheck, TeacherController.index)
.post(AuthCheck,TeacherController.save)
Router.get('/staff/delete',AuthCheck, TeacherController.delete)
Router.post('/staff/updateimage',AuthCheck, TeacherController.updateImage)
Router.route('/staff/edit')
.get(AuthCheck, TeacherController.edit)
.post(AuthCheck, TeacherController.editPost)

Router.get('/*', (req, res)=>{
    (async()=>{
        try {
            let banner = await Banner.findOne({where:{title:'home'}})
            return res.render('pages/admin/404', {
                banner,
                layout: 'layouts/Adminlayout'
            })

        } catch (error) {
            console.log(error)
        }
    })()
})

module.exports= Router
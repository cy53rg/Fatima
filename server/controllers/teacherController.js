const Formidable = require('formidable')
const Teacher = require('../models/Teacher');
const fileUpload = require('../middleware/fileUpload');
const { toInteger } = require('lodash');
class TeacherController{

    index(req, res){
        async function getAll(){

            try {
                const all = await Teacher.findAll()
                res.render('./pages/admin/teachers', {
                    contents: all,
                    layout: './layouts/Adminlayout'
                })
            } catch (error) {
                console.log(error)
            }

        }
        getAll()
    }
    save(req,res, next){
        const data = new Formidable.IncomingForm()
        data.parse(req, async function(err, fields, files){
            if(err){
                req.flash('errorMsg', 'Error')
                return res.redirect('/dashboard/staff') 
            }
            // return console.log(fields)
            if(fields.fullname && fields.role && fields.email){
                const [image]= files.image
                const data = {
                    fullName: fields.fullname[0],
                    email: fields.email[0],
                    description: fields.description[0],
                    role: fields.role[0],
                }
                try {
                    if(image){
                        const uploadedimage = await fileUpload(image.filepath, image.originalFilename, 'staff')
                        console.log(uploadedimage)     
                        if(uploadedimage){
                            data.image = uploadedimage.secure_url
                            console.log(data)
                        }
                    }
                    const save = await Teacher.create(data)
                    if(save){
                        req.flash('successMsg', 'Upload successfully!')
                        return res.redirect('/dashboard/staff')
                    }

                } catch (error) {
                    console.log(error)
                }
            }
            req.flash('errorMsg', 'Fill the form accordingly')
            return res.redirect('/dashboard/staff')
        })
    }

    edit(req, res){
        (async()=>{
            try {
                const content = await Teacher.findByPk(req.query.st_id)
                // return console.log(content)
                if(content){

                    return res.render('./pages/admin/editTeacher', {
                        content,
                        layout: './layouts/Adminlayout'
                    })
                }
                req.flash('errorMsg', 'error')
                return res.redirect('/dashboard/staff')
            
            } catch (error) {
                req.flash('errorMsg', 'error')
                return res.redirect('/dashboard/staff')
            }

        })()

    }

    editPost(req, res){
        (async()=>{
            try {
                if(!req.body.id){
                    
                    req.flash('errorMsg', 'error')
                    return res.redirect('/dashboard/staff')
                }

                const data = {
                    firstName: req.body.firstname,
                    email: req.body.email,
                    role: req.body.role,
                    description: req.body.description,
                }
                const content = await Teacher.update(data, {where:{id: req.body.id}})

                if(content){
                    req.flash('successMsg', 'Updated')
                    return res.redirect('/dashboard/staff')
                }
            } catch (error) {
                req.flash('errorMsg', 'error')
                return res.redirect('/dashboard/staff')
            }

        })()
    }
    updateImage(req, res){
        (async()=>{
            const formdata = new Formidable.IncomingForm()

            formdata.parse(req, async(err, fields, files)=>{
                if(err){
                    req.flash('errorMsg', 'Error')
                    return res.redirect('/dashboard/staff') 
                }
                // return console.log(fields)
                if(fields.id){
                    const [image]= files.image
                    const [id]= fields.id
                    const data = {}
                    try {
                        if(image){
                            const uploadedimage = await fileUpload(image.filepath, image.originalFilename, 'staff')
                            if(uploadedimage){
                                data.image = uploadedimage.secure_url
                                console.log(data)
                            }
                        }
                        const save = await Teacher.update(data, {where: {id: id}})
                        if(save){
                            req.flash('successMsg', 'Upload successfully!')
                            return res.redirect('/dashboard/staff')
                        }
    
                    } catch (error) {
                        console.log(error)
                    }
                }
                req.flash('errorMsg', 'Fill the form accordingly')
                return res.redirect('/dashboard/staff')
            })
        })()
    }
    delete(req, res){
        const query = req.query

        if(query.id != null || query.id != ''){
                (async function(){
                    try {
                        const deleted = await Teacher.destroy({where: {id:query.id}})
                        req.flash('successMsg', 'deleted')
                        return res.redirect('/dashboard/staff')

                    } catch (error) {
                        console.log(error)
                    }
                }
                
                )()
        }
        req.flash('errorMsg', 'error')
        return res.redirect('/dashboard/staff')
    }
}

module.exports = TeacherController;
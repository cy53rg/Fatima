const Formidable = require('formidable')
const Teacher = require('../models/Teacher');
const fileUpload = require('../middleware/fileUpload');
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

    }
    delete(req, res){
        const query = req.query

        if(query.id != null || query.id != ''){
                async function destroy(){
                    try {
                        const deleted = await Teacher.destroy({where: {id:query.id}})
                        req.flash('successMsg', 'deleted')
                        return res.redirect('/dashboard/staff')

                    } catch (error) {
                        console.log(error)
                    }
                }
                
                destroy()
        }
        req.flash('errorMsg', 'error')
        return res.redirect('/dashboard/staff')
    }
}

module.exports = TeacherController;
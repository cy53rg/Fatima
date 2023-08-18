const Banner = require("../models/Banner");
const Formidable = require('formidable')
const fileUpload = require('../middleware/fileUpload')
class Dashboard {

    index(req, res){
        
        (async()=>{
            try {
                const user = req.user
                const contents = await Banner.findAll();
                return res.render('./pages/admin/dashboard', {
                    user, contents,
                    layout: './layouts/Adminlayout',
                })
            } catch (error) {
                console.log(error)
            }
        })()
    }
    save(req,res, next){
        const data = new Formidable.IncomingForm()
        data.parse(req, async function(err, fields, files){
            if(err){
                req.flash('errorMsg', 'Error')
                return res.redirect('/dashboard/staff') 
            }
            // return console.log(fields)
            if(fields.title && files.image){
                const [image]= files.image
                const data = {
                    title: fields.title[0],
                }
                try {
                    if(image){
                        const uploadedimage = await fileUpload(image.filepath, image.originalFilename, 'Banner')
                        console.log(uploadedimage)     
                        if(uploadedimage){
                            data.image = uploadedimage.secure_url
                            console.log(data)
                            let check = await Banner.findOne({where:{'title': data.title}})

                            if(check){
                                let update = await Banner.update(data, {where: {title: data.title}})
                                if(update){
                                    req.flash('successMsg', 'Updated successfully!')
                                    return res.redirect('/dashboard')
                                }
                            }
                            const save = await Banner.create(data)
                            if(save){
                                req.flash('successMsg', 'Upload successfully!')
                                return res.redirect('/dashboard')
                            }
                        }
                    }

                } catch (error) {
                    console.log(error)
                    req.flash('errorMsg', 'Error')
                    return res.redirect('/dashboard')
                }
            }
            req.flash('errorMsg', 'Fill the form accordingly')
            return res.redirect('/dashboard')
        })
    }

    edit(req, res){

    }
    delete(req, res){
        const query = req.query

        if(query.id != null || query.id != ''){
                async function destroy(){
                    try {
                        const deleted = await Banner.destroy({where: {id:query.id}})
                        req.flash('successMsg', 'deleted')
                        return res.redirect('/dashboard')

                    } catch (error) {
                        console.log(error)
                    }
                }
                
                destroy()
        }
        req.flash('errorMsg', 'error')
        return res.redirect('/dashboard')
    }

    logout(req,res, next){

        req.logout(err=>{
            if(err){
                console.log(err);
                return next(err);
            }
            res.redirect('/login');
        });
       
        
    }
}



module.exports = Dashboard
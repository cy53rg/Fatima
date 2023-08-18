const {validationResult} = require('express-validator');
const Formidable = require('formidable')
const Post = require('../models/Post');
const  {UploadStream} = require('cloudinary')
const {v2} = require('cloudinary');
const fileUpload = require('../middleware/fileUpload');
class GalleryController{

    index(req, res){
        async function getAll(){

            try {
                const all = await Post.findAll()

                res.render('./pages/admin/gallery', {
                    posts: all,
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
                return res.redirect('/dashboard/gallery') 
            }

            if(fields.title && fields.description ){
                const [image]= files.image
                const data = {
                    title: fields.title[0],
                    description: fields.description[0],
                }
                try {
                    if(image){
                    //    return console.log(image)
                        const uploadedimage = await fileUpload(image.filepath, image.originalFilename, 'gallery')
                        console.log(uploadedimage)     
                        if(uploadedimage){
                            data.image = uploadedimage.secure_url
                            console.log(data)
                        }
                    }
                    const save = await Post.create(data)
                    console.log(save.toJSON())
                    if(save){
                        req.flash('successMsg', 'Upload successfully!')
                        return res.redirect('/dashboard/gallery')
                    }

                } catch (error) {
                    console.log(error)
                }
            }
            req.flash('errorMsg', 'Fill the form accordingly')
            return res.redirect('/dashboard/gallery')
        })
    }

    edit(req, res){

    }
    delete(req, res){
        const query = req.query

        if(query.id != null || query.id != ''){
                async function destroy(){
                    try {
                        const deleted = await Post.destroy({where: {id:query.id}})
                        req.flash('successMsg', 'deleted')
                        return res.redirect('/dashboard/gallery')

                    } catch (error) {
                        console.log(error)
                    }
                }
                
                destroy()
        }
        req.flash('errorMsg', 'error')
        return res.redirect('/dashboard/gallery')
    }
}

module.exports = GalleryController;
const dotenv = require('dotenv')
const cloudinary = require('cloudinary').v2

module.exports = async function (filepath, filename, folder){
    try {

        const response = await new Promise((resolve, reject)=>{
            cloudinary.uploader.upload(filepath,{
                public_id : filename,
                resource_type : 'image',
                folder : folder
            }, (err, response)=>{
                if (err) reject(new Error(err.message))

                resolve(response)
            })
        })

        return response
    } catch (error) {
        console.log(error)
    }
}
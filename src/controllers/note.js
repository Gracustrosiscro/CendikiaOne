const note = require('../models/note')
require('dotenv').config()
const miscHelper = require('../response/response')
const cloudinary = require('cloudinary')
module.exports = {
    getAllNote: (req, res) => {
        note.getAllNote()
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    updateNote: (req, res) => {
        const id = req.params.idNote
        console.log(id);
        
        const data ={
            idCat:req.body.idCat,
            title:req.body.title,
            desc:req.body.desc,
            date:new Date()            
        }
        note.getNoteById(id,data)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    getAllCategory: (req, res) => {
        note.getAllCat()
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    postCategory: async (req, res) => {
        let path = req.file.path
        let geturl = async (req) => {
            cloudinary.config({
                cloud_name: process.env.NAME,
                api_key: process.env.APIKEY,
                api_secret: process.env.APISECRET
            })

            let data
            await cloudinary.uploader.upload(path, (result) => {
                const fs = require('fs')
                fs.unlinkSync(path)
                data = result.url
            })

            return data
        }

        let newCategory = {
            category: req.body.category,
            image: await geturl(),
        };

        note
            .postCat(newCategory)
            .then((result) => {
                miscHelper.response(res, newCategory, 200);
            })
            .catch((err) => {
                console.log(err)
            });
    },
    postNote: (req, res) => {
        const data ={
            idCat:req.body.idCat,
            title:req.body.title,
            desc:req.body.desc,
            date:new Date()            
        }
        note.postNote(data)
            .then((result) => {
                miscHelper.response(res, data, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
}
var express = require('express')
var router = express.Router()
const noteController = require('../controllers/note')
const multer = require('multer');
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        console.log('masuk doang');
        cb(null, file.originalname);
    }
})
let upload = multer({ storage: storage, limits: { fileSize: 100000000 } })

router
    .get('/', noteController.getAllNote)
    .patch('/:idNote', noteController.updateNote)
    .get('/category', noteController.getAllCategory)
    .post('/category',upload.single('image'), noteController.postCategory)
    .post('/', noteController.postNote)
    

module.exports = router
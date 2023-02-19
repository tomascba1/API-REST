const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const patchStorage = `${__dirname}/../public/storage`
        cb(null, patchStorage)
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop()
        const filename = `usrPic_${Date.now()}.${ext}`
        cb(null, filename)
    }
});

const uploadPic = multer({
    storage,
    fileFilter: (req, file, cb) =>{
        if(
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpeg" ||
        !file){
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error("Warning .png, .jpg and .jpeg format are allowed"))
        }
    }
});
module.exports = uploadPic;
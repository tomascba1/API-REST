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

const uploadPic = multer({storage});
module.exports = uploadPic;
const router = require('express').Router()
const uploadPic = require('../utils/handleStorage')
const userCt = require('../controllers/usersCt')
const validator = require("../middlewares/validators")

router.get('/', userCt.getAllUsers);
router.post('/register', uploadPic.single("profilePic"), validator.validatorCreateUser, userCt.createUser)
router.post('/login', userCt.loginUser)
router.get('/forgot-password', userCt.forgotPass)
router.get('/reset/:token', userCt.resetPass)
router.post('/reset/:token', validator.resetPassword, userCt.saveNewPassword)
router.put('/:id', userCt.updateUser)
router.delete('/:id', userCt.deleteUser);


module.exports = router
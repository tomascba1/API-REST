const router = require('express').Router()
const uploadPic = require('../utils/handleStorage')
const userCt = require('../controllers/usersCt')
const validator = require("../middlewares/validators");
const { isAuth, ipVerification } = require('../middlewares/session');

router.get('/', userCt.getAllUsers); //List all Users
router.post('/', uploadPic.single("profilePic"), validator.validatorCreateUser, userCt.createUser); //Create an user
router.post('/login', userCt.loginUser) // Login
//Change Password handler
router.get('/forgot-password', userCt.forgotPass)
router.get('/reset/:token', userCt.resetPass)
router.post('/reset/:token', validator.resetPassword, userCt.saveNewPassword)
//Modify and delete product
router.put('/:id', isAuth, userCt.updateUser)
router.delete('/:id', isAuth, userCt.deleteUser);
//Making Admin
router.put('/admin/:id', ipVerification, userCt.makeAdmin)


module.exports = router
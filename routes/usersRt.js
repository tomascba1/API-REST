const router = require('express').Router()
const uploadPic = require('../utils/handleStorage')
const userCt = require('../controllers/usersCt')

router.get('/', userCt.getAllUsers);
router.post('/register', uploadPic.single("profilePic"), userCt.createUser)
router.post('/login', userCt.loginUser)
router.put('/:id', userCt.updateUser)
router.delete('/:id', userCt.deleteUser);


module.exports = router
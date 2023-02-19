const router = require('express').Router()
const productCt = require('../controllers/productsCt')
const isAuth = require('../middlewares/session')

router.get("/", productCt.getProducts);
router.post("/", isAuth, productCt.createProduct);
router.put("/:id", isAuth, productCt.updateProduct);
router.delete("/:id", isAuth, productCt.deleteProduct);
router.get("/:query", productCt.findByTitle);

module.exports = router
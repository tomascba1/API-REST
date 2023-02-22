const router = require('express').Router()
const productCt = require('../controllers/productsCt')
const {isAdmin} = require('../middlewares/session')

router.get("/", productCt.getProducts);
router.get("/:query", productCt.findByTitle);
router.post("/", isAdmin, productCt.createProduct);
router.put("/:id", isAdmin, productCt.updateProduct);
router.delete("/:id", isAdmin, productCt.deleteProduct);

module.exports = router
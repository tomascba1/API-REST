const router = require('express').Router()
const productCt = require('../controllers/productsCt')

router.get("/", productCt.getProducts)
router.post("/", productCt.createProduct)
router.put("/:id", productCt.updateProduct)
router.delete("/:id", productCt.deleteProduct)

module.exports = router
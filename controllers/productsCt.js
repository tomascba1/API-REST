const Product = require("../Schemas/productSchema");


//List all products
const getProducts = async (req, res, next) => {
  const data = await Product.find();
  try {
    !data.length ? next() : res.json(data);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

//Find a product by query
const findByTitle = (req, res, next) => {
  const { query } = req.params;
  Product.find({ $text: { $search: query } }, (err, result) => {
    if (err) return next();
    return res.status(200).json({ result });
  });
};


//Create new product in DB (Only ADMIN)
const createProduct = (req, res, next) => {
  const newProduct = new Product({ ...req.body });
  newProduct.save((error) => {
    if (error) {
      error.status = 400;
      next(error);
    } else {
      res.status(200).json(newProduct);
    }
  });
};

//Update prodcut details in DB (Only ADMIN)
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (error) {
    next();
  }
};

//Delete a product in DB (Only ADMIN)
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json({
      message: `El Producto ${product.name} ha sido borrado con exito`,
    });
  } catch (error) {
    next();
  }
};


module.exports = {
  getProducts,
  updateProduct,
  createProduct,
  deleteProduct,
  findByTitle,
};
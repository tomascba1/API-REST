const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String },
  price: { type: Number, required: true },
  image: { type: String},
  quantity: { type: String, required: true },
},{
    timestamps: true
});

productSchema.index({title: 'text'})

const Product = mongoose.model("Product", productSchema)

module.exports = Product

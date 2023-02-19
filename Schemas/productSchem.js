const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: { type: String, text: true, required: true, index: true},
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ title: "text" });

const product = mongoose.model("Product", productSchema);

module.exports = product;

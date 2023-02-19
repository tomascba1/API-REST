/* const mongoose = require("mongoose");

Schema = mongoose.Schema

const OrderSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  });

  const Order = mongoose.model("Order", OrderSchema);

  module.exports = {Order} */
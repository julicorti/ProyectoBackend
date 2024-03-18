import mongoose, { Schema } from "mongoose";

const cartColletion = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          required: true,
          ref: "products",
        },
        quantity: Number,
      },
    ],
    default: [],
  },
  user: {type: Schema.Types.ObjectId, ref: "user", required: true},
});

const CartModel = mongoose.model(cartColletion, cartSchema);

export default CartModel;

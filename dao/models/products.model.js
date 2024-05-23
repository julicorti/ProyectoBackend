import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const productCollection = "products";

const productSchema = mongoose.Schema({
  "title": String,
  "description": String,
  "price": Number,
  "code": { 
    type: String, 
    unique: true 
  },
  "stock": Number,
  "status": Boolean,
  "category": {
      type: String,
      enum: ["M", "F"],
      default: "M"
  },
  "available": Boolean, 
  "thumbnail": String
})
productSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model(productCollection, productSchema);
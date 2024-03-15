import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const ticketCollection = "ticket";

const ticketSchema = mongoose.Schema({
  "code": { type: String, unique: true }

});

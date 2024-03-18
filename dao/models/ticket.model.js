import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const ticketCollection = "ticket";

const ticketSchema = mongoose.Schema({
  "code": { type: String, unique: true }, 
  "dateTime" : {type:Date, default:new Date()},
  "amount":{type: Number},
  "purchaser": {type: String}

});
ticketSchema.plugin(mongoosePaginate);
export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
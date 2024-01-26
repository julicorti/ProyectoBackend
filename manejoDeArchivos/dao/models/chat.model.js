import mongoose from "mongoose";

const chatCollection = "messages";
const chatSchema = mongoose.Schema({
user:{
    type: String,
    required: true
},
data: String





});
export const chatModel = mongoose.model(chatCollection, chatSchema);
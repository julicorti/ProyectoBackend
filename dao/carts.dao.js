import CartModel from "./models/carts.model.js";

export default class Cart {
    
    get = (params) => {
        return CartModel.find(params);
    }

    getBy = (params) => {
        return CartModel.findOne(params);
    }

    save = (doc) => {
        return CartModel.create(doc);
    }

    update = (userId, doc) => {
        return CartModel.findOneAndUpdate({ user: userId }, { $set: doc }, { new: true });
    }

    delete = (userId) => {
        return CartModel.deleteOne({ user: userId });
    }
}
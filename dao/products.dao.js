import { productModel } from "./models/products.model.js";

export default class Products {
    
    get = (params) => {
        return productModel.find(params);
    }

    getBy = (params) => {
        return productModel.findOne(params);
    }

    save = (doc) => {
        return productModel.create(doc);
    }

    update = (code, doc) => {
        return productModel.findOneAndUpdate({ code }, { $set: doc }, { new: true });
    }

    delete = (code) => {
        return productModel.deleteOne({ code });
    }
}

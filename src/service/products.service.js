import { ProductMongoManager } from "../../dao/ManagerDB/productMongo.js";
import ProductDTO from "../../dao/dtos/product.dto.js";

class Products {
    async getProducts(limit, page, query, sort) {
        const products = new ProductMongoManager();
        const resultado = await products.getProducts(limit, page, query, sort);
        return resultado;
    }

    async getProductById(pId) {
        const products = new ProductMongoManager();
        const resultado = await products.getProductById(pId);
        return resultado;
    }

    async addProduct(productData) {
        const products = new ProductMongoManager();
        const newProduct = new ProductDTO(productData);
        const resultado = await products.addProduct(newProduct);
        return resultado;
    }

    async updateProduct(id, updateProd) {
        const products = new ProductMongoManager();
        const updateResult = await products.updateProduct({ _id: id }, updateProd);
        return updateResult;
    }

    async deleteProduct(pId) {
        const products = new ProductMongoManager();
        const productDeleted = await products.deleteProduct({ _id: pId });
        return productDeleted;
    }
}

export default new Products();

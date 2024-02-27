import { CartMongoManager } from "../../dao/ManagerDB/cartManagerMongo.js";
class Carts {

    async getCarts(limit) {
        try {

            const carts = new CartMongoManager();

            const resultado = await carts.getCarts()

            if (resultado.message === "OK") {
                //Si no tiene limite, devuelve todos los productos
                if (!limit)
                    return res.status(200).json(resultado)

                const productsLimit = resultado.rdo.slice(0, limit)
                return res.status(200).json(productsLimit)
            }
            res.status(400).json(resultado)
        }
        catch (err) {
            res.status(400).json({ message: "Error al obtener los carritos" + err.menssage })
        }
    }
    async getCartId(cId) {
        const cartById = await CartMongoManager.getCartById(cId);
        return cartById;
    }
    async addProductCart(cId, pId, newQuantity) {

        const carts = new CartMongoManager();
        console.log({ cId, pId, newQuantity });
        const result = await carts.addProductsInCart(cId, pId, newQuantity)
        return result;

    }
    async deleteCartById(cId) {
        const deleted = await carts.deleteAllProductsInCart(cId);
        return deleted
    }
    async deleteProductInCart(cId, pId ){
        const cartManager = new CartMongoManager();
        const result = await cartManager.deleteProductInCart(cId, pId);
        return result;
    }
    async updateCartById(cId){
        const cartManager = new CartMongoManager();
        const result = await cartManager.updateCart(cId, cart);
        return result;
    }
    async updateProductInCart(cId, pId, quantity){
        const cartManager = new CartMongoManager();
        const result = await cartManager.updateProductInCart(cId, pId, quantity);
        return result
    }
}

export default new Carts();
import { Router } from "express";
import CartModel from "../../dao/models/carts.model.js";
import productsService from "../service/products.service.js";
import { CartMongoManager } from "../../dao/ManagerDB/cartManagerMongo.js";
import Cart from "../service/cart.service.js";
class Carts {
  async getCarts(req, res) {
    try {
      const { limit } = req.query;
      const resultado = await Cart.getCarts();
      if (resultado.message === "OK") {
        //Si no tiene limite, devuelve todos los productos
        if (!limit) return res.status(200).json(resultado);

        const productsLimit = resultado.rdo.slice(0, limit);
        return res.status(200).json(productsLimit);
      }
      res.json(resultado);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error al obtener los carritos" + err.menssage });
    }
  }
  async getId(req, res) {
    const { cId } = req.params;
    const cartById = await Cart.getCartId(cId);
    if (!cartById) {
      res.status(404).send({ message: "cart not found" });
    }
    res.send(cartById);
  }
  async addProductToCart(req, res) {
    try {
      const { cId, pId } = req.params;
      const newQuantity = req.body.quantity ? req.body.quantity : 1;

      const product = Cart.addProductCart(cId, pId, newQuantity);
      console.log(newQuantity);
      if (product) {
        return res.status(200).json({ message: "Product added" });
      }
      res.status(400).json({ message: "could not add product" });
    } catch (err) {
      res.status(400).send({ err });
    }
  }

  async addCart(req, res) {
    const cartAdded = new CartMongoManager({ products: [] });
    if (!cartAdded) {
      return res.status(400).send({ message: "error: cart not added" });
    }
    res.send(cartAdded);
  }

  async deleteCartById(req, res) {
    try {
      const { cId } = req.params;
      const carts = new CartMongoManager(cId);
      const deleted = await carts.deleteCartById();

      if (deleted) return res.status(200).json({ message: "Products deleted" });

      return res.status(404).json({ menssage: "could not delete products" });
    } catch (err) {
      res.status(400).json({ menssage: err });
    }
  }
  async deleteProductInCart(req, res) {
    const { cId, pId } = req.params;
    const result = await Cart.deleteProductInCart();
    try {
      if (result) {
        res.send({ message: "Product deleted" });
      } else {
        res.status(400).json({ message: "could not delete product" });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "could not delete product" });
    }
  }
  async updateCartById(req, res) {
    const { cId } = req.params;
    const cart = req.body;
    try {
      if (result.modifiedCount > 0) {
        res.send({ message: "Cart updated" });
      } else {
        res.status(400).send({ message: "Could not update cart" });
      }
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: "Could not update cart" });
    }
  }

  async updateProductInCart(req, res) {
    const { cId, pId } = req.params;
    const { quantity } = req.body;
    const result = await Cart.updateProductInCart(cId, pId, quantity);
    if (result) {
      res.send({ message: "Product updated" });
    } else {
      res.status(400).send({ message: "could not update product" });
    }
  }
  async finalizar(req, res) {
     const { cId } = req.params;
    const cart = await Cart.getCartId(cId);
    cart.rdo.products.map(async (p) => {
      console.log(p);
      const prod = await productsService.getProductById(p.product._id);

      console.log(prod.rdo.stock - p.quantity);
      if (prod.rdo.stock - p.quantity >= 0) {
        return p;
      }
      else{
        const vaciar = new CartMongoManager();
        const borrar = await vaciar.deleteAllProductsInCart();
        return borrar;
      }
    });
    res.send(cart) ;
    
  }
}





export default new Carts();

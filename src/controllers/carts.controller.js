import { Router } from "express";

import { CartMongoManager } from "../../dao/ManagerDB/cartManagerMongo.js";
import Cart from "../service/cart.service.js";
class Carts{


async getCarts(req, res) { 
  try {
    const { limit } = req.query
    const resultado = await Cart.getCarts(limit);
  
    res.json(resultado)
  } 
  catch (err) {
    res.status(400).json({ message: "Error al obtener los carritos" + err.menssage })
  }
}
 async getId (req, res) {
  const { cId } = req.params;
 const cartById = await Cart.getCartId(cId);
 if (!cartById) {
    res.status(404).send({ message: "cart not found" });
}
res.send(cartById);
}
 async addProductToCart(req, res){
  try{
    const {cId, pId} = req.params;
    const newQuantity =  req.body.quantity;
    const product = await Cart.addPorductCart(cId, pId);
    if (product) {
        return res.status(200).json({ message: 'Product added' });
    }
    res.status(400).json({ message: 'could not add product' });
   }
  catch(err){
    res.status(400).send({err});
  }

}
 
async addCart (req, res) {
    const cartAdded = await Cart.addCart();
    if (!cartAdded) {
      return res.status(400).send({ message: "error: cart not added" });
    }
    res.send(cartAdded);
}

async deleteCartById (req,res){
  try{
    const {cId} = req.params
    const carts = new CartMongoManager(cId);
    const deleted = await Cart.deleteCartById()
 

    if (deleted)
      return res.status(200).json({message: 'Products deleted'});

    return res.status(404).json({menssage: 'could not delete products'});
  }
  catch(err){
    res.status(400).json({menssage: err})
  }
}
async deleteProductInCart (req, res) {
  const { cId, pId } = req.params;
    const result = await Cart.deleteProductInCart();
  try {
  
    if(result){
      res.send({message: 'Product deleted'});
    }
    else{
      res.status(400).json({message: 'could not delete product'});
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({message: 'could not delete product'});
  }
}
async updateCartById(req, res){
  
  const { cId } = req.params;
  const cart = req.body;
  try {
   
    if(result.modifiedCount > 0){
      res.send({message: 'Cart updated'});
    }
    else{
      res.status(400).send({message: 'Could not update cart'});
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({message: 'Could not update cart'});
  }
}

async updateProductInCart(req, res){
  const { cId, pId } = req.params;
  const { quantity } = req.body;
  const result = await Cart.updateProductInCart(cId, pId, quantity)
  if(result){
    res.send({message: 'Product updated'});
  }
  else{
    res.status(400).send({message: 'could not update product'});
  }
}
}
export default new Carts;

import express from "express";
//import { ProductManager } from "../dao/managerFS/ProductManager.js";
import { ProductMongoManager } from "../../dao/ManagerDB/productMongo.js";
import { CartMongoManager } from "../../dao/ManagerDB/cartManagerMongo.js";
import { checkAuth, checkExistingUser } from "../middlewares/auth.js";
const viewRoutes = express.Router();
//const path="./src/json/productos.json"
//const productManager = new ProductManager(path);
const productManager = new ProductMongoManager();
const cartManager = new CartMongoManager();

viewRoutes.get("/", async (req, res) => {
  const resultado = await productManager.getProducts();

  if (resultado.message === "OK")
    res.render("home", { title: "Home", data: resultado.rdo });
});

viewRoutes.get("/realtimeproducts", async (req, res) => {
  const resultado = await productManager.getProducts();
  if (resultado.message === "OK")
    res.render("realtimeproducts", {
      title: "RealTime Products",
      data: resultado.rdo,
    });
});

viewRoutes.get("/products", checkAuth,async (req, res) => {
  const { page } = req.query;
 
  const { user } = req.session;
  const products = await productManager.getProducts(10, page);
  res.render("products", { ...products, ...user});
});
viewRoutes.get("/carts/:cId", async (req, res) => {
  const { cId } = req.params;
  const cart = await cartManager.getCartById(cId);
  console.log(cart.rdo);
  res.render("carts", cart.rdo);
});
viewRoutes.get("/chat", async (req, res) => {
  res.render("chat");
});

viewRoutes.get("/login", checkExistingUser,(req, res) => {

  res.render("login");
});

viewRoutes.get('/register', (req, res) =>{
 
  res.render("register");
})
export default viewRoutes;

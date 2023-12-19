import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import ProductManager from "./ProductManager.js";
import fs from "fs"
const PORT = 8080;
const app = express();
const productManager = new ProductManager("./src/products.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", handlebars.engine());
app.set("views", "src/views");
app.use(express.static("public"));
app.set("view engine", "handlebars");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  console.log(products.products[0]);
  res.render("home", products);
});
app.get("/RealTimeProducts", async (req, res) => {
  res.render("realTimeProducts");
});

const httpServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = new Server(httpServer);

io.on("connect", async (socket) => {
  socket.emit("newConnection", "Cliente Conectado");

  let products = await productManager.getProducts();

  socket.emit("loadProducts", products.products);

  socket.on("createProduct", async data=>{

    //pasar base64 a file
    let dataImg = data.image.data.split(';base64,').pop()
    fs.writeFileSync("./public/img/"+data.image.name,dataImg, {encoding: "base64"})
    data.thumbnail = "img/"+data.image.name
    data.image = undefined
    try {
      let product = await productManager.addProduct(data)
      socket.emit("createProduct",product)
      socket.broadcast.emit("createProduct",product)
    } catch (error) {
      socket.emit("error","Error al crear producto")
    }



  })
  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(id)
    socket.broadcast.emit("deleteProduct",id)
  });
});



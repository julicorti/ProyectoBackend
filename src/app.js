import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import handlebars from 'express-handlebars' 
import chatRouter from "./routes/chat.routes.js"
import { chatModel } from "../dao/models/chat.model.js";
import fs from "fs"
import MongoStore from 'connect-mongo';
import session from "express-session";
import  FileStore  from 'session-file-store';
import { productModel } from "../dao/models/products.model.js";
import { ProductMongoManager } from "../dao/ManagerDB/productMongo.js";
import viewsRouters from "./routes/views.routes.js";
import sessionRouter from "./routes/session.routes.js";

const PORT = 8080;
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))


const hbs = handlebars.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true
  }
});

app.engine('handlebars',hbs.engine) 
app.set('views','src/views')
app.set('view engine', 'handlebars')

const fileStore = FileStore(session);
/* const productManager = new ProductManager("./src/products.json"); */
app.use(session({
  secret: 'c0d3r123',
  store: MongoStore.create({
    mongoUrl:'mongodb+srv://admin:admin@julieta.8xkj6p9.mongodb.net/ecommerce?retryWrites=true&w=majority',
  }),
  resave: true,
  saveUninitialized: true

}));



app.get('/', (req, res) =>{
  res.render('index');
})
const productMongoManager = new ProductMongoManager();




/* Routes */
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/messages", cartsRouter);
app.use('/', viewsRouters)

app.use('/api/session', sessionRouter);
app.use("/chat", chatRouter);
mongoose.connect("mongodb+srv://admin:admin@julieta.8xkj6p9.mongodb.net/ecommerce?retryWrites=true&w=majority");

const httpServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = new Server(httpServer);

io.on("connect", async (socket) => {
  socket.emit("newConnection", "Cliente Conectado");

  let products = await productModel.find();

  socket.emit("loadProducts", products);

  socket.on("createProduct", async data=>{

    //pasar base64 a file
    let dataImg = data.image.data.split(';base64,').pop()
    fs.writeFileSync("./public/img/"+data.image.name,dataImg, {encoding: "base64"})
    data.thumbnail = "img/"+data.image.name
    data.image = undefined
    try {
      console.log(data)
      const product = await productMongoManager.addProduct(data)
      socket.emit("createProduct",product)
      socket.broadcast.emit("createProduct",product)
    } catch (error) {
      console.log(error)
      socket.emit("error","Error al crear producto")
    }



  })
  socket.on("deleteProduct", async (id) => {
    const deleted = await productMongoManager.deleteProduct(id)

    if (deleted.message==="OK")
    {
      const resultado = await productMongoManager.getProducts();
      if (resultado.message==="OK")
      {
        socket.emit("getAllProducts",resultado.rdo )  
      }
    }
    else
      console.log("Error al eliminar un producto: ", deleted.rdo)
  });
});



io.on('connect', async socket =>{
    console.log('Nuevo cliente conectado');
    socket.emit("loadMessages", await chatModel.find() )

    socket.on('message', data =>{
        chatModel.create(data)
        io.emit('message', data);
    });
    socket.on('newUser', user => {
        io.emit('newConnection', 'Un nuevo usuario se conecto');
        socket.broadcast.emit('notification', user);
    })
});
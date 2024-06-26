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
import passport from "passport";
import paymentRoutes from "./routes/payment.routes.js";
import initializePassport from "./config/passport.config.js";
import { errorHandler } from "./middlewares/error.js";
import { addLogger } from "./utils/logger.js";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { swaggerConfiguration } from './config/swagger-configuration.js';
const PORT = 8080;  
const app = express();


app.use(express.json())
app.use(addLogger)
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))


const hbs = handlebars.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true
  }
});
 const specs = swaggerJsDoc(swaggerConfiguration);
console.log(specs)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
 
app.get('/PruebaHTTP', (req, res) =>{
  res.send({message: 'PruebaHTTP!!'});
})
app.get('/loggerTest', (req, res) => {
  req.logger.debug('Esto es un debug');
  req.logger.http('Hola soy un http');
  req.logger.info('Hola soy un log de info');
  req.logger.warning('Esto es un warning');
  req.logger.error('Esto es un error');
  req.logger.fatal('Esto es un error FATAL');
 
  res.send({message: 'Error de prueba!'});
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
//passport config//
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
////////////////////
app.get('/', (req, res) =>{
  res.render('index');
})
const productMongoManager = new ProductMongoManager();

app.get('/perfil', (req, res) => {
  
  const { user } = req.session;

  res.render('perfil', {...user});
 
});
app.get('/payment', (req, res) => {
  
  res.render('payment');
 
});


/* Routes */
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/messages", cartsRouter);
app.use('/', viewsRouters)
app.use('/payment', paymentRoutes);
app.use('/api/session', sessionRouter);

app.use("/chat", chatRouter);
app.use(errorHandler)
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
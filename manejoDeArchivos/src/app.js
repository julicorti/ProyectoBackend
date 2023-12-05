import ProductManager from "../ProductManager.js"; 
 import express from "express"; 
const PORT = 8080;
const app = express();
app.use(express.urlencoded({ extended: true }));
const productManager = new ProductManager("./products.json")



app.get('/products', async(req, res) => {
    const {limit} = req.query;
    const products = await productManager.getProducts();
    if(!limit){
        return res.send(products);
    }
    let newProducts = [];
   for(let i = 0; i < limit; i++){
    newProducts.push(products.products[i]);
    
   }
   return res.send(newProducts);
   
})
app.get('/products/:pid', async(req, res) => {
    const {pid} = req.params;
    const products = await productManager.getProductById(pid);
    res.send(products);
})

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT} 2`);
}); 
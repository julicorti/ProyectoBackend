import faker from "faker";
import { ProductMongoManager } from "../../dao/ManagerDB/productMongo.js";
const productMongoManager = new ProductMongoManager();

export const generateProducts = () => {
  
  
    for(let i=0; i < 100; i++){
        const producto = {
            id: faker.database.mongodbObjectId,
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price()),
            code: faker.datatype.uuid(),
            stock: faker.datatype.number({ min: 0, max: 200 }),
            status: faker.datatype.boolean(),
            category: faker.random.arrayElement(["M", "F"]),
            available: faker.datatype.boolean(),
            thumbnail: faker.image.lorempicsum.imageUrl(),
        };
        productMongoManager.addProduct(producto);
    }
   
}
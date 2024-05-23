import mongoose from "mongoose";
import Cart from "../../dao/carts.dao.js";
import Assert from "assert";
const assert = Assert.strict;

mongoose.connect(
  "mongodb+srv://admin:admin@julieta.8xkj6p9.mongodb.net/ecommerce?retryWrites=true&w=majority"
);

describe("Testing de CartDao", () => {
    before(function () {
        this.cartDao = new Cart();
      });



  beforeEach(async function () {
    this.timeout(5000);
    await mongoose.connection.collections.carts.drop(); // Limpia la colección de carritos antes de cada prueba
  });

  it("El método 'get' debe devolver un arreglo de carritos", async function () {
    const result = await this.cartDao.get(); // Usa 'this.cartDao' en lugar de 'cartDao'
    assert.strictEqual(Array.isArray(result), true);
  });
  
  it("El DAO debe agregar un carrito correctamente a la base de datos", async function () {
    const mockedCart = {
      products: [
        {
          product: "producto_id_1",
          quantity: 2
        },
        {
          product: "producto_id_2",
          quantity: 1
        }
      ],
      user: "usuario_id_1"
    };
    const result = await this.cartDao.save(mockedCart); // Usa 'this.cartDao' en lugar de 'cartDao'
    assert.ok(result._id);
  });
  
  
});
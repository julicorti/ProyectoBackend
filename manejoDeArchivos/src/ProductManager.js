import fs from "fs";

class ProductManager {
  static numID = 0;
  constructor(path) {
    this.path = path;

    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, `{"products":[]}`);
    } else {
      try {
        let json = JSON.parse(fs.readFileSync(this.path));
        json.products.map((p) => {
          if (p.id > this.constructor.numID) {
            this.constructor.numID = p.id;
          }
        });
      } catch (error) {
        fs.writeFileSync(this.path, `{"products":[]}`);
      }
    }
  }

  async addProduct(title, description, price, thumbnail, stock, code) {
   /*  if(!title || !description || !price || !thumbnail || !code || !stock){
      return console.log("Todos los campos son obligatorios!!")
    } */
    let p = new Product(
      ++this.constructor.numID,
      title,
      description,
      price,
      thumbnail,
      stock,
      code
    );

    let json = JSON.parse(fs.readFileSync(this.path));

    json.products.push(p);

    fs.writeFileSync(this.path, JSON.stringify(json));
  }
  async getProductById(id) {
    let found = "Not Found";
    let f = JSON.parse(fs.readFileSync(this.path));

    f.products.map((p) => {
      if (p.id == id) {
        found = p;
      }
    });
    return found;
  }
  async getProducts() {
    return JSON.parse(fs.readFileSync(this.path));
  }

  deleteProduct(id) {
    let f = JSON.parse(fs.readFileSync(this.path));

    f.products = f.products.filter((p) => {
      return p.id != id;
    });

    fs.writeFileSync(this.path, JSON.stringify(f));
  }

  updateProduct(id, newData) {
    let json = JSON.parse(fs.readFileSync(this.path));

    json.products = json.products.map((p) => {
      if (p.id == id) {
        p = { ...p, ...newData };
      }
      return p;
    });

    fs.writeFileSync(this.path, JSON.stringify(json));
  }
}

class Product {
  constructor(id, title, description, price, thumbnail, stock) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.stock = stock;
    this.code = Math.floor(Math.random() * 100);
  }
}


export default ProductManager; 
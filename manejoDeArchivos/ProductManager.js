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

  addProduct(title, description, price, thumbnail, stock, code) {
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
  getProductById(id) {
    let found = "Not Found";
    let f = JSON.parse(fs.readFileSync(this.path));

    f.products.map((p) => {
      if (p.id == id) {
        found = p;
      }
    });
    return found;
  }
  getProducts() {
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

const PM = new ProductManager("./products.json");

// agregar productos
PM.addProduct(
  "Remera",
  "La colección Vans X Stranger Things 4 da vida al mundo de Stranger Things.",
  31,
  "https://mmgrim2.azureedge.net/MediaFiles/Grimoldi/2023/6/12/8476868.jpg",
  20
);
PM.addProduct(
  "Remera",
  "La colección Vans X Stranger Things 4 da vida al mundo de Stranger Things.",
  31,
  "https://mmgrim2.azureedge.net/MediaFiles/Grimoldi/2023/6/12/8476868.jpg",
  20
);
PM.addProduct(
  "Remera",
  "La colección Vans X Stranger Things 4 da vida al mundo de Stranger Things.",
  31,
  "https://mmgrim2.azureedge.net/MediaFiles/Grimoldi/2023/6/12/8476868.jpg",
  20
);

PM.updateProduct(1, { title: "POLO" });
PM.deleteProduct(2);

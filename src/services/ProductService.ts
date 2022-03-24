import * as fs from 'fs';
import Product from '../models/Product';
import data from '../db/product.json';

export default class ProductService {
  private products : Product[] = [];

  constructor() {
    data.forEach(
      (product) => {
        this.products.push(new Product(
          product.id,
          product.name,
          product.description,
          product.price,
        ));
      },
    );
  }

  getProduct(id: string) : Product {
    return this.products.filter(
      (element) => element.id === id,
    )[0];
  }

  getAllProducts() {
    return this.products;
  }

  addProduct(id:string, name:string, description:string, price:number) {
    this.products.push({
      id, name, description, price,
    });
    const newData = JSON.stringify(this.products);
    fs.writeFile('./src/db/product.json', newData, (err) => {
      if (err) throw err;
    });
  }
}

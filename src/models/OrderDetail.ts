import Product from './Product';

export default class OrderDetail {
  private products : Product[] = [];

  private totalPrice : number;

  constructor(
    products : Product[],
  ) {
    this.totalPrice = 0;
    this.products = products;
    for (let i = 0; i < products.length; i += 1) {
      this.totalPrice += products[i].price;
    }
  }
}

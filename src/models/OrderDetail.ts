import Product from './Product';

export default class OrderDetail {
  private products : Product[] = [];

  constructor(
    products : Product[],
  ) {
    this.products = products;
  }
}

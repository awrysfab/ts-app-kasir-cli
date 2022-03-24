import * as fs from 'fs';
import Order from '../models/Order';
import data from '../db/order.json';
import Cashier from '../models/Cashier';
import Payment from '../models/Payment';
import Product from '../models/Product';

export default class OrderService {
  private orders : Order[] = [];

  constructor() {
    data.forEach(
      (order) => {
        const products :Product[] = [];
        order.orderDetail.products.forEach((product) => {
          products.push(product);
        });
        this.orders.push(new Order(new Cashier(
          order.cashier.id,
          order.cashier.name,
          order.cashier.username,
          order.cashier.password,
          order.cashier.phoneNumber,
          order.cashier.address,
        ), new Payment(
          order.payment.amount,
        ), products));
      },
    );
  }

  addOrder(order: Order) {
    this.orders.push(order);
    const newData = JSON.stringify(this.orders);
    fs.writeFile('./src/db/order.json', newData, (err) => {
      if (err) throw err;
    });
  }

  getOrder() {
    return this.orders;
  }
}

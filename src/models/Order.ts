import Cashier from './Cashier';
import OrderDetail from './OrderDetail';
import Payment from './Payment';
import Product from './Product';

export default class Order {
  private date: Date;

  private orderDetail: OrderDetail;

  private cashier: Cashier;

  private payment: Payment;

  constructor(
    cashier: Cashier,
    payment: Payment,
    products: Product[],
  ) {
    this.date = new Date();
    this.cashier = cashier;
    this.payment = payment;
    this.orderDetail = new OrderDetail(products);
  }
}

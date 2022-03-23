import Cashier from './Cashier';
import OrderDetail from './OrderDetail';
import Payment from './Payment';

export default class Order {
  private date: Date;

  private orderDetail: OrderDetail;

  private cashier: Cashier;

  private payment: Payment;

  constructor(
    cashier: Cashier,
    payment: Payment,
    orderDetail: OrderDetail,
    date: Date,
  ) {
    this.cashier = cashier;
    this.payment = payment;
    this.orderDetail = orderDetail;
    this.date = date;
  }
}

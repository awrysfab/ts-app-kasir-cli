import Payment from './Payment';

export default class CashPayment extends Payment {
  moneyChange : number;

  constructor(
    amount : number,
    moneyChange : number,
  ) {
    super(amount);
    this.moneyChange = moneyChange;
  }
}

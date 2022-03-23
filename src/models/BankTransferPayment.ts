import Payment from './Payment';

export default class BankTransferPayment extends Payment {
  accountNumber : string;

  constructor(
    amount : number,
    accountNumber : string,
  ) {
    super(amount);
    this.accountNumber = accountNumber;
  }
}

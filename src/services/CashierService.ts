import Cashier from '../models/Cashier';
import data from '../db/cashier.json';

export default class UserService {
  private cashiers : Cashier[] = [];

  constructor() {
    data.forEach(
      (user) => {
        this.cashiers.push(new Cashier(
          user.id,
          user.name,
          user.username,
          user.password,
          user.phone_numer,
          user.address,
        ));
      },
    );
  }

  login(username: string, password : string) : Cashier {
    return this.cashiers.filter(
      (element) => element.username === username && element.password === password,
    )[0];
  }
}

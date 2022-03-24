export default class Cashier {
  id: number;

  name: string;

  username: string;

  password: string;

  phoneNumber: string;

  address: string;

  constructor(
    id: number,
    name: string,
    username: string,
    password:string,
    phoneNumber:string,
    address:string,
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.address = address;
  }
}

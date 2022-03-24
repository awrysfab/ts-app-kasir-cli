import * as inquirer from 'inquirer';
import CashierSerice from './services/CashierService';
import ProductService from './services/ProductService';
import OrderService from './services/OrderService';
import Product from './models/Product';
import Cashier from './models/Cashier';
import Payment from './models/Payment';
import BankTransferPayment from './models/BankTransferPayment';
import CashPayment from './models/CashPayment';
import Order from './models/Order';

const cashierService = new CashierSerice();
const productService = new ProductService();
const orderService = new OrderService();

let loggedInCashier:Cashier;
let cart: Product[] = [];
let payment : Payment;

function main() {
  login();
}

function login() {
  console.log('Silahkan Login terlebih dahulu.');
  inquirer
    .prompt([
      {
        name: 'username',
        message: 'Username: ',
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password: ',
      },
    ])
    .then((answers) => {
      if (cashierService.login(answers.username, answers.password)) {
        loggedInCashier = cashierService.login(answers.username, answers.password);
        console.log(`Selamat Datang ${loggedInCashier.name}`);
        console.log('\n');
        menu();
      } else {
        console.log('Akun tidak ditemukan, Silahkan coba lagi!');
        console.log('\n');
        login();
      }
    });
}

function menu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'menu',
        message: 'Pilih menu',
        choices: ['transaksi', 'produk', 'keluar'],
      },
    ])
    .then((answers) => {
      if (answers.menu === 'keluar') {
        console.log('Selamat tinggal');
      } else if (answers.menu === 'transaksi') {
        console.log('\n');
        transaction();
      } else if (answers.menu === 'produk') {
        console.log('\n');
        product();
      } else {
        console.log('\n');
        menu();
      }
    });
}

function transaction() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'menu_transaksi',
        message: 'Pilih menu transaksi',
        choices: ['tambah transaksi', 'lihat transaksi', 'kembali'],
      },
    ])
    .then((answers) => {
      if (answers.menu_transaksi === 'kembali') {
        console.log('\n');
        menu();
      } else if (answers.menu_transaksi === 'tambah transaksi') {
        console.log('\n');
        transactionProduct();
      } else if (answers.menu_transaksi === 'lihat transaksi') {
        console.table(orderService.getOrder());
        console.log('\n');
        transaction();
      }
    });
}

function transactionProduct() {
  inquirer
    .prompt([
      {
        name: 'id',
        message: 'Masukkan ID produk:',
      },
    ])
    .then((answers) => {
      if (productService.getProduct(answers.id)) {
        cart.push(productService.getProduct(answers.id));
        console.log('\n');
        transactionProductConfirm();
      } else {
        console.log('Produk dengan id tersebut tidak ada!');
        console.log('\n');
        transactionProduct();
      }
    });
}

function transactionProductConfirm() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'confirm',
        message: 'Pilih menu transaksi',
        choices: ['tambah barang', 'lanjut pembayaran'],
      },
    ])
    .then((answers) => {
      if (answers.confirm === 'tambah barang') {
        console.log('\n');
        transactionProduct();
      } else if (answers.confirm === 'lanjut pembayaran') {
        console.log('\n');
        transactionPayment();
      }
    });
}

function transactionPayment() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'payment',
        message: 'Pilih metode pembayaran',
        choices: ['tunai', 'transfer bank'],
      },
    ])
    .then((answers) => {
      if (answers.payment === 'tunai') {
        console.log('\n');
        transactionPaymentConfirm();
      } else if (answers.payment === 'transfer bank') {
        console.log('\n');
        transactionBankPayment();
      }
    });
}

function transactionBankPayment() {
  inquirer
    .prompt([
      {
        name: 'acc_number',
        message: 'Masukkan nomor rekening:',
      },
    ])
    .then((answers) => {
      console.log('\n');
      transactionPaymentConfirm(answers.acc_number);
    });
}

function transactionPaymentConfirm(accNumber? :string) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'confirm',
        message: 'Pilih menu transaksi',
        choices: ['konfirmasi transaksi', 'kembali'],
      },
    ])
    .then((answers) => {
      if (answers.confirm === 'kembali') {
        console.log('\n');
        transactionPayment();
      } else if (answers.confirm === 'konfirmasi transaksi') {
        let amount = 0;
        cart.forEach((element) => {
          amount += element.price;
        });
        if (typeof accNumber !== 'undefined') {
          payment = new BankTransferPayment(amount, accNumber);
        } else {
          payment = new CashPayment(amount);
        }
        orderService.addOrder(
          new Order(
            loggedInCashier,
            payment,
            cart,
          ),
        );
        cart = [];
        console.log('Transaksi Berhasil!');
        console.log('\n');
        transaction();
      }
    });
}

function product() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'menu_produk',
        message: 'Pilih menu produk',
        choices: ['tambah produk', 'lihat produk', 'kembali'],
      },
    ])
    .then((answers) => {
      if (answers.menu_produk === 'kembali') {
        console.log('\n');
        menu();
      } else if (answers.menu_produk === 'tambah produk') {
        console.log('\n');
        addProduct();
      } else if (answers.menu_produk === 'lihat produk') {
        console.table(productService.getAllProducts());
        console.log('\n');
        product();
      } else {
        console.log('\n');
        product();
      }
    });
}

function addProduct() {
  inquirer
    .prompt([
      {
        name: 'id',
        message: 'Masukkan id:',
      },
      {
        name: 'name',
        message: 'Masukkan nama:',
      },
      {
        name: 'description',
        message: 'Masukkan deskripsi:',
      },
      {
        name: 'price',
        message: 'Masukkan harga:',
      },
    ])
    .then((answers) => {
      if (productService.getProduct(answers.id)) {
        console.log('Produk dengan id tersebut sudah ada!');
        console.log('\n');
        addProduct();
      } else {
        productService.addProduct(
          answers.id,
          answers.name,
          answers.description,
          parseInt(answers.price, 10),
        );
        console.log('Produk berhasil ditambahkan!');
        console.log('\n');
        product();
      }
    });
}

main();

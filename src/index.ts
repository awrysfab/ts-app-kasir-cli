import * as inquirer from 'inquirer';
import CashierSerice from './services/CashierService';
import ProductService from './services/ProductService';

const cashierService = new CashierSerice();
const productService = new ProductService();

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
        console.log(`Selamat Datang ${answers.username}`);
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
      } else if (answers.menu === 'produk') {
        console.log('\n');
        product();
      } else {
        console.log('\n');
        menu();
      }
    });
}

function product() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'menu_produk',
        message: 'Pilih menu',
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
        console.table(productService.getProduct());
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
      productService.addProduct(
        parseInt(answers.id, 10),
        answers.name,
        answers.description,
        parseInt(answers.price, 10),
      );
      console.log('\n');
      product();
    });
}

main();

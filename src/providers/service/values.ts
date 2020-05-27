import { Injectable } from '@angular/core';

@Injectable()
export class Values {

  count: number = 0;
  filter: any = 10;
  isLoggedIn: boolean = false;
  customerName: string = "";
  customerId: number = null;
  listview: boolean = false;
  cart: Array<number> = [];
  filterUpdate: boolean = false;
  lan: any;
  logoutUrl: any;
  cartItem: any;
  cartNonce: any;
  avatar: any;
  currency: any = "EUR";
  data: any;
  dir: any = 'left';
  deviceId: any;
  platform: any;
  wishlistId: any = [];

  constructor() {
  	this.filter = {};
    this.logoutUrl = "";
    this.avatar = "assets/image/logo.png";
  }
  updateCart(crt) {
     this.cartItem = crt.cart_contents;
     this.cart = [];
     this.count = 0;
     for (let item in crt.cart_contents) {
         this.cart[crt.cart_contents[item].product_id] = parseInt(crt.cart_contents[item].quantity);
         this.count += parseInt(crt.cart_contents[item].quantity);
     }
 }
 updateCartTwo(crt) {
     this.cart = [];
     this.count = 0;
     this.cartItem = crt;
     for (let item in crt) {
         this.cart[crt[item].product_id] = parseInt(crt[item].quantity);
         this.count += parseInt(crt[item].quantity);
     }
 }
 }
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from './config'
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Values } from './values';

@Injectable()
export class SearchService {
    data: any;
    search: any;
    status: any;
    filters: any;
    cart: any;
    code: any;
    products: any;
    constructor(private http: Http, private config: Config, private values: Values) {

    }
    getSearch(filter) {
        return new Promise(resolve => {
            this.http.get(this.config.setUrl('GET', '/wc-api/v3/products?', filter), this.config.options).map(res => res.json())
                .subscribe(data => {
                    this.products = data;
                    resolve(this.products);
                });
        });
    }
    addToCart(params) {
        return new Promise(resolve => {
            var searchParams = new URLSearchParams();
            for (let param in params) {
                searchParams.set(param, params[param]);
            }
            this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-add_to_cart', searchParams, this.config.options).map(res => res.json())
                .subscribe(data => {
                    this.status = data.cart;
                    this.values.cartNonce = data.cart_nonce;
                    this.values.updateCartTwo(this.status);
                    resolve(this.status);
                });
        });
    }
    deleteFromCart(id) {
        var params = new URLSearchParams();
        for (let key in this.values.cartItem) {
            if (this.values.cartItem[key].product_id == id) {
                this.values.count -= 1;
                if (this.values.cartItem[key].quantity != undefined && this.values.cartItem[key].quantity == 0) {
                    this.values.cartItem[key].quantity = 0
                }
                else {
                    this.values.cartItem[key].quantity -= 1
                };
                if (this.values.cart[id] != undefined && this.values.cart[id] == 0) {
                    this.values.cart[id] = 0
                }
                else {
                    this.values.cart[id] -= 1
                };
                params.set('cart[' + key + '][qty]', this.values.cartItem[key].quantity);
            }
        }
        params.set('_wpnonce', this.values.cartNonce);
        params.set('update_cart', 'Update Cart');
        return new Promise(resolve => {
            this.http.post(this.config.url + '/cart/', params)
                .subscribe(data => {
                    this.status = data;
                    resolve(this.status);
                });
        });
    }
    updateToCart(id) {
        var params = new URLSearchParams();
        for (let key in this.values.cartItem) {
            if (this.values.cartItem[key].product_id == id) {
                this.values.count += 1;
                if (this.values.cartItem[key].quantity != undefined && this.values.cartItem[key].quantity == 0) {
                    this.values.cartItem[key].quantity = 0
                }
                else {
                    this.values.cartItem[key].quantity += 1
                };
                if (this.values.cart[id] != undefined && this.values.cart[id] == 0) {
                    this.values.cart[id] = 0
                }
                else {
                    this.values.cart[id] += 1
                };
                params.set('cart[' + key + '][qty]', this.values.cartItem[key].quantity);
            }
        }
        params.set('_wpnonce', this.values.cartNonce);
        params.set('update_cart', 'Update Cart');
        return new Promise(resolve => {
            this.http.post(this.config.url + '/cart/', params)
                .subscribe(data => {
                    this.status = data;
                    resolve(this.status);
                });
        });
    }
}
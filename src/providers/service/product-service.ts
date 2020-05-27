import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from './config';
import { Values } from './values';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class ProductService {
    data: any;
    product: any;
    gallery: any;
    status: any;
    wishlist: any;
    reviews: any;
    reviewForm: any;
    cart: any;
    code: any;
    loader: any;
    constructor(private http: Http, private config: Config, private values: Values, private loadingController: LoadingController) {

    }
    getProduct(id) {
        return new Promise(resolve => {
            this.http.get(this.config.setUrl('GET', '/wc-api/v3/products/' + id + '?', false), this.config.options).map(res => res.json())
                .subscribe(data => {
                    this.product = data;
                     resolve(this.product);                    
                });
        });
    }
    getReviews(id) {
        return new Promise(resolve => {
            this.http.get(this.config.setUrl('GET', '/wc-api/v3/products/' + id + '/reviews/' + '?', false), this.config.options).map(res => res.json())
                .subscribe(data => {
                    this.reviews = data;
                    resolve(this.reviews);
                });
        });
    }
    addToCart(params) {
        return new Promise(resolve => {
            var searchParams = new URLSearchParams();
            for (let param in params) {
                searchParams.set(param, params[param]);
                console.log(param);
                console.log(params[param]);
            }
            this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-add_to_cart', searchParams, this.config.options).map(res => res.json())
                .subscribe(data => {
                    this.status = data;
                    resolve(this.status);
                });
        });
    }
    presentLoading(text) {
        this.loader = this.loadingController.create({
            content: text,
        });
        this.loader.present();
    }
    dismissLoading() {
        this.loader.dismiss();
    }

    addToWishlist(id) {
      return new Promise(resolve => {
        var params = new URLSearchParams();
        params.append("product_id", id);
        params.append("customer_id", this.values.customerId.toString());
        this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-add_wishlist', params, this.config.options).map(res => res.json())
          .subscribe(data => {
            this.status = data;
            resolve(this.status);
          });
      });
    }
    deleteItem(id){
      var params = new URLSearchParams();
      params.append("product_id", id);
      params.append("customer_id", this.values.customerId.toString());
        return new Promise(resolve => {
        this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-remove_wishlist', params, this.config.options).map(res => res.json())
          .subscribe(data => {
            
            resolve(data);
          });
      });
    }
}
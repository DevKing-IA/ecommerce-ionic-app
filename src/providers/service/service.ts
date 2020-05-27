import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { Config } from './config';
import { Values } from './values';
import { URLSearchParams } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { HTTP } from '@ionic-native/http';


@Injectable()
export class Service {
    data: any;
    categories: any;
    banners: any;
    orders: any;
    order: any;
    isloggedIn: any;
    status: any;
    address: any;
    products: any;
    product: any;
    cart: any;
    configuration: any;
    loader: any;
    loginStatus: any;
    mainCategories: any;
    country: any;
    user: any;
    login_nonce: any;
    dir: any = 'left';
    filter: any = {};
    has_more_items: boolean = true;
    constructor(private reqhttp: HTTP, private http: Http, private config: Config, private values: Values, public loadingCtrl: LoadingController, private nativeStorage: NativeStorage) {
        this.mainCategories = [];
        this.filter.page = 1;
    }
    load() {
        return new Promise(resolve => {
            this.http.get(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-keys', this.config.options).map(res => res.json())
                .subscribe(data => {
                    this.values.data = data;
                    this.values.currency = data.currency;
                    this.login_nonce = data.login_nonce;
                    this.banners = data.banners;
                    this.banners = data.banners;
                    if (data.user.data != undefined) {
                        this.values.isLoggedIn = data.user.data.status;
                        this.values.customerId = data.user.data.ID;
                        this.values.customerName = data.user.data.user_nicename;
                        this.values.logoutUrl = this.encodeUrl(data.user.data.url);
                    }
                    this.http.get(this.config.setUrl('GET', '/wc-api/v3/products/categories?', false), this.config.options).map(res => res.json())
                        .subscribe(data => {
                            this.categories = data;
                            for (var i = 0; i < this.categories.product_categories.length; i++) {
                                if (this.categories.product_categories[i].parent == '0') {
                                    this.mainCategories.push(this.categories.product_categories[i]);
                                }
                            }
                            this.mainCategories.reverse();
                            this.nativeStorage.getItem('loginData')
                                .then(
                                    data => this.login(data, this.login_nonce),
                                    error => console.error(error)
                                );
                            this.http.get(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-cart', this.config.options).map(res => res.json())
                                .subscribe(data => {
                                    this.cart = data;
                                    this.values.updateCart(this.cart);
                                });
                            resolve(this.categories);
                        });
                });
        });
    }
    getNonce() {
        return new Promise(resolve => {
            this.http.get(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-nonce', this.config.options).map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        });
    }
    login(a, nonce) {
        var params = new URLSearchParams();
        params.append("username", a.username);
        params.append("password", a.password);
        params.append("_wpnonce", nonce);
        params.append("login", 'Login');
        params.append("redirect", this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-userdata');
        return new Promise(resolve => {
            this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-login', params, this.config.options).map(res => res.json())
                .subscribe(data => {
                    if (!data.errors) {
                        this.values.isLoggedIn = data.data.status;
                        this.values.customerName = data.data.display_name;
                        this.values.customerId = data.data.ID;
                        this.values.logoutUrl = this.encodeUrl(data.data.url);
                        params = new URLSearchParams();
                        params.append("customer_id", this.values.customerId.toString());
                        this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-get_wishlist', params, this.config.options).map(res => res.json())
                            .subscribe(data => {
                                for (let item in data) {
                                    this.values.wishlistId[data[item].id] = data[item].id;
                                }
                        });
            params = new URLSearchParams();
            params.append("customer_id", this.values.customerId.toString());
            this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-get_wishlist', params, this.config.options).map(res => res.json())
                .subscribe(data => {
                    
                    console.log(data);
            });
                        this.nativeStorage.setItem('loginData', {
                                username: a.username,
                                password: a.password
                            })
                            .then(
                                data => console.log('Login Details Stored'),
                                error => console.error(error)
                            );
                    }
                    resolve(data);
                }, err => {resolve(JSON.parse(err._body));console.log(err._body)});
        });
    }
    encodeUrl(href) {
        return href.replace(/&amp;/g, '&')
    }
    logout() {
        return new Promise(resolve => {
            this.http.get(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-logout', this.config.options)
                .subscribe(data => {
                    this.values.isLoggedIn = false;
                    this.values.customerName = "";
                    this.nativeStorage.clear();
                    this.http.get(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-cart', this.config.options).map(res => res.json())
                        .subscribe(data => {
                            this.cart = data;
                            this.values.updateCart(this.cart);
                        });
                    resolve(this.cart);
                });
        });
    }
    passwordreset(email, nonce, url) {
        var params = new URLSearchParams();
        params.append("user_login", email);
        params.append("wc_reset_password", "true");
        params.append("_wpnonce", nonce);
        params.append("type", "mobile");
        params.append("_wp_http_referer", '/my-account/lost-password/');
        console.log('------------', params);
        return new Promise(resolve => {
            this.http.post(this.config.url + '/my-account/lost-password/', params)
                .subscribe((response: any) => {
                    resolve(response);
                },
                err => {
                    resolve(err);
                });
        });
    }
    // passwordChange(password1, password2, token, user, nonce) {
    //     var params = new URLSearchParams();
    //     params.append("password_1", password1);
    //     params.append("password_2", password2);
    //     params.append("reset_key", token);
    //     params.append("reset_login", user);
    //     params.append("wc_reset_password", "true");
    //     params.append("woocommerce-reset-password-nonce", nonce);
    //     params.append("_wp_http_referer", '/my-account/lost-password/?show-reset-form=true');
    //     return new Promise(resolve => {
    //         this.http.post(this.config.url + '/my-account/lost-password/?show-reset-form=true', params)
    //             .subscribe(status => {
    //                 resolve(status);
    //             });
    //     });
    // }

    passwordChange(password1, password2, token, user, nonce) {
        var params = new URLSearchParams();
        params.append("password", password1);
        params.append("user_login", user);
        return new Promise(resolve => {
            this.http.post(this.config.url + '/reset-password/reset_password.php', params)
                .subscribe(status => {
                    console.log(status);
                    resolve(status);
                });
        });
    }
    passwordResetNonce() {
        return new Promise(resolve => {
            this.http.get(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-passwordreset', this.config.options).map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        });
    }
    getAddress() {
        return new Promise(resolve => {
            this.http.get(this.config.setUrl('GET', '/wc-api/v3/customers/' + this.values.customerId + '?', false), this.config.options).map(res => res.json())
                .subscribe(data => {
                    this.address = data;
                    resolve(this.address);
                });
        });
    }
    saveAddress(address) {
        var params = {
            customer: address
        };
        //this.reqhttp.setHeader('Content-Type', 'application/json; charset=UTF-8');
        this.reqhttp.setDataSerializer('json');
        this.reqhttp.clearCookies();
        return new Promise(resolve => {
            this.reqhttp.put(this.config.setUrl('PUT', '/wc-api/v3/customers/' + this.values.customerId + '?', false), params, {})
                .then(data => {
                    resolve(JSON.parse(data.data));
                });
        });
    }
    pushNotification(notification){
        var params = new URLSearchParams();
        params.append("device_id", notification.device_id);
        params.append("platform", notification.platform);
        params.append("email", notification.email);
        params.append("city", notification.city);
        params.append("state", notification.state);
        params.append("country", notification.country);
        params.append("pincode", notification.pincode);

        return new Promise(resolve => {
            this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-user-subcribe-notify', params, this.config.options).map(res => res.json())
                .subscribe(data => {
                    this.status = data;
                    resolve(this.status);
                });
        });

    }
    pushNotify(deviceId, platform){
        var params = new URLSearchParams();
            params.append("device_id", deviceId);
            params.append("platform", platform);

            return new Promise(resolve => {
                this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-user-subcribe-notify', params, this.config.options).map(res => res.json())
                    .subscribe(data => {
                        this.status = data;
                        resolve(this.status);
                    });
            });

    }
    getOrder(id) {
        return new Promise(resolve => {
            this.http.get(this.config.setUrl('GET', '/wc-api/v3/orders/' + id + '?', false), this.config.options).map(res => res.json())
                .subscribe(data => {
                    this.order = data;
                    resolve(this.order);
                });
        });
    }
    getCountry() {
        return new Promise(resolve => {
            this.http.get(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-get_country', this.config.options).map(res => res.json())
                .subscribe(data => {
                    this.country = data;
                    resolve(this.country);
                });
        });
    }
    registerCustomer(customer) {
        var params = {
            customer: customer,
        };
        //this.reqhttp.setHeader('Content-Type', 'application/json; charset=UTF-8');
        this.reqhttp.setDataSerializer('json');
        this.reqhttp.clearCookies();
        return new Promise(resolve => {
            this.reqhttp.post(this.config.setUrl('POST', '/wc-api/v3/customers?', false), params, {})
                .then(data => {
                    this.user = JSON.parse(data.data);
                    resolve(this.user);
                }, err => {
                    console.log(JSON.parse(err.error));
                    resolve(JSON.parse(err.error))
                });
        });
    }
    getOrders(filter) {
        return new Promise(resolve => {
            this.http.get(this.config.setUrl('GET', '/wc-api/v3/orders?', filter), this.config.options).map(res => res.json())
                .subscribe(data => {
                    this.orders = data;
                    resolve(this.orders);
                });
        });
    }
    updateOrder(data, id) {
        //this.reqhttp.setHeader('Content-Type', 'application/json; charset=UTF-8');
        this.reqhttp.setDataSerializer('json');
        this.reqhttp.clearCookies();
        return new Promise(resolve => {
            this.reqhttp.put(this.config.setUrl('PUT', '/wc-api/v3/orders/' + id + '?', false), data, {})
                .then(data => {
                    this.status = JSON.parse(data.data);
                    resolve(this.status);
                }, err => {console.log(JSON.parse(err.error));resolve(JSON.parse(err.error))});
        });
    }
    presentLoading(text) {
        this.loader = this.loadingCtrl.create({
            content: text,
        });
        this.loader.present();
    }
    dismissLoading() {
        this.loader.dismiss();
    }
    getPage(id: any) {
       var params = new URLSearchParams();
       params.append("page_id", id);
       return new Promise(resolve => {
           this.http.post(this.config.url + '/wp-admin/admin-ajax.php?action=mstoreapp-page_content', params, this.config.options).map(res => res.json()).subscribe(data => {
               resolve(data);
           });
       });
   }
   getProducts() {
       this.http.get(this.config.setUrl('GET', '/wc-api/v3/products?', false), this.config.options).map(res => res.json()).subscribe(data => {
           this.products = data;
       });
   }
   loadMore() {
       this.filter.page += 1;
       return new Promise(resolve => {
           this.http.get(this.config.setUrl('GET', '/wc-api/v3/products?', this.filter), this.config.options).map(res => res.json()).subscribe(data => {
               this.handleMore(data);
               resolve(true);
           });
       });
   }
   handleMore(results) {
       if (results != undefined) {
           for (var i = 0; i < results.products.length; i++) {
               this.products.products.push(results.products[i]);
           };
       }
       if (results.length == 0) {
           this.has_more_items = false;
       }
   }
}
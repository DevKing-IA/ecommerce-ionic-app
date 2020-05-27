import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SearchService } from '../../providers/service/search-service';
import { Values } from '../../providers/service/values';
import { CartPage } from '../cart/cart';
import { ProductPage } from '../product/product';

@Component({
    templateUrl: 'search.html'
})
export class SearchPage {
    search: any;
    slug: any;
    id: any;
    categories: any;
    searchKey: any;
    count: any;
    offset: any;
    has_more_items: boolean = true;
    options: any;
    status: any;
    products: any;
    moreProducts: any;
    quantity: any;
    page: number = 1;
    filter: any;
    myInput: any;
    shouldShowCancel: boolean = true;
    subCategories: any;
    constructor(public nav: NavController, public service: SearchService, public values: Values, params: NavParams) {
        this.filter = {};
        this.count = 10;
        this.offset = 0;
        this.values.filter = {};
        this.options = [];
        this.quantity = "1";
        this.myInput = "";
    }
    getCart() {
        this.nav.push(CartPage);
    }
    onInput($event) {
        this.filter['filter[q]'] = $event.srcElement.value;
        this.values.filter = {};
        this.service.getSearch(this.filter)
            .then((results) => this.products = results);
    }
    onCancel($event) {
        console.log('cancelled');
    }
    getProduct(id) {
        this.nav.push(ProductPage, id);
    }
    doInfinite(infiniteScroll) {
        this.page += 1;
        this.service.getSearch(this.filter)
            .then((results) => this.handleMore(results, infiniteScroll));
    }
    handleMore(results, infiniteScroll) {
        if (results.products != undefined) {
            for (var i = 0; i < results.products.length; i++) {
                this.products.products.push(results.products[i]);
            };
        }
        if (results.products.length == 0) {
            this.has_more_items = false;
        }
        infiniteScroll.complete();
    }
    deleteFromCart(id) {
        this.service.deleteFromCart(id)
            .then((results) => this.status = results);
    }
    addToCart(id) {
        var text = '{';
        var i;
        for (i = 0; i < this.options.length; i++) {
            var res = this.options[i].split(":");
            text += '"' + res[0] + '":"' + res[1] + '",';
        }
        text += '"product_id":"' + id + '",';
        text += '"quantity":"' + this.quantity + '"}';
        var obj = JSON.parse(text);
        this.service.addToCart(obj)
            .then((results) => this.updateCart(results));
    }
    updateCart(a) {
    }
    setListView() {
        this.values.listview = true;
    }
    setGridView() {
        this.values.listview = false;
    }
    updateToCart(id){
        this.service.updateToCart(id)
            .then((results) => this.status = results);
    }
}
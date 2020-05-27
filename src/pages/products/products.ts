import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { CategoryService } from '../../providers/service/category-service';
import { Values } from '../../providers/service/values';
import { Functions } from '../../providers/service/functions';
import { CartPage } from '../cart/cart';
import { ProductPage } from '../product/product';

@Component({
    selector: 'page-products',
    templateUrl: 'products.html'
})
export class ProductsPage {
    products: any;
    moreProducts: any;
    count: any;
    offset: any;
    category: any;
    filters: any;
    has_more_items: boolean = true;
    listview: boolean = false;
    status: any;
    options: any;
    pop: any;
    categories: any;
    subCategories: any;
    items: any;
    quantity: any;
    filter: any;
    q: any;
    shouldShowCancel: boolean = true;
    showFilters: boolean = false;
    data: any;
    sort: number = 0;
    categoryName: any;
    constructor(public nav: NavController, public popoverCtrl: PopoverController, public service: CategoryService, params: NavParams, public values: Values, public functions: Functions) {
        this.data = {};
        this.filter = {};
        this.q = "";
        this.filter['filter[category]'] = params.data.slug;
        this.filter.id = params.data.id;
        this.categoryName = params.data.name;
        this.filter.page = 1;
        this.categories = params.data.categories;
        this.count = 10;
        this.offset = 0;
        this.values.filter = {};
        this.options = [];
        this.subCategories = [];
        this.items = [];
        this.quantity = "1";
        this.service.load(this.filter)
            .then((results) => this.products = results);
        for (var i = 0; i < this.categories.product_categories.length; i++) {
            if (this.categories.product_categories[i].parent == this.filter.id) {
                this.subCategories.push(this.categories.product_categories[i]);
            }
        }
    }
    getCategory(id, slug, name) {
        this.items.id = id;
        this.items.slug = slug;
        this.items.name = name;
        this.items.categories = this.categories;
        this.nav.push(ProductsPage, this.items);
    }
    parseText(id, count, offset, obj2) {
        var text = '{';
        text += '"category' + '":"' + id + '"}';
        var obj1 = JSON.parse(text);
        var obj3 = {};
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        return obj3;
    }
    getProducts(id) {
        this.nav.push(ProductsPage, id);
    }
    getProduct(id) {
        this.nav.push(ProductPage, id);
    }
    getCart() {
        this.nav.push(CartPage);
    }
    doInfinite(infiniteScroll) {
        this.filter.page += 1;
        this.service.loadMore(this.filter)
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
    setListView() {
        this.values.listview = true;
    }
    setGridView() {
        this.values.listview = false;
    }
    deleteFromCart(id) {
        this.service.deleteFromCart(id)
            .then((results) => this.status = results);
    }
    updateToCart(id) {
        this.service.updateToCart(id)
            .then((results) => this.status = results);
    }
    addToCart(id, type) {
        if (type == 'variable') {
            this.nav.push(ProductPage, id);
        }
        else {
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
    }
    updateCart(a) {
    }
    onInput($event) {
        this.filter['filter[q]'] = $event.srcElement.value;
        console.log(this.filter['filter[q]']);
        this.service.search(this.filter)
            .then((results) => this.products = results);
    }
    onCancel($event) {
        console.log('cancelled');
    }
    getFilter() {
        this.showFilters = true;
        this.has_more_items = false;
    }
    cancel() {
        this.showFilters = false;
        this.has_more_items = true;
    }
    chnageFilter(sort) {
        this.showFilters = false;
        this.has_more_items = true;
        this.filter.page = 1;
        if (sort == 0) {
            this.filter['filter[order]'] = "ASC";
            this.filter['filter[orderby]'] = "date";
        }
        if (sort == 1) {
            this.filter['filter[order]'] = "ASC";
            this.filter['filter[orderby]'] = "name";
        }
        else if (sort == 2) {
            this.filter['filter[order]'] = "DESC";
            this.filter['filter[orderby]'] = "name";
        }
        else if (sort == 3) {
            this.filter['filter[order]'] = "ASC";
            this.filter['filter[orderby]'] = "meta_value_num";
            this.filter['filter[orderby_meta_key]'] = "_price";
        }
        else if (sort == 4) {
            this.filter['filter[order]'] = "DESC";
            this.filter['filter[orderby]'] = "meta_value_num";
            this.filter['filter[orderby_meta_key]'] = "_price";
        }
        /*this.filter['filter[meta_query][key]'] = "_price";
        this.filter['filter[meta_query][value]'] = '[0,10]';
        this.filter['filter[meta_query][compare]'] = "BETWEEN";*/
        this.service.load(this.filter)
            .then((results) => this.products = results);
    }

    addToWishlist(id){

        if(this.values.isLoggedIn){
        this.values.wishlistId[id] = true;
         this.service.addToWishlist(id)
        .then((results) => this.update(results, id));
    }
        else{
            this.functions.showAlert("Warning", "You must login to add product to wishlist");
        }


  }

    update(results, id){
    if(results.success == "Success"){
        //this.functions.showAlert(a.success, a.message);
       this.values.wishlistId[id] = true;
    }

    else {

      }

  }

    removeFromWishlist(id){
    this.values.wishlistId[id] = false;
    this.service.deleteItem(id)
    .then((results) => this.updateWish(results, id));
 
    }

    updateWish(results, id){

        if(results.status == "success"){

            this.values.wishlistId[id] = false;
        
        }

    }
}
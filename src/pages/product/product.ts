import {Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import {NavController, NavParams, Content, AlertController, Slides} from 'ionic-angular';
import {Service} from '../../providers/service/service';
import {ProductService} from '../../providers/service/product-service';
import {Values} from '../../providers/service/values';
import {Functions} from '../../providers/service/functions';
import {md5} from './md5';
import {CartPage} from '../cart/cart';
import {Correspondences} from '../correspondences/correspondences';
import {Pictogramas} from '../pictogramas/pictogramas';

@Component({
    templateUrl: 'product.html'
})
export class ProductPage {
    @ViewChild(Content) content: Content;
    @ViewChild(Slides) slides: Slides;
    product: any;
    id: any;
    status: any;
    cor: any;
    options: any;
    filter: any;
    category: any;
    opt: any;
    message: any;
    wishlist: any;
    quantity: any;
    reviews: any;
    reviewForm: any;
    nickname: any;
    details: any;
    AddToCart: any;
    disableSubmit: boolean = false;
    wishlistIcon: boolean = false;
    has_more_items: boolean = true;

    constructor(public alert: AlertController, public nav: NavController, public service: ProductService, params: NavParams, public functions: Functions, public values: Values, public related: Service, private cdr:ChangeDetectorRef) {
        this.id = params.data;
        if (params.data.category)
            this.category = params.data.category;
        this.cor = "";
        this.options = [];
        this.filter = {};
        this.quantity = "1";
        this.AddToCart = "AddToCart";
        this.filter.page = 1;
        this.filter['filter[type]'] = 'variable';
        this.service.getProduct(this.id)
            .then((results) => this.handleProductResults(results));
        this.getReviews();
        this.related.getProducts();

    }

    handleProductResults(results) {
        this.product = results;
        //var attributes = {};
        // results.product.attributes.forEach(function (attribute) {
        //     if (!attribute.variation && attribute.options)
        //         attributes[attribute.slug] = attribute.options[0];
        // });
        // this.product.product = attributes;
        // if (!this.product.product.marca)
        //     this.product.product.marca = results.product.title.options[0];
         this.product.product.cores = [];
         this.product.product.tamanhos = [];
        // if (this.category)
        //     this.filter['filter[category]'] = this.category;
        // else if (this.product.product.categories)
        //     this.filter['filter[category]'] = this.product.product.categories.toString();
        // //load related products
        // this.related.getProducts(this.filter).then(function (rel_results) {
        //     return _this.related_products = rel_results;
        // });
        // //
        // // -- load all sizes available --
        // this.product.product.variations = ["filter"](this.product.product.variations, "in_stock");
        // if (!this.product.product.variations) {
        //     return;
        // }
        // if (!(this.product.product.variations ))
        //     this.product.product.variations = [this.product.product.variations];
        this.product.product.variations.forEach(function (variation) {
            variation.attributes.forEach(function (att) {
                if(att['slug'] === 'cor') {
                    if(results.product.cores.indexOf(att.option) === -1) {
                        var pa_cor = att.option;
                        results.product.cores.push(pa_cor);
                    }
                }
            });

            //var pa_tamanho = ["find"](variation.attributes, ["slug", "tamanho"]).option;
            //this.product.product.tamanhos.push(pa_tamanho);
        });
        //console.log(results);
        results.product.attributes.forEach(function (attrib) {
            
            if(attrib['slug'] === 'marca') {
                results.product.marca = attrib.options[0];
            }
            if(attrib['slug'] === 'pictogramasuperior11') {
                results.product.pictogramasuperior11 = attrib.options[0];
            }
            if(attrib['slug'] === 'pictogramasuperior12') {
                results.product.pictogramasuperior12 = attrib.options[0];
            }
            if(attrib['slug'] === 'pictogramaforro21') {
                results.product.pictogramaforro21 = attrib.options[0];
            }
            if(attrib['slug'] === 'pictogramaforro22') {
                results.product.pictogramaforro22 = attrib.options[0];
            }
            if(attrib['slug'] === 'pictogramasola31') {
                results.product.pictogramasola31 = attrib.options[0];
            }
            if(attrib['slug'] === 'pictogramasola32') {
                results.product.pictogramasola32 = attrib.options[0];
            }
        });
        console.log(results);
        //this.product = results;

    }

    getProduct(id) {
        this.nav.push(ProductPage, id);
    }

    addToCart(id) {
        if (this.product.product.type == 'variable' && this.options.length == 0) {
            this.functions.showAlert('Erro', 'Deve selecionar uma das opções...')
        } else {
            this.disableSubmit = true;
            this.AddToCart = "A adicionar produto...";
            var text = '{';
            var i;
            for (i = 0; i < this.options.length; i++) {
                var res = this.options[i].split(":");
                for (var j = 0; j < res.length; j = j + 2) {
                    text += '"' + res[j] + '":"' + res[j + 1] + '",';
                }
            }
            text += '"product_id":"' + id + '",';
            text += '"quantity":"' + this.quantity + '"}';
            var obj = JSON.parse(text);
            this.service.addToCart(obj).then((results) => this.updateCart(results));
            //this.getCart();
            //this.service.addToCart(obj).then((results) => this.updateCart(results));
        }
    }

    setVariation() {
        // for (var i in this.product.product.variations) {
        //     var variation = this.product.product.variations[i];
        //     var pa_cor = ["find"](variation.attributes, ["slug", "cor"]).option;
        //     var pa_tamanho = ["find"](variation.attributes, ["slug", "tamanho"]).option;
        //     if (pa_cor == this.cor && pa_tamanho == this.tamanho) {
        //         this.options[0] = 'variation_id:' + variation.id + ':variation[attribute_pa_cor]:' + this.cor + ':variation[attribute_pa_tamanho]:' + this.tamanho;
        //         break;
        //     }
        // }
    }
    changeTamanho(tamanho, results) {
        this.changeImage(this.cor, this.options[0]);
        results.product.tamanhos = [];
        this.product.product.variations.forEach(function (variation) {
            variation.attributes.forEach(function (att) {
                if(att['slug'] === 'tamanho') {
                    if(results.product.tamanhos.indexOf(att.option) === -1) {
                        var pa_tamanho = att.option;
                        results.product.tamanhos.push(pa_tamanho);
                    }
                }
            });

            //var pa_tamanho = ["find"](variation.attributes, ["slug", "tamanho"]).option;
            //this.product.product.tamanhos.push(pa_tamanho);
        });
        // // -- load all colors available to selected size --
        // console.log(tamanho);
        // this.product.product.variations.forEach(function (variation) {
        //     var pa_cor = ["find"](variation.attributes, ["slug", "cor"]).option;
        //     var pa_tamanho = ["find"](variation.attributes, ["slug", "tamanho"]).option;
        //     if (pa_tamanho == tamanho)
        //         this.product.product.cores.push(pa_cor);
        // });
        // this.product.product.cores = ["sortBy"]["uniq"](this.product.product.cores);
        // // --------------------------------------------------
    };
    changeProduct() {
        console.log('yes');
        this.changeImage(this.cor, this.options[0]);
        var text = '{';
        var i;
        for (i = 0; i < this.options.length; i++) {
            var res = this.options[i].split(":");
            for (var j = 0; j < res.length; j = j + 2) {
                text += '"' + res[j] + '":"' + res[j + 1] + '",';
            }
        }
        text += '"quantity":"' + this.quantity + '"}';
        var obj = JSON.parse(text);
        for (let item in this.product.product.variations) {
            if (this.product.product.variations[item].id == obj.variation_id) {
                this.product.product.in_stock = this.product.product.variations[item].in_stock;
                this.product.product.price = this.product.product.variations[item].price;
            }
        }
    }
    changeImage(cor, size){
        if (cor !== undefined && size !== undefined) {
           
            for (let item in this.product.product.variations) {
                let sku = this.product.product.variations[item].sku;
                var fields = sku.split('-');
                var colors = fields[1];
                var sizecheck = fields[2];
                
                if(colors === cor && sizecheck === size) {
                    console.log(this.product.product.variations[item].image[0].src);
                    //this.product.product.images.shift();
                    this.product.product.images = [];
                    //this.product.product.images.splice(this.slides.getActiveIndex(),1);
                    this.product.product.images.push(this.product.product.variations[item].image[0]);
                    this.slides.update();
                    this.cdr.detectChanges();
                    // this.slides.slideTo(0);
                    // this.slides.startAutoplay();
                }
            }
            
        }
    }
    slideChanged() {
       
        let currentIndex = this.slides.getActiveIndex();
        
        this.cdr.detectChanges();
        this.slides.update();
        this.slides.slideTo(0);
        this.slides.startAutoplay();

    }
    updateCart(a) {
        this.disableSubmit = false;
        this.values.count += parseInt(this.quantity);
        this.AddToCart = "AddToCart";
        this.cartAlert('Adicionado com sucesso!');
    }

    getCart() {
        this.nav.push(CartPage);
    }
    correspondences() {
      this.nav.push(Correspondences);
    }
    pictogramas() {
       this.nav.push(Pictogramas);
    }
    cartAlert(title) {
        let alert = this.alert.create({
            title: title,
            buttons: [
                {
                    text: 'Continuar a comprar',
                    handler: () => {
                        console.log('Continuar');
                    }
                },
                {
                    text: 'Ir para o carrinho',
                    handler: () => {
                        this.getCart()
                    }
                }
            ]
        });
        alert.present();
    }

    buyNow(id) {
        var text = '{';
        var i;
        for (i = 0; i < this.options.length; i++) {
            var res = this.options[i].split(":");
            text += '"' + res[0] + '":"' + res[1] + '",';
        }
        text += '"product":"' + id + '",';
        text += '"qty":"' + this.quantity + '"}';
        var obj = JSON.parse(text);
        this.nav.push(CartPage, obj);
    }

    mySlideOptions = {
        initialSlide: 1,
        loop: true,
        autoplay: 5800,
        pager: true
    }

    getReviews() {
        this.service.getReviews(this.id).then((results) => this.handleReview(results));
    }

    handleReview(a) {
        this.reviews = a;
        for (let item in this.reviews.product_reviews) {
            this.reviews.product_reviews[item].avatar = md5(this.reviews.product_reviews[item].reviewer_email);
            console.log(this.reviews.product_reviews[item].avatar);
        }
    }

    addToWishlist(id) {
        if (this.values.isLoggedIn) {
            this.service.addToWishlist(id).then((results) => this.update(results));
        } else {
            this.functions.showAlert("Warning", "You must login to add product to wishlist");
        }
    }

    update(a) {
        if (a.success == "Success") {
            //this.functions.showAlert(a.success, a.message);
            this.values.wishlistId[this.product.product.id] = true;
        } else {
            this.functions.showAlert("error", "error");
        }
    }

    removeFromWishlist(id) {
        this.values.wishlistId[id] = false;
        this.service.deleteItem(id).then((results) => this.updateWish(results, id));
    }

    updateWish(results, id) {
        if (results.status == "success") {
            this.values.wishlistId[id] = false;
        }
    }

    doInfinite(infiniteScroll) {
        this.related.loadMore().then((results) => this.handleMore(results, infiniteScroll));
    }

    handleMore(results, infiniteScroll) {
        if (!results) {
            this.has_more_items = false;
        }
        infiniteScroll.complete();
    }
}
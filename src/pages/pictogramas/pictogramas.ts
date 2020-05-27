import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Values } from '../../providers/service/values';
import { Functions } from '../../providers/service/functions';
import { CartPage } from '../cart/cart';

@Component({
    templateUrl: 'pictogramas.html'
})
export class Pictogramas {

    constructor(public nav: NavController, public values: Values, public functions: Functions, params: NavParams) {

    }
    getCart() {
            this.nav.push(CartPage);
    }
}
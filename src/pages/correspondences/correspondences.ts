import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Values } from '../../providers/service/values';
import { Functions } from '../../providers/service/functions';
import { CartPage } from '../cart/cart';

@Component({
    templateUrl: 'correspondences.html'
})
export class Correspondences {
    tamanhos: {};
    form = {};
    constructor(public nav: NavController, public values: Values, public functions: Functions, params: NavParams) {
    }
    getCart() {
            this.nav.push(CartPage);
    }
    parseInt = function (val) {
      return parseInt(val);
    };
    onGeneroChange(selectedValue) {
        this.tamanhos = {
            "senhora": { "23,0": 36, "23,6": 37, "24,3": 38, "25,0": 39, "25,6": 40, "26,3": 41 },
            "homem": { "25,0": 39, "25,6": 40, "26,3": 41, "27,0": 42, "27,6": 43, "28,3": 44, "29,0": 45, "29,6": 46 },
            "crianca": { "10,3": 17, "11,0": 18, "11,6": 19, "12,3": 20, "13,0": 21, "13,6": 22, "14,3": 23, "15,0": 24, "15,6": 25, "16,3": 26, "17,0": 27, "17,6": 20, "18,3": 29, "19,0": 30, "19,6": 31, "20,3": 32, "21,0": 33, "21,6": 34, "22,3": 35, "23,0": 36, "23,6": 37, "24,3": 38, "25,0": 39, "25,6": 40 }
        };
        console.log(selectedValue);
        //console.log(this.tamanhos[selectedValue]);
        this.tamanhos = this.tamanhos[selectedValue];
    };
}
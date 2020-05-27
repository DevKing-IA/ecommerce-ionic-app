import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Service } from '../../../providers/service/service';
import { Values } from '../../../providers/service/values';
import { CartPage} from '../../cart/cart'

@Component({
    templateUrl: 'order-details.html',
})
export class OrderDetails {
    orderDetails: any;
    id: any;
    constructor(public nav: NavController, public service: Service, params: NavParams, public values: Values) {
        this.id = params.data;
        this.service.getOrder(this.id)
            .then((results) => this.orderDetails = results);
    }
    getCart() {
        this.nav.push(CartPage);
    }
}
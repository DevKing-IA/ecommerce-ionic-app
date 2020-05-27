import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Service } from '../../../providers/service/service';
import { Values } from '../../../providers/service/values';
import { EditAddressForm } from '../edit-address-form/edit-address-form';
import { CartPage } from '../../cart/cart';

@Component({
    templateUrl: 'address.html',
})
export class Address {
    addresses: any;
    address: any;
    status: any;
    form: any;
    constructor(public nav: NavController, public service: Service, public values: Values) {
        this.service.getAddress()
            .then((results) => this.addresses = results);
    }
    editAddress() {
        this.nav.push(EditAddressForm, this.addresses.customer);
    }
    getCart() {
        this.nav.push(CartPage);
    }
}
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Service} from '../../../providers/service/service';
import {Functions} from '../../../providers/service/functions';
import { Values } from '../../../providers/service/values';
import { CartPage } from '../../cart/cart';

@Component({
    templateUrl: 'password-reset-form.html'
})
export class PasswordResetForm {
    status: any;
    nonce: any;
    url: any;
    resetPasswordData: any;
    urlData: any;
    public disableSubmit: boolean = false;
    Save: any;
    constructor(public nav: NavController, public service: Service, public functions: Functions, params: NavParams, public values: Values) {
        this.Save = "Save";
        this.resetPasswordData = [];
        this.urlData = params.data;
        // this.service.passwordResetNonce()
        //     .then((results) => this.handleNonce(results));
    }
    changePassword(formdata) {
        if (this.validateForm()) {
            this.Save = "Save";
            this.disableSubmit = true;
            console.log('--------------------------', this.urlData);
            this.service.passwordChange(formdata.password_1, formdata.password_2, this.urlData.key, this.urlData.id, this.urlData.nonce)
                .then((results) =>{
                    this.handleResult(results);
                    console.log(results);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
    validateForm() {
        if (this.resetPasswordData.password_1 == undefined || this.resetPasswordData.password_2 == "") {
            return false
        } else if(this.resetPasswordData.password_1 !== this.resetPasswordData.password_2) {
            this.functions.showAlert("error", "senha não corresponde");
        } else {
            return true
        }
    }
    handleNonce(results) {
        this.nonce = results.nonce;
        this.url = results.url;
    }
    handleResult(results) {
        this.Save = "reset";
        this.disableSubmit = false;
        this.functions.showAlert("SUCCESS", "A sua senha foi redefinida com sucesso.");
        this.nav.pop();
    }
    getCart() {
        this.nav.push(CartPage);
    }
}
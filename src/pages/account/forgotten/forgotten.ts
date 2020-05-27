import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Service } from '../../../providers/service/service';
import { Functions } from '../../../providers/service/functions';
import { Values } from '../../../providers/service/values';

@Component({
    templateUrl: 'forgotten.html'
})
export class AccountForgotten {
    href: any;
    loadForgotten: any;
    forgottenData: any;
    errorMessage: any;
    status: any;
    login: any;
    nonce: any;
    url: any;
    reset: any;
    public disableSubmit: boolean = false;
    constructor(public nav: NavController, public service: Service, public functions: Functions, public values: Values) {
        this.reset = "reset";
        this.loadForgotten = null;
        this.forgottenData = [];
        this.service.passwordResetNonce()
            .then((results) => this.handleNonce(results));
    }
    forgotten(email) {
        if (this.validateForm()) {
            this.reset = "resetting...";
            this.disableSubmit = true;
            this.service.passwordreset(email, this.nonce, this.url)
                .then((results) => this.handleResult(results, email))
                .catch((err)=>console.log('catch err',err));
        }
    }
    validateForm() {
        if (this.forgottenData.email == undefined || this.forgottenData.email == "") {
            return false
        }
        else {
            return true
        }
    }
    handleNonce(results) {
        this.nonce = results.nonce;
        this.url = results.url;
    }
    handleResult(results, email) {
        if(results.status === 200)
        {
            this.reset = "reset";
            this.disableSubmit = false;
            this.functions.showAlert("SUCESSO", "Foi enviado um email para o seu email " + email + " com um link para o reset da password");
            this.nav.pop();
        }
        else{
            this.reset = "reset";
            this.disableSubmit = false;
            this.functions.showAlert("ERROR", "Não existe uma conta associada com esse email");
        }
    }
}
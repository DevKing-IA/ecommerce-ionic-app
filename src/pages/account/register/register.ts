import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Service } from '../../../providers/service/service';
import { Functions } from '../../../providers/service/functions';
import { Values } from '../../../providers/service/values';
import { Home } from '../../home/home';


@Component({
    templateUrl: 'register.html'
})
export class AccountRegister {
    registerData: any;
    loadRegister: any;
    countries: any;
    status: any;
    public disableSubmit: boolean = false;
    errors: any;
    loginStatus: any;
    country: any;
    billing_states: any;
    shipping_states: any;
    RegisterAccount: any;
    constructor(public nav: NavController, public service: Service, public functions: Functions, public values: Values, public platform: Platform) {
        this.RegisterAccount = "RegisterAccount";
        this.registerData = {};
        this.countries = {};
        this.registerData.billing_address = {};
        this.registerData.shipping_address = {};
        this.service.getNonce()
        .then((results) => this.handleResults(results));
    }
    handleResults(results) {
        this.countries = results;
    }
    getBillingRegion(countryId) {
        this.billing_states = this.countries.state[countryId];
    }
    getShippingRegion(countryId) {
        this.shipping_states = this.countries.state[countryId];
    }
    checkAlpha(ev) {
        let elementChecker: string;
        let format = /^[A-Za-z]*$/i;
        elementChecker = ev.target.value;
        console.log(ev.target.value);
        if(!format.test(elementChecker)){
            this.functions.showAlert("ERRO", "Digite apenas alfabetos");
            return false
        } else {
            return true
        }
    }
    checkNumbers(ev) {
        let elementChecker: string;
        let format = /^[0-9-]*$/i;
        elementChecker = ev.target.value;
        console.log(ev.target.value);
        if(!format.test(elementChecker)){
            this.functions.showAlert("ERRO", "Digite apenas números");
            return false
        } else {
            return true
        }
    }
    validateForm() {
        if (this.registerData.first_name == undefined || this.registerData.firstname == "") {
            this.functions.showAlert("ERRO", "Por favor introduza o seu Nome");
            return false
        }
        if (this.registerData.last_name == undefined || this.registerData.lastname == "") {
            this.functions.showAlert("ERRO", "Por favor introduzao seu Apelido");
            return false
        }
        if (this.registerData.email == undefined || this.registerData.email == "") {
            this.functions.showAlert("ERRO", "Por favor introduza o seu Email");
            return false
        }
        if (this.registerData.password == undefined || this.registerData.password == "") {
            this.functions.showAlert("ERRO", "Por favor introduza a sua Password");
            return false
        }
        // if (!Number(this.registerData.billing_address.postcode)){
        //     this.functions.showAlert("ERRO", "Por favor introduza a sua Codigo Postal");
        //     return false
        // }
        if (!Number(this.registerData.billing_address.company)){
            this.functions.showAlert("ERRO", "Por favor introduza a sua NIF");
            return false
        }
        this.registerData.username = this.registerData.email;
        this.registerData.billing_address.email = this.registerData.email;
        this.registerData.billing_address.first_name = this.registerData.first_name;
        this.registerData.billing_address.last_name = this.registerData.last_name;
        this.registerData.shipping_address.first_name = this.registerData.first_name;
        this.registerData.shipping_address.last_name = this.registerData.last_name;
        this.registerData.shipping_address.address_1 = this.registerData.billing_address.address_1;
        this.registerData.shipping_address.city = this.registerData.billing_address.city;
        this.registerData.shipping_address.state = this.registerData.billing_address.state;
        this.registerData.billing_address.postcode = (this.registerData.billing_address.postcode1) + '-' + (this.registerData.billing_address.postcode2) ;
        this.registerData.shipping_address.postcode = this.registerData.billing_address.postcode
        this.registerData.shipping_address.country = this.registerData.billing_address.country;
        this.registerData.shipping_address.company = this.registerData.billing_address.company;
        return true;
    }
    registerCustomer() {
        this.errors = "";
        if (this.validateForm()) {
            this.disableSubmit = true;
            this.RegisterAccount = "A registar...";
            console.log(this.registerData);
            this.service.registerCustomer(this.registerData)
            .then((results) => this.handleRegister(results));
        }
    }
    handleRegister(results) {
        console.log(results.errors);
        this.disableSubmit = false;
        this.RegisterAccount = "RegisterAccount";
        if (!results.errors) {
            this.service.login(this.registerData, null)
            .then((results) => this.loginStatus = results);
            this.functions.showAlert("Successo", "A sua conta foi criada com sucesso!");
            this.nav.setRoot(Home);
        }
        else if (results.errors) {
            this.errors = results.errors;
        }
    }
}
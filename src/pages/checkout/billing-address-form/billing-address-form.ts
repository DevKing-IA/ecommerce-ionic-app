import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CheckoutService } from '../../../providers/service/checkout-service';
import { Functions } from '../../../providers/service/functions';
import { Values } from '../../../providers/service/values';
import { OrderSummary } from '../order-summary/order-summary';
import { TermsCondition } from '../terms-condition/terms-condition';
import { CartPage } from '../../cart/cart';

@Component({
    templateUrl: 'billing-address-form.html'
})
export class BillingAddressForm {
    billingAddressForm: any;
    billing: any;
    regions: any;
    status: any;
    errorMessage: any;
    address: any;
    form: any;
    states: any;
    OrderReview: any;
    loginData: any;
    id: any;
    couponStatus: any;
    showCreateAccont: boolean = false;
    buttonSubmit: boolean = false;
    buttonSubmitLogin: boolean = false;
    buttonSubmitCoupon: boolean = false;
    buttonText: any;
    buttonText1: any;
    buttonText2: any;
    mydate: any;
    time: any;
    date: any;
    selectedDate: any;
    shipping: any;
    order: any;
    chosen_shipping: any;
    constructor(
        public iab: InAppBrowser,
        public nav: NavController,
        public service: CheckoutService,
        params: NavParams,
        public functions: Functions,
        public values: Values
    ) {
        this.buttonText = "Encomendar";
        this.buttonText1 = "Aplicar";
        this.buttonText2 = "Entrar";
        this.loginData = [];
        this.form = params.data;
        console.log(this.form.payment_instructions, '---------');
        console.log(this.form.payment_instructions? this.form.payment_instructions.split(':')[0] + ':\n' + this.form.payment_instructions.split(':')[1]: '')
        this.billing = {};
        this.billing.save_in_address_book = true;
        this.getRegion(this.form.billing_country);
        this.getRegion(this.form.shipping_country);
        this.form.shipping = true;
        this.shipping = {};
        this.shipping.save_in_address_book = true;
        this.getRegion(this.form.billing_country);
    }
    getRegion(countryId) {
        this.states = this.form.state[countryId];
        this.service.updateOrderReview(this.form)
            .then((results) => this.handleOrderReviews(results));
    }

    handleOrderReviews(results){
      this.OrderReview = results; 
      this.chosen_shipping = this.OrderReview.chosen_shipping;

    }
    checkAlpha(ev) {
        let elementChecker: string;
        let format = /^[A-Za-z]*$/i;
        elementChecker = ev.target.value;
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
        if(!format.test(elementChecker)){
            this.functions.showAlert("ERRO", "Digite apenas números");
            return false
        } else {
            return true
        }
    }
    checkout() {
        this.buttonSubmit = true;
        this.buttonText = "A encomendar...";
        if (this.form.shipping) {
            this.form.shipping_first_name = this.form.billing_first_name;
            this.form.shipping_last_name = this.form.billing_last_name;
            this.form.shipping_company = this.form.billing_company;
            this.form.shipping_address_1 = this.form.billing_address_1;
            this.form.shipping_address_2 = this.form.billing_address_2;
            this.form.shipping_city = this.form.billing_city;
            this.form.shipping_country = this.form.billing_country;
            this.form.shipping_state = this.form.billing_state;
            this.form.shipping_postcode = this.form.billing_postcode;
        }
        if (this.form.payment_method == 'bacs' || this.form.payment_method == 'cheque' || this.form.payment_method == 'cod') {
            this.service.checkout(this.form)
                .then((results) => this.handleBilling(results));
        }
        else if (this.form.payment_method == 'stripe') {
            this.service.getStripeToken(this.form)
                .then((results) => this.handleStripeToken(results));
        }
        else {
            this.service.checkout(this.form)
                .then((results) => this.handlePayment(results));
        }
    }
    handlePayment(results) {
        if (results.result == 'success') {
            var options = "location=no,hidden=yes,toolbar=yes";
            let browser = this.iab.create(results.redirect, '_blank', options);
            browser.show();
            browser.on('loadstart').subscribe(data => {
                if (data.url.indexOf('order-received') != -1 && data.url.indexOf('return=') == -1) {
                    this.values.cart = [];
                    this.values.count = 0;
                    var str = data.url;
                    var pos1 = str.lastIndexOf("/order-received/");
                    var pos2 = str.lastIndexOf("/?key=wc_order");
                    var pos3 = pos2 - (pos1 + 16);
                    var order_id = str.substr(pos1 + 16, pos3);
                    this.nav.push(OrderSummary, order_id);
                    browser.hide();
                }
                else if (data.url.indexOf('cancel_order=true') != -1 || data.url.indexOf('cancelled=1') != -1 || data.url.indexOf('cancelled') != -1) {
                    browser.close();
                    this.buttonSubmit = false;
                }    
            });
            browser.on('exit').subscribe(data => {
                this.buttonSubmit = false;
            });
        }
        else if (results.result == 'failure') {
            this.functions.showAlert("STATUS", results.messages);
            this.buttonSubmit = false;
        }
    }
    checkoutStripe() {
        this.buttonSubmit = true;
        this.buttonText = "A encomendar...";
        this.service.getStripeToken(this.form)
            .then((results) => this.handleStripeToken(results));
    }
    handleStripeToken(results) {
        if (results.error) {
            this.buttonSubmit = false;
            this.buttonText = "Encomendar";
            this.functions.showAlert("ERRO", results.error.message);
        }
        else {
            this.service.stripePlaceOrder(this.form, results)
                .then((results) => this.handleBilling(results));
        }
    }
    handleBilling(results) {
        if (results.result == "success") {
            var str = results.redirect;
            var pos1 = str.lastIndexOf("order-received/");
            var pos2 = str.lastIndexOf("?key=wc_order");
            var pos3 = pos2 - (pos1 + 15);
            var order_id = str.substr(pos1 + 15, pos3);
            this.values.cart = [];
            this.values.count = 0;
            this.nav.push(OrderSummary, order_id);
        }
        else if (results.result == "failure") {
            this.functions.showAlert("ERRO", results.messages);
        }
        this.buttonSubmit = false;
        this.buttonText = "Encomendar";
    }
    login() {
        if (this.validateForm()) {
            this.buttonSubmitLogin = true;
            this.buttonText2 = "Loading";
            this.service.login(this.form)
                .then((results) => this.handleResults(results));
        }
    }
    validateForm() {
        if (this.form.username == undefined || this.form.username == "") {
            return false
        }
        if (this.form.password == undefined || this.form.password == "") {
            return false
        }
        else {
            return true
        }
    }
    handleResults(a) {
        this.buttonSubmitLogin = false;
        this.buttonText2 = "Login";
        //this.form.shipping = true;
        if (a.user_logged) {
            this.form = a;
            this.states = this.form.state[this.form.billing_country];
            this.values.isLoggedIn = a.user_logged;
            this.values.customerName = a.billing_first_name;
            this.values.customerId = a.user_id;
            this.values.logoutUrl = a.logout_url;
        }
        else {
            this.functions.showAlert("Erro", 'Sem sucesso. Tente novamente');
        }
    }
    submitCoupon() {
        this.buttonSubmitCoupon = true;
        this.buttonText1 = "Loading";
        this.service.submitCoupon(this.form)
            .then((results) => this.handleCoupon(results));
    }
    handleCoupon(results) {
        this.buttonSubmitCoupon = false;
        this.buttonText1 = "Aplicar";
        this.couponStatus = results._body;
        this.functions.showAlert("STATUS", results._body);
        this.service.updateOrderReview(this.form)
            .then((results) => this.OrderReview = results);
    }
    createAccount() {
        this.showCreateAccont = true;
    }
    changePayment() {
        this.form.payment_instructions = this.form.payment[this.form.payment_method].description;
        this.buttonSubmit = false;
        this.buttonText = "Continuar com " + this.form.payment[this.form.payment_method].method_title;
    }
    terms(){
        this.nav.push(TermsCondition, this.form.terms_content);
    }
    updateOrderReview() {
        this.form.shipping_method = this.chosen_shipping;
        this.service.updateOrderReview(this.form)
            .then((results) => this.handleOrderReviews(results));
    }
    getCart() {
        this.nav.push(CartPage);
    }
    getPaymentInstruction(instruction: string) {
        if (!instruction) {
            return ;
        }
        if (instruction.includes('Pagar com Paypal')) {
            console.log(instruction);
            return instruction.split(':')[0] + ':\n' + instruction.split(':')[1];
        } else {
            return instruction;
        }
    }
}
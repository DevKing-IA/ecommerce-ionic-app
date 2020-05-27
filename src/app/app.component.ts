import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Home } from '../pages/home/home';
import { Service } from '../providers/service/service';
import { Values } from '../providers/service/values';
import { Config } from '../providers/service/config';
import { TranslateService } from '@ngx-translate/core';
import { OneSignal } from '@ionic-native/onesignal';
import { ProductsPage } from '../pages/products/products';
import { CartPage } from '../pages/cart/cart';
import { AccountLogin } from '../pages/account/login/login';
import { Address } from '../pages/account/address/address';
import { Orders } from '../pages/account/orders/orders';
import { AccountRegister } from '../pages/account/register/register';
import { PasswordResetForm } from '../pages/account/password-reset-form/password-reset-form';
import { WishlistPage } from '../pages/account/wishlist/wishlist';
import { ProductPage } from '../pages/product/product';
import { Post } from '../pages/post/post';
import { TermsConditionStatic } from '../pages/terms-condition-static/terms-condition-static';
import { Correspondences } from '../pages/correspondences/correspondences';
import { Pictogramas} from '../pages/pictogramas/pictogramas';
import { AppRate } from '@ionic-native/app-rate';
import { SocialSharing } from '@ionic-native/social-sharing';
import { EmailComposer } from '@ionic-native/email-composer';
import { URLSearchParams } from '@angular/http';
// import { InAppBrowser } from '@ionic-native/in-app-browser';
// import {BranchIo} from "@ionic-native/branch-io";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = Home;
    status: any;
    pages: Array<{title: string, component: any}>
    menu: Array<{title: string, component: any}>
    items: any;
    buttonLanguagesSettings: boolean = false;
    constructor(statusBar: StatusBar,
                splashScreen: SplashScreen,
                public alertCtrl: AlertController,
                public config: Config,
                private oneSignal: OneSignal,
                private emailComposer: EmailComposer,
                private appRate: AppRate,
                public platform: Platform,
                public service: Service,
                public values: Values,
                public translateService: TranslateService,
                private socialSharing: SocialSharing,
    ) {
        platform.ready().then(() => {
            let params = new URLSearchParams(window.location.search);
            let someParam = params.get('key');
            console.log(  'searchParams' + someParam);
            statusBar.styleDefault();
            splashScreen.hide();
            if (this.config.appDir == 'rtl')
            this.platform.setDir('rtl', true);
            this.translateService.setDefaultLang(this.config.language);

            this.service.load().then((results) => {});
            if (platform.is('cordova')) {
                this.oneSignal.startInit(this.config.oneSignalAppId, this.config.googleProjectId);
                this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
                this.oneSignal.handleNotificationReceived().subscribe(result => {
                    console.log(result);
                });
                this.oneSignal.handleNotificationOpened().subscribe(result => {
                    if (result.notification.payload.additionalData.category) {
                        this.items.id = result.notification.payload.additionalData.category;
                        this.nav.push(ProductsPage, this.items);
                    } else if (result.notification.payload.additionalData.product) {
                        this.items.id = result.notification.payload.additionalData.product;
                        this.nav.push(ProductPage, this.items.id);
                    }
                });
                this.oneSignal.endInit();
            }

            BranchInit();
        });


        platform.resume.subscribe(() => {
            BranchInit();
        });
        const BranchInit = () => {
            // only on devices
            if (!platform.is("cordova")) {
                return;
            }
            const Branch = window["Branch"];
            Branch.initSession().then((data) => {
                if (data["+clicked_branch_link"]) {
                    this.nav.push(PasswordResetForm, data);
                }
            })
        };
    }

    // handleBranch() {
    //     if (!this.platform.is('cordova')) { return }
    //     this.branch.initSession().then(data => {
    //         alert('2')
    //         alert(JSON.stringify(data));
    //         if (data['+clicked_branch_link']) {
    //             // read deep link data on click
    //             alert('Deep Link Data: ' + JSON.stringify(data));
    //         }
    //     });
    // }

    openPage(page) {
        this.nav.setRoot(page);
    }
    getCategory(id, slug, name) {
        this.items = [];
        this.items.id = id;
        this.items.slug = slug;
        this.items.name = name;
        this.items.categories = this.service.categories;
        this.nav.setRoot(ProductsPage, this.items);
    }
    getCart() {
        this.nav.setRoot(CartPage);
    }
    logout() {
        this.service.logout();
        this.values.wishlistId = [];
    }
    login() {
        this.nav.setRoot(AccountLogin);
    }
    register() {
        this.nav.setRoot(AccountRegister);
    }
    address() {
        this.nav.setRoot(Address);
    }
    order() {
        this.nav.setRoot(Orders);
    }
    cart() {
        this.nav.setRoot(CartPage);
    }
    wishlist() {
        this.nav.setRoot(WishlistPage);
    }
    shop() {
        this.nav.setRoot(Home);
    }
    termsCondition() {
        this.nav.setRoot(TermsConditionStatic);
    }
    correspondences() {
        this.nav.setRoot(Correspondences);
    }
    pictogramas() {
        this.nav.setRoot(Pictogramas);
    }
    rateApp() {
        this.appRate.preferences.storeAppURL = {
            ios: '<app_id>',
            android: 'https://play.google.com/store/apps/details?id=com.mstoreapp.wootab0002&hl=en',
            windows: 'ms-windows-store://review/?ProductId=<store_id>'
        };
        this.appRate.promptForRating(true);
    }
    shareApp() {
        var options = {
            message: 'Hi Check this app and download it', // not supported on some apps (Facebook, Instagram)
            subject: 'Hi', // fi. for email
            files: ['', ''], // an array of filenames either locally or remotely
            url: 'https://play.google.com/store/apps/details?id=com.mstoreapp.wootab0002&hl=en',
            chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
        }
        this.socialSharing.shareWithOptions(options);
    }
    contact() {
        let email = {
            to: 'support@mstoreapp.com',
            subject: 'Mobile App',
            body: '<br>Hi<br>',
            isHtml: true
        };
        this.emailComposer.open(email);
    }
    post(id) {
        this.nav.setRoot(Post, id);
    }
}
import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { Home } from '../../pages/home/home';
import { Values } from './values';


@Injectable()
export class Functions {
    public rootPage: any = Home;
    loader: any;
    constructor( 
        private alert: AlertController, 
        private loadingController: LoadingController, 
        private values: Values
        ) {}
    showAlert(title, text) {
        let alert = this.alert.create({
            title: title,
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    }

    presentLoading() {
        this.loader = this.loadingController.create({
            content: this.values.lan.WaitTitle
        })
        this.loader.present();
    }
    dismissLoading() {
        this.loader.dismiss();
    }
}
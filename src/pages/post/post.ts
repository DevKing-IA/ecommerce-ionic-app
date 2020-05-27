import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Values } from '../../providers/service/values';
import { Service } from '../../providers/service/service';

@Component({
  templateUrl: 'post.html'
})
export class Post {
  post: any;
  id: any;
  constructor (public service: Service, public values: Values, params: NavParams) {
    this.id = params.data;
    this.service.getPage(this.id)
       .then((results) => this.post = results);  
 }
}

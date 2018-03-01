import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CreateProject2Page} from '../create-project2/create-project2'
/**
 * Generated class for the CreateProject1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-project1',
  templateUrl: 'create-project1.html',
})
export class CreateProject1Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProject1Page');
  }
   openCreateProject2Page(data:any){
    this.navCtrl.push(CreateProject2Page, data);
  }

}

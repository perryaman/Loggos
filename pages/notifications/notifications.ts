import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import {OffersAndDiscountsPage} from '../offers-and-discounts/offers-and-discounts';

/**
 * Generated class for the NotificationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  public offers:FirebaseListObservable<any>;
  public notifications=false;

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,  			  
              public db: AngularFireDatabase) {

  	//Load and display offers
      this.db.object('offers/').$ref.on('child_added',(snap)=>{

      	this.offers = this.db.list('offers/',{
          query:{
            limitToLast:1
          }
        });

        this.notifications = true;

      });

  }

  openOffers(){
  	this.navCtrl.push(OffersAndDiscountsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

}

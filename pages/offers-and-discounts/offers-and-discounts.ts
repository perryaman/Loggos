import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { NewOfferPage } from '../new-offer/new-offer';
import { EditOfferPage } from '../edit-offer/edit-offer';

/**
 * Generated class for the OffersAndDiscountsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-offers-and-discounts',
  templateUrl: 'offers-and-discounts.html',
})		
export class OffersAndDiscountsPage {

  public isStrategist = false;
  public offers : FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public db: AngularFireDatabase,
              public afAuth: AngularFireAuth) {

    //Show the create new offer button only when the strategist is loggedin.
     this.db.object('users/'+this.afAuth.auth.currentUser.uid).$ref.once('value',
      userSnap=>{

        if(userSnap.val().role == 'strategist'){
          this.isStrategist = true;
        }

      });

     //Load and display offers
      this.offers = this.db.list('offers/',{
          query:{
            orderByChild: 'active',
            equalTo: true,
          }
      });

  }

  edit(offer:any){

    this.navCtrl.push(EditOfferPage,{data:offer});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OffersAndDiscountsPage');
  }

  newOffer(){
  	this.navCtrl.push(NewOfferPage);
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import {OffersAndDiscountsPage} from '../offers-and-discounts/offers-and-discounts';

/**
 * Generated class for the NewOfferPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-offer',
  templateUrl: 'new-offer.html',
})
export class NewOfferPage {

  public form:FormGroup;
  public loading:Loading;

  constructor(public navCtrl: NavController, 
  			      public navParams: NavParams,
  			      public toastCtrl: ToastController,
              public formBuilder: FormBuilder,
              public db:AngularFireDatabase,
              public afAuth: AngularFireAuth,
              public loadingCtrl: LoadingController) {

    this.form = this.formBuilder.group({
      title:['',Validators.compose([Validators.minLength(1), Validators.required])],
      subtitle:['',Validators.compose([Validators.minLength(0)])],
      description:['',Validators.compose([Validators.minLength(1), Validators.required])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewOfferPage');
  }

  createOffer(){
  	
    if(this.form.valid){

      //Display the loader
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();

      //save the information to the database
      this.db.list('offers/').push({
        title:this.form.value.title,
        subtitle:this.form.value.subtitle,
        description:this.form.value.description,
        author:this.afAuth.auth.currentUser.uid,
        date:Date(),
        active:true
      }).then((snap)=>{

        const toast = this.toastCtrl.create({
          message: 'Offer created',
          duration: 3000
        });
        toast.present();

        this.navCtrl.push(OffersAndDiscountsPage);

      }); 

    }else{

        const toast = this.toastCtrl.create({
          message: 'Some fields are empty',
           duration: 3000
        });
        toast.present();

    }

  }

  

}

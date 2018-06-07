import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import {OffersAndDiscountsPage} from '../offers-and-discounts/offers-and-discounts';

/**
 * Generated class for the EditOfferPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-offer',
  templateUrl: 'edit-offer.html',
})
export class EditOfferPage {

	public offer : any;
	public form:FormGroup;
  public loading:Loading;

  constructor(public navCtrl: NavController, 
  			      public navParams: NavParams,
  			      public toastCtrl: ToastController,
              public formBuilder: FormBuilder,
              public db:AngularFireDatabase,
              public afAuth: AngularFireAuth,
              public loadingCtrl: LoadingController) {

  	//get the offer data from the offers page
  	this.offer = navParams.get('data');

  	this.form = this.formBuilder.group({
      title:[this.offer.title,Validators.compose([Validators.minLength(1), Validators.required])],
      subtitle:[this.offer.subtitle,Validators.compose([Validators.minLength(0)])],
      description:[this.offer.description,Validators.compose([Validators.minLength(1), Validators.required])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditOfferPage');
  }


  deleteOffer(){

  	//Display the loader
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();

  	this.db.object('offers/'+this.offer.$key).update({
  		active:false
  	}).then((snap)=>{

  		const toast = this.toastCtrl.create({
          message: 'Offer deleted',
           duration: 3000
        });
        toast.present();

  		this.navCtrl.push(OffersAndDiscountsPage);

  	});

  }


  updateOffer(){
  	
    if(this.form.valid){

      //Display the loader
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();

      //save the information to the database
      this.db.object('offers/'+this.offer.$key).update({
        title:this.form.value.title,
        subtitle:this.form.value.subtitle,
        description:this.form.value.description
      }).then((snap)=>{

        const toast = this.toastCtrl.create({
          message: 'Offer updated',
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

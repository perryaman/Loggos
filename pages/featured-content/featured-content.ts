import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import {ContentImagesPage} from '../content-images/content-images';
import {NewContentPage} from '../new-content/new-content';


/**
 * Generated class for the FeaturedContentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-featured-content',
  templateUrl: 'featured-content.html',
})
export class FeaturedContentPage {

  public isStrategist = false;
  public contents : FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public db: AngularFireDatabase,
              public afAuth: AngularFireAuth,
              public toastCtrl: ToastController,
			  public loadingCtrl: LoadingController) {


  	this.db.object('users/'+this.afAuth.auth.currentUser.uid).$ref.once('value',
      userSnap=>{

        if(userSnap.val().role == 'strategist'){
          this.isStrategist = true;
        }

      });

  	//Projects
  	this.contents = this.db.list('featuredContent/',{
          query:{
            orderByChild: 'active',
            equalTo: true,
          }
      });

  }

  remove(content:any){

  	this.db.object('featuredContent/'+content.$key).update({
  		active:false
  	}).then((snap)=>{

  		const toast = this.toastCtrl.create({
          message: 'Project removed',
           duration: 3000
        });
        toast.present();

  	});

  }

  openImages(images:any){
  	this.navCtrl.push(ContentImagesPage,{data:images});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeaturedContentPage');
  }

  newContent(){
  	this.navCtrl.push(NewContentPage);
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
// import {ProfileProvider} from '../../providers/profile/profile';
import {AuthProvider} from '../../providers/auth/auth';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase/app';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: FirebaseObjectObservable<any>;
  public birthDate: string;
  public userId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public alertCtrl: AlertController,
  // public profileProvider: ProfileProvider, 
  public authProvider: AuthProvider, db:AngularFireDatabase) {
    
     //are we looking at someone else's profileor our own?
     if(navParams.get('userId')){
       this.userId= navParams.get('userId');
       //then get the profile info
        db.object('users/'+this.userId).subscribe(userInfo =>{
        this.userProfile = userInfo;
      });
    } else {
       this.userId = firebase.auth().currentUser.uid;
        //then get the profile info
        db.object('users/'+this.userId).subscribe(userInfo =>{
            this.userProfile = userInfo;
          }); 
    }
     console.log(this.userId);
     console.log(firebase.auth().currentUser.uid);
     
      
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewDidEnter() {
  // this.profileProvider.getUserProfile().then( profileSnap => {
  //   this.userProfile = profileSnap;
  //   this.birthDate = this.userProfile.birthDate;
  // });
}

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HomePage} from '../home/home';


@IonicPage()
@Component({
  selector: 'signup-designer2',
  templateUrl: 'signup-designer2.html',
})
export class SignupDesigner2Page {

   designerProfileForm: FormGroup;
//   user: Object;
   user = firebase.auth().currentUser;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public db: AngularFireDatabase, public afAuth: AngularFireAuth,
  public formBuilder: FormBuilder, public toastCtrl: ToastController) {

    this.designerProfileForm = formBuilder.group({
      mmNumber: ['', Validators.compose([Validators.minLength(6)])],
      bankName: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      accountName: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      accountNumber: ['', Validators.compose([Validators.minLength(6), Validators.required])],      
    }); 
    
  //  this.user = afAuth.auth.currentUser;
     console.log("Some stuff");
     console.log(this.user);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupDesigner2Page');
  }

  getClientInfo(){ //get current info for the client if exists to populate the form 

  }

  saveUserProfile(){
    if (!this.designerProfileForm.valid){
      let toast = this.toastCtrl.create({
        message: 'Some of your input is invalid. Please try again.',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
    } else {
      // save the user's profile into the database so we can list users,
      // use them in Security and Firebase Rules, and show profiles
      return this.db.object('users/'+this.afAuth.auth.currentUser.uid).update({
        'role': 'designer',
        'mmNumber': this.designerProfileForm.value.mmNumber,
        'bankName': this.designerProfileForm.value.bankName,
        'accountName': this.designerProfileForm.value.accountNumber,  
        'accountNumber': this.designerProfileForm.value.accountNumber,  

      //TO DO: Add details to firebase auth user as well
      
    }).then(()=>{
          let toast = this.toastCtrl.create({
            message: 'Details saved successfully',
            duration: 1000,
            position: 'middle'
          });
          toast.present();          
      }).then(()=>{
         this.navCtrl.setRoot(HomePage);        
      });      
    }
  } 
}

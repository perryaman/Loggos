import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SignupDesigner2Page} from '../signup-designer2/signup-designer2';


@IonicPage()
@Component({
  selector: 'signup-designer1',
  templateUrl: 'signup-designer1.html',
})
export class SignupDesigner1Page {

   userProfileForm: FormGroup;
//   user: Object;
   user = firebase.auth().currentUser;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public db: AngularFireDatabase, public afAuth: AngularFireAuth,
  public formBuilder: FormBuilder, public toastCtrl: ToastController) {

    this.userProfileForm = formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      tel: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      email: [''],      
    }); 
    
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientQtnPage');
  }

  getClientInfo(){ //get current info for the client if exists to populate the form 

  }

  saveUserProfile(){
    if (!this.userProfileForm.valid){
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
        'name':this.userProfileForm.value.name,
        'role': 'designer',
        'tel': this.userProfileForm.value.tel,
        'email': this.afAuth.auth.currentUser.email  

      //TO DO: Add details to firebase auth user as well
      
    }).then(()=>{
          let toast = this.toastCtrl.create({
            message: 'Details saved successfully',
            duration: 1000,
            position: 'middle'
          });
          toast.present();          
      }).then(()=>{
         this.navCtrl.setRoot(SignupDesigner2Page);        
      });      
    }
  } 
}

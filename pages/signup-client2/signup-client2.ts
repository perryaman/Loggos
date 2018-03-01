import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CreateProject1Page} from '../create-project1/create-project1';
import {HomePage} from '../home/home';

@IonicPage()
@Component({
  selector: 'signup-client2',
  templateUrl: 'signup-client2.html',
})
export class SignupClient2Page {

  companyProfileForm: FormGroup;
  companies: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public db: AngularFireDatabase, public afAuth: AngularFireAuth,
  public formBuilder: FormBuilder, public toastCtrl: ToastController) {

    this.companyProfileForm = formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      // mmNumber: ['', Validators.compose([Validators.minLength(6)])],
      // bankName: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      // accName: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      // accNumber: ['', Validators.compose([Validators.minLength(6), Validators.required])],      
    });  
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientQtnPage');
  }

  saveCompanyProfile(){
    if (!this.companyProfileForm.valid){
      let toast = this.toastCtrl.create({
        message: 'Some of your input is invalid. Please try again.',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
    } else {

      this.db.list('companies/').push({
        //Create the company
        'name':this.companyProfileForm.value.name,
        // 'mmNumber': this.companyProfileForm.value.mmNumber,
        // 'bankName': this.companyProfileForm.value.bankName,
        // 'accName': this.companyProfileForm.value.accName,       
        // 'accNumber': this.companyProfileForm.value.accNumber,
        'client': this.afAuth.auth.currentUser.uid           
      }).then((item)=>{ 
         //update the user profile to include the company
           this.db.object('users/'+this.afAuth.auth.currentUser.uid).update({
              'company': item.key,
            })      
        }).then(()=>{
          let toast = this.toastCtrl.create({
            message: 'Details saved successfully',
            duration: 3000,
            position: 'middle'
          });

          toast.present();          
      }).then(()=>{
         this.navCtrl.setRoot(HomePage);        
      });      
    }
  } 
}

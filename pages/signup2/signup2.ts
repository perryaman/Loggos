import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,AlertController, ToastController } from 'ionic-angular';
// import { SignupClient1Page } from '../signup-client1/signup-client1';
// import { SignupDesigner1Page} from '../signup-designer1/signup-designer1';
import {SignupPage } from '../signup/signup';
/**
 * Generated class for the Signup2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup2',
  templateUrl: 'signup2.html',
})
export class Signup2Page {

  // designerSignupPage : SignupDesigner1Page;
  // clientSignupPage : SignupClient1Page;
  signupPage : SignupPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup2Page');
  }

  designer(){
        let alert = this.alertCtrl.create({
          title: 'DESIGNER',
          message: 'As a designer you\'ll be required to make amazing designs for clients and be paid via Mobile Money',
          buttons: [
            {
              text: 'Continue',
              handler: () => {
                this.navCtrl.push('SignupPage', {'role':'designer'});
              }
            },{
              text: 'Cancel',
              role: 'cancel'
            }
          ]
        });
      alert.present();

  }
  client(){
     this.navCtrl.push('SignupPage', {'role':'client'});
  }
  strategist(){
        let alert = this.alertCtrl.create({
          title: 'STRATEGIST',
          message: 'As a strategist you\'ll be required to make amazing brand strategy for clients and be paid via Mobile Money',
          buttons: [
            {
              text: 'Continue',
              handler: () => {
                this.navCtrl.push('SignupPage', {'role':'strategist'});
              }
            },{
              text: 'Cancel',
              role: 'cancel'
            }
          ]
        });
      alert.present();

  }

  copywriter(){
        let alert = this.alertCtrl.create({
          title: 'COPYWRITER',
          message: 'As a copywriter you\'ll be required to create great content for clients and be paid via Mobile Money',
          buttons: [
            {
              text: 'Continue',
              handler: () => {
//                this.navCtrl.push('SignupPage', {'role':'copywriter'});
               let toast = this.toastCtrl.create({
                  message: 'Coming soon...',
                  duration: 2000,
                  position: 'middle'
                });
                toast.present(); 
              }
            },{
              text: 'Cancel',
              role: 'cancel'
            }
          ]
        });
      alert.present();

  }

  sales(){
        let alert = this.alertCtrl.create({
          title: 'SALES AGENT',
          message: 'As a sales agent you\'ll be required to make acquire clients for clients and be paid via Mobile Money',
          buttons: [
            {
              text: 'Continue',
              handler: () => {
  //              this.navCtrl.push('SignupPage', {'role':'sales'});
               let toast = this.toastCtrl.create({
                  message: 'Coming soon...',
                  duration: 2000,
                  position: 'middle'
                });
                toast.present(); 
              }
            },{
              text: 'Cancel',
              role: 'cancel'
            }
          ]
        });
      alert.present();

  }



   presentServiceProviderActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose service provider type',
      buttons: [
        {
          text: 'Designer',
          handler: () => {
            this.navCtrl.setRoot('SignupPage', {'role':'designer'});
          }
        },{
          text: 'Strategist',
          handler: () => {
            this.navCtrl.setRoot('SignupPage', {'role':'strategist'});
          }
        },{
          text: 'Sales',
          handler: () => {
            let toast = this.toastCtrl.create({
              message: 'Coming soon...',
              duration: 2000,
              position: 'middle'
            });
            toast.present();        
          }
        },{
          text: 'Copywriter',
          handler: () => {
            let toast = this.toastCtrl.create({
              message: 'Coming soon...',
              duration: 2000,
              position: 'middle'
            });
            toast.present();        
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}

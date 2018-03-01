import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  LoadingController, 
  Loading, NavParams,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';
import { Signup2Page } from '../signup2/signup2';
import { SignupClient1Page } from '../signup-client1/signup-client1';
import { SignupDesigner1Page} from '../signup-designer1/signup-designer1';
import { SignupStrategist1Page} from '../signup-strategist1/signup-strategist1';
import {LoginPage} from '../login/login';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm:FormGroup;
  public loading:Loading;
  public role: string;

  constructor(public nav: NavController, public authData: AuthProvider, 
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController, public navParams: NavParams) {

      this.role = this.navParams.get('role');
      if(!this.role){
        this.nav.setRoot(Signup2Page);
      }
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  signupUser(){
    if (!this.signupForm.valid){
           let alert = this.alertCtrl.create({
              message: "Please ensure you have correctly filled your Email and Password correctly.",
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();

    } else {
      //Singup the user with email and pass
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password, this.role)
      .then(() => {
        //then redirect to the next stage of account creation
        if(this.role == 'client'){
          this.nav.setRoot(SignupClient1Page);
        } else if (this.role == 'designer'){
          this.nav.setRoot(SignupDesigner1Page);          
        } else if (this.role == 'strategist'){
          this.nav.setRoot(SignupStrategist1Page);          
        }
        
      }, (error) => { //Catch error
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }
  
 signInWithFacebook(){
    this.authData.signInWithFacebook().then(() => {
        //then redirect to the next stage of account creation
        if(this.role == 'client'){
          this.nav.setRoot(SignupClient1Page);
        } else if (this.role == 'designer'){
          this.nav.setRoot(SignupDesigner1Page);          
        } else if (this.role == 'strategist'){
          this.nav.setRoot('SignupStrategist1Page');          
        }
        
      }, (error) => { //Catch error
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
        });
      });
;
  }

login(){
  this.nav.setRoot('LoginPage');  
}
}
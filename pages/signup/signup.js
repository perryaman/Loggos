var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { Signup2Page } from '../signup2/signup2';
import { SignupClient1Page } from '../signup-client1/signup-client1';
import { SignupDesigner1Page } from '../signup-designer1/signup-designer1';
import { SignupStrategist1Page } from '../signup-strategist1/signup-strategist1';
var SignupPage = (function () {
    function SignupPage(nav, authData, formBuilder, loadingCtrl, alertCtrl, navParams) {
        this.nav = nav;
        this.authData = authData;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.role = this.navParams.get('role');
        if (!this.role) {
            this.nav.setRoot(Signup2Page);
        }
        this.signupForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }
    /**
     * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
     *  component while the user waits.
     *
     * If the form is invalid it will just log the form value, feel free to handle that as you like.
     */
    SignupPage.prototype.signupUser = function () {
        var _this = this;
        if (!this.signupForm.valid) {
            var alert_1 = this.alertCtrl.create({
                message: "Please ensure you have correctly filled your Email and Password correctly.",
                buttons: [
                    {
                        text: "Ok",
                        role: 'cancel'
                    }
                ]
            });
            alert_1.present();
        }
        else {
            //Singup the user with email and pass
            this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password, this.role)
                .then(function () {
                //then redirect to the next stage of account creation
                if (_this.role == 'client') {
                    _this.nav.setRoot(SignupClient1Page);
                }
                else if (_this.role == 'designer') {
                    _this.nav.setRoot(SignupDesigner1Page);
                }
                else if (_this.role == 'strategist') {
                    _this.nav.setRoot(SignupStrategist1Page);
                }
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var errorMessage = error.message;
                    var alert = _this.alertCtrl.create({
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
    };
    SignupPage.prototype.signInWithFacebook = function () {
        var _this = this;
        this.authData.signInWithFacebook().then(function () {
            //then redirect to the next stage of account creation
            if (_this.role == 'client') {
                _this.nav.setRoot(SignupClient1Page);
            }
            else if (_this.role == 'designer') {
                _this.nav.setRoot(SignupDesigner1Page);
            }
            else if (_this.role == 'strategist') {
                _this.nav.setRoot('SignupStrategist1Page');
            }
        }, function (error) {
            _this.loading.dismiss().then(function () {
                var errorMessage = error.message;
                var alert = _this.alertCtrl.create({
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
    };
    SignupPage.prototype.login = function () {
        this.nav.setRoot('LoginPage');
    };
    return SignupPage;
}());
SignupPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-signup',
        templateUrl: 'signup.html',
    }),
    __metadata("design:paramtypes", [NavController, AuthProvider,
        FormBuilder, LoadingController,
        AlertController, NavParams])
], SignupPage);
export { SignupPage };
//# sourceMappingURL=signup.js.map
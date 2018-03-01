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
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
var SignupDesigner2Page = (function () {
    function SignupDesigner2Page(navCtrl, navParams, db, afAuth, formBuilder, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.afAuth = afAuth;
        this.formBuilder = formBuilder;
        this.toastCtrl = toastCtrl;
        //   user: Object;
        this.user = firebase.auth().currentUser;
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
    SignupDesigner2Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupDesigner2Page');
    };
    SignupDesigner2Page.prototype.getClientInfo = function () {
    };
    SignupDesigner2Page.prototype.saveUserProfile = function () {
        var _this = this;
        if (!this.designerProfileForm.valid) {
            var toast = this.toastCtrl.create({
                message: 'Some of your input is invalid. Please try again.',
                duration: 3000,
                position: 'middle'
            });
            toast.present();
        }
        else {
            // save the user's profile into the database so we can list users,
            // use them in Security and Firebase Rules, and show profiles
            return this.db.object('users/' + this.afAuth.auth.currentUser.uid).update({
                'role': 'designer',
                'mmNumber': this.designerProfileForm.value.mmNumber,
                'bankName': this.designerProfileForm.value.bankName,
                'accountName': this.designerProfileForm.value.accountNumber,
                'accountNumber': this.designerProfileForm.value.accountNumber,
            }).then(function () {
                var toast = _this.toastCtrl.create({
                    message: 'Details saved successfully',
                    duration: 1000,
                    position: 'middle'
                });
                toast.present();
            }).then(function () {
                _this.navCtrl.setRoot(HomePage);
            });
        }
    };
    return SignupDesigner2Page;
}());
SignupDesigner2Page = __decorate([
    IonicPage(),
    Component({
        selector: 'signup-designer2',
        templateUrl: 'signup-designer2.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        AngularFireDatabase, AngularFireAuth,
        FormBuilder, ToastController])
], SignupDesigner2Page);
export { SignupDesigner2Page };
//# sourceMappingURL=signup-designer2.js.map
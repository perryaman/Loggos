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
import { FormBuilder, Validators } from '@angular/forms';
import { CreateProject1Page } from '../create-project1/create-project1';
var SignupClient2Page = (function () {
    function SignupClient2Page(navCtrl, navParams, db, afAuth, formBuilder, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.afAuth = afAuth;
        this.formBuilder = formBuilder;
        this.toastCtrl = toastCtrl;
        this.companyProfileForm = formBuilder.group({
            name: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            mmNumber: ['', Validators.compose([Validators.minLength(6)])],
            bankName: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            accName: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            accNumber: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        });
    }
    SignupClient2Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ClientQtnPage');
    };
    SignupClient2Page.prototype.saveCompanyProfile = function () {
        var _this = this;
        if (!this.companyProfileForm.valid) {
            var toast = this.toastCtrl.create({
                message: 'Some of your input is invalid. Please try again.',
                duration: 3000,
                position: 'middle'
            });
            toast.present();
        }
        else {
            this.db.list('companies/').push({
                //Create the company
                'name': this.companyProfileForm.value.name,
                'mmNumber': this.companyProfileForm.value.mmNumber,
                'bankName': this.companyProfileForm.value.bankName,
                'accName': this.companyProfileForm.value.accName,
                'accNumber': this.companyProfileForm.value.accNumber,
                'client': this.afAuth.auth.currentUser.uid
            }).then(function (item) {
                //update the user profile to include the company
                _this.db.object('users/' + _this.afAuth.auth.currentUser.uid).update({
                    'company': item.key,
                });
            }).then(function () {
                var toast = _this.toastCtrl.create({
                    message: 'Details saved successfully',
                    duration: 3000,
                    position: 'middle'
                });
                toast.present();
            }).then(function () {
                _this.navCtrl.setRoot(CreateProject1Page);
            });
        }
    };
    return SignupClient2Page;
}());
SignupClient2Page = __decorate([
    IonicPage(),
    Component({
        selector: 'signup-client2',
        templateUrl: 'signup-client2.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        AngularFireDatabase, AngularFireAuth,
        FormBuilder, ToastController])
], SignupClient2Page);
export { SignupClient2Page };
//# sourceMappingURL=signup-client2.js.map
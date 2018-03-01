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
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
// import {ProfileProvider} from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProfilePage = (function () {
    function ProfilePage(navCtrl, navParams, alertCtrl, 
        // public profileProvider: ProfileProvider, 
        authProvider, db) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.authProvider = authProvider;
        //are we looking at someone else's profileor our own?
        if (navParams.get('userId')) {
            this.userId = navParams.get('userId');
            //then get the profile info
            db.object('users/' + this.userId).subscribe(function (userInfo) {
                _this.userProfile = userInfo;
            });
        }
        else {
            this.userId = firebase.auth().currentUser.uid;
            //then get the profile info
            db.object('users/' + this.userId).subscribe(function (userInfo) {
                _this.userProfile = userInfo;
            });
        }
        console.log(this.userId);
        console.log(firebase.auth().currentUser.uid);
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
    };
    ProfilePage.prototype.ionViewDidEnter = function () {
        // this.profileProvider.getUserProfile().then( profileSnap => {
        //   this.userProfile = profileSnap;
        //   this.birthDate = this.userProfile.birthDate;
        // });
    };
    return ProfilePage;
}());
ProfilePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-profile',
        templateUrl: 'profile.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AlertController,
        AuthProvider, AngularFireDatabase])
], ProfilePage);
export { ProfilePage };
//# sourceMappingURL=profile.js.map
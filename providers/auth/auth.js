var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
//mm
var AuthProvider = (function () {
    function AuthProvider(afAuth, db, fb, platform) {
        this.afAuth = afAuth;
        this.db = db;
        this.fb = fb;
        this.platform = platform;
    }
    AuthProvider.prototype.loginUser = function (newEmail, newPassword) {
        return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
    };
    AuthProvider.prototype.resetPassword = function (email) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    };
    //logoutUser(): firebase.Promise<any> {
    // return this.afAuth.auth.signOut();
    //}
    AuthProvider.prototype.logoutUser = function () {
        firebase.database().ref('/userProfile')
            .child(firebase.auth().currentUser.uid).off();
        return firebase.auth().signOut();
    };
    AuthProvider.prototype.signupUser = function (newEmail, newPassword, role) {
        var _this = this;
        return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword).then(function () {
            // save the user's profile into the database so we can list users,
            // use them in Security and Firebase Rules, and show profiles
            _this.db.object('users/' + _this.afAuth.auth.currentUser.uid).set({
                provider: _this.afAuth.auth.currentUser.providerId,
                name: _this.afAuth.auth.currentUser.displayName,
                email: _this.afAuth.auth.currentUser.email,
                active: false,
                role: role
            });
        });
    };
    AuthProvider.prototype.createUserProfile = function () {
        // save the user's profile into the database so we can list users,
        // use them in Security and Firebase Rules, and show profiles
        this.db.object('users/' + this.afAuth.auth.currentUser.uid).set({
            provider: this.afAuth.auth.currentUser.providerId,
            name: this.afAuth.auth.currentUser.displayName,
            email: this.afAuth.auth.currentUser.email,
            active: false
        });
    };
    AuthProvider.prototype.signInWithFacebook = function () {
        if (this.platform.is('cordova')) {
            return this.fb.login(['email', 'public_profile']).then(function (res) {
                var facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                return firebase.auth().signInWithCredential(facebookCredential);
            });
        }
        else {
            return this.afAuth.auth
                .signInWithPopup(new firebase.auth.FacebookAuthProvider())
                .then(function (res) { return console.log(res); });
        }
    };
    return AuthProvider;
}());
AuthProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularFireAuth,
        AngularFireDatabase, Facebook, Platform])
], AuthProvider);
export { AuthProvider };
//# sourceMappingURL=auth.js.map
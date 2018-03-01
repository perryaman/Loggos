import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

//mm
@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth, 
  public db:AngularFireDatabase,  public fb: Facebook, private platform: Platform) {

  }

  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

//logoutUser(): firebase.Promise<any> {
// return this.afAuth.auth.signOut();
//}

  logoutUser(): firebase.Promise<void> {
    firebase.database().ref('/userProfile')
      .child(firebase.auth().currentUser.uid).off();

    return firebase.auth().signOut();
  }
  
  signupUser(newEmail: string, newPassword: string, role: string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword).then(()=> { //create new firebase user
      // save the user's profile into the database so we can list users,
      // use them in Security and Firebase Rules, and show profiles
      this.db.object('users/'+this.afAuth.auth.currentUser.uid).set({
        provider: this.afAuth.auth.currentUser.providerId,
        name: this.afAuth.auth.currentUser.displayName,
        email: this.afAuth.auth.currentUser.email,
        active :false,
        role: role      
      });  
    });
  }
  
  createUserProfile(){
    // save the user's profile into the database so we can list users,
    // use them in Security and Firebase Rules, and show profiles
    this.db.object('users/'+this.afAuth.auth.currentUser.uid).set({
      provider: this.afAuth.auth.currentUser.providerId,
      name: this.afAuth.auth.currentUser.displayName,
      email: this.afAuth.auth.currentUser.email,
      active :false      
    });
  }


  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => console.log(res));
    }
  }

}
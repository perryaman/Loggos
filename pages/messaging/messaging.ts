import {ChatPage } from '../chat/chat';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase/app';
/**
 * Generated class for the ProjectsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-messaging',
  templateUrl: 'messaging.html',
})
export class MessagingPage {
  user =  firebase.auth().currentUser;    
  chats : FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public db:AngularFireDatabase, ) {
    this.chats = this.db.list('chats/',{ 
      query:{
        orderByChild: 'users',
        equalTo: this.user.uid
    }});
    console.log(this.chats);
  }

  openProjectPage(id:any){
    this.navCtrl.push(ChatPage, {'chatId': id });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagingPage');
  }

}

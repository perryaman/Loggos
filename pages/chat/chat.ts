import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';

/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  
  messages: FirebaseListObservable<any>;
  chatId: string;
  chat: FirebaseObjectObservable<any>;
  user: any; 
  chatForm: FormGroup;   

 constructor(public navCtrl: NavController, public navParams: NavParams, 
  public db:AngularFireDatabase,public formBuilder: FormBuilder,
  ){
    
    this.user =  firebase.auth().currentUser;    //Get user deets
    
    this.chatId= navParams.get('chatId')   //Let's get the ID of the chat we're looking for
  
    this.chatForm = formBuilder.group({
      message: ['', Validators.compose([Validators.required])]
    });
    
    
    this.chatId = '1';
    if(this.chatId){
    
      //Let's get the chat properties
      this.chat = db.object("chats/"+this.chatId);
      
      //Let's get the messages
      this.messages = db.list("chatMessages/"+this.chatId);

      this.messages.$ref.on('value', _=>{
        console.log("child added");
        let element = document.getElementById("focus")
        element.scrollIntoView({
          behavior: "smooth" ,
          block:    "end",
        });
      })
    } else {
      //redirect
    }
}

sendMessage(body:any){
  if(this.chatForm.valid){

    this.messages.push({
      'userId': this.user.uid,
      'body': this.chatForm.value.message,
      'timestamp': Date(),
    })
  
  }

}

scrollToBottom() {
if(window.scrollY!=0)
{
    setTimeout(function() {
       window.scrollTo(100,window.scrollY-30);
        this.scrollToBottom();
    }, 100);
   }
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}

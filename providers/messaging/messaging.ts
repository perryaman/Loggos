import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase/app';

/*
  Generated class for the MessagingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MessagingProvider {

  constructor(public http: Http, public db: AngularFireDatabase) {
    console.log('Hello MessagingProvider Provider');
  }

  newChat(userId1:any, userId2:any){
    //Check if a chat with these participants exists
    // this.db.list('chats/',{
    //   query: {
    //     orderByChild:"users",
    //     equalTo: userId1 && userId2
    //   } 
    // })
    //if yes then load that chat

    //If not then create new chat and load it
    this.db.list('chats').push(
      { 
        'timestamp': Date(),
        'users': [userId1, userId2]
      }
    )
  }

}

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
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
/*
  Generated class for the MessagingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var MessagingProvider = (function () {
    function MessagingProvider(http, db) {
        this.http = http;
        this.db = db;
        console.log('Hello MessagingProvider Provider');
    }
    MessagingProvider.prototype.newChat = function (userId1, userId2) {
        //Check if a chat with these participants exists
        // this.db.list('chats/',{
        //   query: {
        //     orderByChild:"users",
        //     equalTo: userId1 && userId2
        //   } 
        // })
        //if yes then load that chat
        //If not then create new chat and load it
        this.db.list('chats').push({
            'timestamp': Date(),
            'users': [userId1, userId2]
        });
    };
    return MessagingProvider;
}());
MessagingProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, AngularFireDatabase])
], MessagingProvider);
export { MessagingProvider };
//# sourceMappingURL=messaging.js.map
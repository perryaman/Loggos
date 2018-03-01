var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChatPage } from '../chat/chat';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
/**
 * Generated class for the ProjectsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MessagingPage = (function () {
    function MessagingPage(navCtrl, navParams, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.user = firebase.auth().currentUser;
        this.chats = this.db.list('chats/', {
            query: {
                orderByChild: 'users',
                equalTo: this.user.uid
            }
        });
        console.log(this.chats);
    }
    MessagingPage.prototype.openProjectPage = function (id) {
        this.navCtrl.push(ChatPage, { 'chatId': id });
    };
    MessagingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MessagingPage');
    };
    return MessagingPage;
}());
MessagingPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-messaging',
        templateUrl: 'messaging.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFireDatabase])
], MessagingPage);
export { MessagingPage };
//# sourceMappingURL=messaging.js.map
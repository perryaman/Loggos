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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';
/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ChatPage = (function () {
    function ChatPage(navCtrl, navParams, db, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.formBuilder = formBuilder;
        this.user = firebase.auth().currentUser; //Get user deets
        this.chatId = navParams.get('chatId'); //Let's get the ID of the chat we're looking for
        this.chatForm = formBuilder.group({
            message: ['', Validators.compose([Validators.required])]
        });
        this.chatId = '1';
        if (this.chatId) {
            //Let's get the chat properties
            this.chat = db.object("chats/" + this.chatId);
            //Let's get the messages
            this.messages = db.list("chatMessages/" + this.chatId);
            this.messages.$ref.on('value', function (_) {
                console.log("child added");
                var element = document.getElementById("focus");
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });
            });
        }
        else {
            //redirect
        }
    }
    ChatPage.prototype.sendMessage = function (body) {
        if (this.chatForm.valid) {
            this.messages.push({
                'userId': this.user.uid,
                'body': this.chatForm.value.message,
                'timestamp': Date(),
            });
        }
    };
    ChatPage.prototype.scrollToBottom = function () {
        if (window.scrollY != 0) {
            setTimeout(function () {
                window.scrollTo(100, window.scrollY - 30);
                this.scrollToBottom();
            }, 100);
        }
    };
    ChatPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChatPage');
    };
    return ChatPage;
}());
ChatPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-chat',
        templateUrl: 'chat.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        AngularFireDatabase, FormBuilder])
], ChatPage);
export { ChatPage };
//# sourceMappingURL=chat.js.map
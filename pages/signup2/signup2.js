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
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
/**
 * Generated class for the Signup2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Signup2Page = (function () {
    function Signup2Page(navCtrl, navParams, actionSheetCtrl, toastCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
    }
    Signup2Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Signup2Page');
    };
    Signup2Page.prototype.designer = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'DESIGNER',
            message: 'As a designer you\'ll be required to make amazing designs for clients and be paid via Mobile Money',
            buttons: [
                {
                    text: 'Continue',
                    handler: function () {
                        _this.navCtrl.push('SignupPage', { 'role': 'designer' });
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        alert.present();
    };
    Signup2Page.prototype.client = function () {
        this.navCtrl.push('SignupPage', { 'role': 'client' });
    };
    Signup2Page.prototype.strategist = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'STRATEGIST',
            message: 'As a strategist you\'ll be required to make amazing brand strategy for clients and be paid via Mobile Money',
            buttons: [
                {
                    text: 'Continue',
                    handler: function () {
                        _this.navCtrl.push('SignupPage', { 'role': 'strategist' });
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        alert.present();
    };
    Signup2Page.prototype.copywriter = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'COPYWRITER',
            message: 'As a copywriter you\'ll be required to create great content for clients and be paid via Mobile Money',
            buttons: [
                {
                    text: 'Continue',
                    handler: function () {
                        //                this.navCtrl.push('SignupPage', {'role':'copywriter'});
                        var toast = _this.toastCtrl.create({
                            message: 'Coming soon...',
                            duration: 2000,
                            position: 'middle'
                        });
                        toast.present();
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        alert.present();
    };
    Signup2Page.prototype.sales = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'SALES AGENT',
            message: 'As a sales agent you\'ll be required to make acquire clients for clients and be paid via Mobile Money',
            buttons: [
                {
                    text: 'Continue',
                    handler: function () {
                        //              this.navCtrl.push('SignupPage', {'role':'sales'});
                        var toast = _this.toastCtrl.create({
                            message: 'Coming soon...',
                            duration: 2000,
                            position: 'middle'
                        });
                        toast.present();
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        alert.present();
    };
    Signup2Page.prototype.presentServiceProviderActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Choose service provider type',
            buttons: [
                {
                    text: 'Designer',
                    handler: function () {
                        _this.navCtrl.setRoot('SignupPage', { 'role': 'designer' });
                    }
                }, {
                    text: 'Strategist',
                    handler: function () {
                        _this.navCtrl.setRoot('SignupPage', { 'role': 'strategist' });
                    }
                }, {
                    text: 'Sales',
                    handler: function () {
                        var toast = _this.toastCtrl.create({
                            message: 'Coming soon...',
                            duration: 2000,
                            position: 'middle'
                        });
                        toast.present();
                    }
                }, {
                    text: 'Copywriter',
                    handler: function () {
                        var toast = _this.toastCtrl.create({
                            message: 'Coming soon...',
                            duration: 2000,
                            position: 'middle'
                        });
                        toast.present();
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    return Signup2Page;
}());
Signup2Page = __decorate([
    IonicPage(),
    Component({
        selector: 'page-signup2',
        templateUrl: 'signup2.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        ActionSheetController, ToastController, AlertController])
], Signup2Page);
export { Signup2Page };
//# sourceMappingURL=signup2.js.map
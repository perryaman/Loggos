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
import { IonicPage, NavController, ViewController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the AddStrategistToProjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddStrategistToProjectPage = (function () {
    function AddStrategistToProjectPage(navCtrl, navParams, db, actionSheetCtrl, toastCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.viewCtrl = viewCtrl;
        this.initializeStrategists();
        //Get project ID from navParams
        this.projectId = navParams.get('projectId');
    }
    AddStrategistToProjectPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddStrategistToProjectPage');
    };
    AddStrategistToProjectPage.prototype.initializeStrategists = function () {
        var _this = this;
        this.db.list('users', {
            query: {
                orderByChild: 'role',
                equalTo: 'strategist'
            }
        }).subscribe(function (strategistsSnap) {
            _this.strategists = strategistsSnap;
            console.log(_this.strategists);
        });
    };
    ;
    AddStrategistToProjectPage.prototype.getStrategists = function (ev) {
        // Reset items back to all of the items
        this.initializeStrategists();
        // this.db.list('strategists').$ref.on('value', strategistsSnap=> {
        //   this.strategists = strategistsSnap.val();
        // set val to the value of the ev target
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.strategists = this.strategists.filter(function (item) {
                console.log(val);
                console.log(item);
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        //    });
    };
    AddStrategistToProjectPage.prototype.strategistClicked = function (strategist) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Add this Strategist to project?',
            buttons: [
                {
                    text: 'Yes, add strategist',
                    handler: function () {
                        _this.addStrategistToProject(strategist);
                    }
                }, {
                    text: 'View Strategist Profile',
                    handler: function () {
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                }
            ]
        });
        actionSheet.present();
    };
    AddStrategistToProjectPage.prototype.addStrategistToProject = function (strategistId) {
        var _this = this;
        //Update the project and strategist profile
        //Show toast success
        //go back to project
        console.log(strategistId);
        console.log(this.projectId);
        this.db.object('projects/' + this.projectId).update({ 'strategist': strategistId }).then(function (_) {
            _this.db.list('users/' + strategistId + '/projects').push(_this.projectId).then(function (_) {
                var toast = _this.toastCtrl.create({
                    message: 'The Strategist has been added successfuly.',
                    duration: 3000,
                    position: 'middle'
                });
                toast.present();
                _this.dismiss();
            });
        });
    };
    AddStrategistToProjectPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return AddStrategistToProjectPage;
}());
AddStrategistToProjectPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-add-strategist-to-project',
        templateUrl: 'add-strategist-to-project.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        AngularFireDatabase,
        ActionSheetController,
        ToastController,
        ViewController])
], AddStrategistToProjectPage);
export { AddStrategistToProjectPage };
//# sourceMappingURL=add-strategist-to-project.js.map
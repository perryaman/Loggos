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
 * Generated class for the AddCopywriterToProjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddCopywriterToProjectPage = (function () {
    function AddCopywriterToProjectPage(navCtrl, navParams, db, actionSheetCtrl, toastCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.viewCtrl = viewCtrl;
        this.initializeCopywriters();
        //Get project ID from navParams
        this.projectId = navParams.get('projectId');
    }
    AddCopywriterToProjectPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddCopywriterToProjectPage');
    };
    AddCopywriterToProjectPage.prototype.initializeCopywriters = function () {
        var _this = this;
        this.db.list('users', {
            query: {
                orderByChild: 'role',
                equalTo: 'copywriter'
            }
        }).subscribe(function (copywritersSnap) {
            _this.copywriters = copywritersSnap;
            console.log(_this.copywriters);
        });
    };
    ;
    AddCopywriterToProjectPage.prototype.getCopywriters = function (ev) {
        // Reset items back to all of the items
        this.initializeCopywriters();
        // this.db.list('copywriters').$ref.on('value', copywritersSnap=> {
        //   this.copywriters = copywritersSnap.val();
        // set val to the value of the ev target
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.copywriters = this.copywriters.filter(function (item) {
                console.log(val);
                console.log(item);
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        //    });
    };
    AddCopywriterToProjectPage.prototype.copywriterClicked = function (copywriter) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Add this Copywriter to project?',
            buttons: [
                {
                    text: 'Yes, add copywriter',
                    handler: function () {
                        _this.addCopywriterToProject(copywriter);
                    }
                }, {
                    text: 'View Copywriter Profile',
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
    AddCopywriterToProjectPage.prototype.addCopywriterToProject = function (copywriterId) {
        var _this = this;
        //Update the project and copywriter profile
        //Show toast success
        //go back to project
        console.log(copywriterId);
        console.log(this.projectId);
        this.db.object('projects/' + this.projectId).update({ 'copywriter': copywriterId }).then(function (_) {
            _this.db.list('users/' + copywriterId + '/projects').push(_this.projectId).then(function (_) {
                var toast = _this.toastCtrl.create({
                    message: 'The Copywriter has been added successfuly.',
                    duration: 3000,
                    position: 'middle'
                });
                toast.present();
                _this.dismiss();
            });
        });
    };
    AddCopywriterToProjectPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return AddCopywriterToProjectPage;
}());
AddCopywriterToProjectPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-add-copywriter-to-project',
        templateUrl: 'add-copywriter-to-project.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        AngularFireDatabase,
        ActionSheetController,
        ToastController,
        ViewController])
], AddCopywriterToProjectPage);
export { AddCopywriterToProjectPage };
//# sourceMappingURL=add-copywriter-to-project.js.map
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
 * Generated class for the AddDesignerToProjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddDesignerToProjectPage = (function () {
    function AddDesignerToProjectPage(navCtrl, navParams, db, actionSheetCtrl, toastCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.viewCtrl = viewCtrl;
        this.initializeDesigners();
        //Get project ID from navParams
        this.projectId = navParams.get('projectId');
    }
    AddDesignerToProjectPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddDesignerToProjectPage');
    };
    AddDesignerToProjectPage.prototype.initializeDesigners = function () {
        var _this = this;
        this.db.list('users', {
            query: {
                orderByChild: 'role',
                equalTo: 'designer'
            }
        }).subscribe(function (designersSnap) {
            _this.designers = designersSnap;
            console.log(_this.designers);
        });
    };
    ;
    AddDesignerToProjectPage.prototype.getDesigners = function (ev) {
        // Reset items back to all of the items
        this.initializeDesigners();
        // this.db.list('designers').$ref.on('value', designersSnap=> {
        //   this.designers = designersSnap.val();
        // set val to the value of the ev target
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.designers = this.designers.filter(function (item) {
                console.log(val);
                console.log(item);
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        //    });
    };
    AddDesignerToProjectPage.prototype.designerClicked = function (designer) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Add this Designer to project?',
            buttons: [
                {
                    text: 'Yes, add designer',
                    handler: function () {
                        _this.addDesignerToProject(designer);
                    }
                }, {
                    text: 'View Designer Profile',
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
    AddDesignerToProjectPage.prototype.addDesignerToProject = function (designerId) {
        var _this = this;
        //Update the project and designer profile
        //Show toast success
        //go back to project
        console.log(designerId);
        console.log(this.projectId);
        this.db.object('projects/' + this.projectId).update({ 'designer': designerId }).then(function (_) {
            _this.db.list('users/' + designerId + '/projects').push(_this.projectId).then(function (_) {
                var toast = _this.toastCtrl.create({
                    message: 'The Designer has been added successfuly.',
                    duration: 3000,
                    position: 'middle'
                });
                toast.present();
                _this.dismiss();
            });
        });
    };
    AddDesignerToProjectPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return AddDesignerToProjectPage;
}());
AddDesignerToProjectPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-add-designer-to-project',
        templateUrl: 'add-designer-to-project.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        AngularFireDatabase,
        ActionSheetController,
        ToastController,
        ViewController])
], AddDesignerToProjectPage);
export { AddDesignerToProjectPage };
//# sourceMappingURL=add-designer-to-project.js.map
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
import { CreateProject2Page } from '../create-project2/create-project2';
/**
 * Generated class for the CreateProject1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CreateProject1Page = (function () {
    function CreateProject1Page(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CreateProject1Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateProject1Page');
    };
    CreateProject1Page.prototype.openCreateProject2Page = function (data) {
        this.navCtrl.push(CreateProject2Page, data);
    };
    return CreateProject1Page;
}());
CreateProject1Page = __decorate([
    IonicPage(),
    Component({
        selector: 'page-create-project1',
        templateUrl: 'create-project1.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], CreateProject1Page);
export { CreateProject1Page };
//# sourceMappingURL=create-project1.js.map
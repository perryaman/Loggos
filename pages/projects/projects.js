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
import { ProjectPage } from "../project/project";
/**
 * Generated class for the ProjectsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProjectsPage = (function () {
    function ProjectsPage(navCtrl, navParams, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.projects = this.db.list('projects/');
    }
    ProjectsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProjectsPage');
    };
    ProjectsPage.prototype.openProjectPage = function (id) {
        this.navCtrl.push(ProjectPage, { 'projectId': id });
    };
    return ProjectsPage;
}());
ProjectsPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-projects',
        templateUrl: 'projects.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFireDatabase])
], ProjectsPage);
export { ProjectsPage };
//# sourceMappingURL=projects.js.map
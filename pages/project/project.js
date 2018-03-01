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
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { ProjectStagePage } from '../project-stage/project-stage';
import { AngularFireDatabase } from 'angularfire2/database';
import { AddDesignerToProjectPage } from '../add-designer-to-project/add-designer-to-project';
import { AddStrategistToProjectPage } from '../add-strategist-to-project/add-strategist-to-project';
import { AddCopywriterToProjectPage } from '../add-copywriter-to-project/add-copywriter-to-project';
import { ProfilePage } from '../profile/profile';
import * as firebase from 'firebase/app';
/**
 * Generated class for the ProjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProjectPage = (function () {
    function ProjectPage(navCtrl, navParams, db, modalCtrl, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.projectInfo = {
            designer: null,
            strategist: null,
            company: null,
            copywriter: null,
            client: null
        };
        this.projectStagePage = ProjectStagePage;
        //Get user details
        this.user = db.object('users/' + firebase.auth().currentUser.uid);
        //Get project ID from navParams
        this.projectId = navParams.get('projectId');
        //fetch the project stages from DB
        this.stages = this.getStages(this.projectId);
        //Get the project info from DB
        this.db.object('projects/' + this.projectId).subscribe(function (data) {
            _this.project = data;
            //Get the readables for project data
            if (data.designer) {
                _this.db.object('users/' + data.designer + "/name").$ref.once('value', function (name) {
                    _this.projectInfo.designer = name.val();
                });
            }
            if (data.company) {
                _this.db.object('companies/' + data.company + "/name").$ref.once('value', function (name) {
                    _this.projectInfo.client = name.val();
                });
            }
            if (data.client) {
                _this.db.object('users/' + data.client + "/name").$ref.once('value', function (name) {
                    _this.projectInfo.company = name.val();
                });
            }
            if (data.copywriter) {
                _this.db.object('users/' + data.copywriter + "/name").$ref.once('value', function (name) {
                    _this.projectInfo.copywriter = name.val();
                });
            }
            if (data.strategist) {
                _this.db.object('users/' + data.strategist + "/name").$ref.once('value', function (name) {
                    _this.projectInfo.strategist = name.val();
                });
            }
        });
    }
    ProjectPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProjectPage');
    };
    ProjectPage.prototype.getStages = function (id) {
        return this.db.list('stages/' + id);
    };
    ProjectPage.prototype.openProjectStagePage = function (stageId) {
        this.navCtrl.push(ProjectStagePage, {
            'projectId': this.projectId,
            'stageId': stageId
        });
    };
    ProjectPage.prototype.quickViewProfile = function (designerId) {
        this.navCtrl.push(ProfilePage, { 'userId': designerId });
    };
    ProjectPage.prototype.addDesigner = function () {
        //create a modal for the user to select a designer
        var modal = this.modalCtrl.create(AddDesignerToProjectPage, { 'projectId': this.projectId });
        modal.present();
        //mm
    };
    ProjectPage.prototype.addCopywriter = function () {
        //create a modal for the user to select a designer
        var modal = this.modalCtrl.create(AddCopywriterToProjectPage, { 'projectId': this.projectId });
        modal.present();
    };
    ProjectPage.prototype.addStrategist = function () {
        //create a modal for the user to select a designer
        var modal = this.modalCtrl.create(AddStrategistToProjectPage, { 'projectId': this.projectId });
        modal.present();
    };
    ProjectPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return ProjectPage;
}());
ProjectPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-project',
        templateUrl: 'project.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFireDatabase,
        ModalController, ViewController])
], ProjectPage);
export { ProjectPage };
//# sourceMappingURL=project.js.map
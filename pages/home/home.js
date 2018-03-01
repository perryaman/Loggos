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
import { NavController } from 'ionic-angular';
import { ProjectPage } from '../project/project';
import { NotificationsPage } from '../notifications/notifications';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { SignupClient1Page } from '../signup-client1/signup-client1';
import { SignupDesigner1Page } from '../signup-designer1/signup-designer1';
import { CreateProject1Page } from '../create-project1/create-project1';
import { ProjectsPage } from '../projects/projects';
import { MessagingPage } from '../messaging/messaging';
import { HelpPage } from '../help/help';
var HomePage = (function () {
    function HomePage(navCtrl, db, auth) {
        this.navCtrl = navCtrl;
        this.db = db;
        this.projectPage = ProjectPage;
        this.projectsPage = ProjectsPage;
        this.notificationsPage = NotificationsPage;
        this.messagingPage = MessagingPage;
        this.helpPage = HelpPage;
        //get  logged in user
        this.user = firebase.auth().currentUser;
        //
        this.checkRegistrationComplete();
        //Get the user properties
        this.userInfo = db.object('users/' + this.user.uid);
        //Get the projects the user is involved in
        this.getProjects();
    }
    HomePage.prototype.getProjects = function () {
        var _this = this;
        //get list of projects the user has by whatever role they have 
        //we need to get the user role first so we use a join
        this.db.object('users/' + this.user.uid).$ref.on('value', function (userSnap) {
            _this.userSnap = userSnap;
            if (userSnap.val().role == 'client') {
                _this.projects = _this.db.list('projects/', {
                    query: {
                        orderByChild: 'client',
                        equalTo: _this.user.uid,
                    }
                });
                console.log(_this.projects);
            }
            else if (userSnap.val().role == 'designer') {
                _this.projects = _this.db.list('projects/', {
                    query: {
                        orderByChild: 'designer',
                        equalTo: _this.user.uid,
                    }
                });
            }
            else if (userSnap.val().role == 'strategist') {
                _this.projects = _this.db.list('projects/', {
                    query: {
                        limitToFirst: 5,
                    }
                });
            }
        });
        //  return this.projects;
    };
    HomePage.prototype.openProjectPage = function (id) {
        this.navCtrl.push(ProjectPage, { 'projectId': id });
    };
    HomePage.prototype.openAllProjects = function () {
        console.log("clik");
        this.navCtrl.push(ProjectsPage);
    };
    HomePage.prototype.getActivities = function (db, projects) {
        var _this = this;
        //get a list of activities that have happend recently
        //activity is any action taken on a project and is recorded
        //foreach project the user has, use the project id to get the recent activities
        this.projects.forEach(function (element) {
            _this.activities.push(db.list('https://loggos-baaab.firebaseio.com/activities/' + element.id));
        });
    };
    HomePage.prototype.getMessages = function (db) {
        db.list('https://loggos-baaab.firebaseio.com/messages/' + this.user.uid);
    };
    HomePage.prototype.getNotifications = function (db) {
        //get a list of notifications the user has
        //notification is any action taken on a project and is recorded
        this.notifications = db.list('https://loggos-baaab.firebaseio.com/notifications/' + this.user.uid);
    };
    HomePage.prototype.notifications = function () {
        this.navCtrl.setRoot('notifications');
    };
    HomePage.prototype.checkRegistrationComplete = function () {
        //check if user finished reg, if not redirect to where he stopped
        var _this = this;
        this.db.object('users/' + this.user.uid).$ref.on('value', function (userSnap) {
            //Check if the user completed his profile registration
            if (!userSnap.val().name) {
                //the user didn't complete reg
                //check their role and redirect accordingly
                if (userSnap.val().role == 'client') {
                    _this.navCtrl.setRoot(SignupClient1Page);
                }
                else if (userSnap.val().role == 'designer') {
                    _this.navCtrl.setRoot(SignupDesigner1Page);
                }
            }
            else if (userSnap.val().role == 'client' && userSnap.val().name && !userSnap.val().company) {
                _this.navCtrl.setRoot(CreateProject1Page);
            }
            else if (userSnap.val().role == 'client' && userSnap.val().name && userSnap.val().company && !userSnap.val().project) {
                _this.navCtrl.setRoot(CreateProject1Page);
            }
        });
    };
    HomePage.prototype.getAllProjects = function () {
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NavController, AngularFireDatabase, AngularFireAuth])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map
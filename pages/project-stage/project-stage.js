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
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
/**
 * Generated class for the ProjectStagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProjectStagePage = (function () {
    function ProjectStagePage(navCtrl, navParams, db, formBuilder, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.formBuilder = formBuilder;
        this.toastCtrl = toastCtrl;
        this.commentForm = formBuilder.group({
            comment: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        });
        //get the stage info from navParams
        this.projectId = navParams.get('projectId');
        this.stageId = navParams.get('stageId');
        //Get stage from DB 
        db.object('stages/' + this.projectId + '/' + this.stageId).subscribe(function (data) {
            _this.stage = data;
        });
        //Get username for posting comment
        db.object('users/' + firebase.auth().currentUser.uid).subscribe(function (data) {
            _this.userProfile = data;
        });
        //Get comments for this stage
        db.list('stages/' + this.projectId + '/' + this.stageId + '/comments')
            .map(function (commentsSnap) {
            var commentsRaw = [];
            commentsSnap.map(function (commentSnap) {
                db.object('users/' + commentSnap.userId).$ref.once('value', function (userSnap) {
                    commentSnap.name = userSnap.val().name ? userSnap.val().name : userSnap.val().email;
                    commentsRaw.push(commentSnap);
                });
            });
            return commentsRaw;
        })
            .subscribe(function (comments) {
            _this.comments = comments;
            console.log(_this.comments);
        });
        //Get deliverables for this stage
        console.log(this.comments);
    }
    ProjectStagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProjectStagePage');
    };
    ProjectStagePage.prototype.getStage = function () {
    };
    ProjectStagePage.prototype.saveComment = function () {
        var _this = this;
        if (!this.commentForm.valid) {
            var toast = this.toastCtrl.create({
                message: 'Your comment must be at least 6 characters long. Please try again.',
                duration: 3000,
                position: 'middle'
            });
            toast.present();
        }
        else {
            //Name
            //Timestamp
            //user id
            //Body
            this.db.list('stages/' + this.projectId + '/' + this.stageId + '/comments').push({
                'timestamp': Date(),
                'userId': firebase.auth().currentUser.uid,
                'body': this.commentForm.value.comment
            })
                .then(function () {
                var toast = _this.toastCtrl.create({
                    message: 'Comment saved',
                    duration: 2000,
                    position: 'middle'
                });
                toast.present();
            });
        }
    };
    return ProjectStagePage;
}());
ProjectStagePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-project-stage',
        templateUrl: 'project-stage.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFireDatabase,
        FormBuilder, ToastController])
], ProjectStagePage);
export { ProjectStagePage };
//# sourceMappingURL=project-stage.js.map
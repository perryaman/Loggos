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
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
/**
 * Generated class for the CreateProject2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//-New project 
//Choose package
//*Fill Questionnaire
//create project
var CreateProject2Page = (function () {
    function CreateProject2Page(navCtrl, navParams, db, afAuth, formBuilder, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.afAuth = afAuth;
        this.formBuilder = formBuilder;
        this.toastCtrl = toastCtrl;
        this.projectQtnForm = formBuilder.group({
            qtn1: ['', Validators.compose([Validators.minLength(1), Validators.required])],
            qtn2: ['', Validators.compose([Validators.minLength(1), Validators.required])],
            qtn3: ['', Validators.compose([Validators.minLength(1), Validators.required])],
        });
        //Get the package from navparams
        this.package = navParams.data;
        this.db.object('users/' + this.afAuth.auth.currentUser.uid).$ref.once('value', function (userSnap) {
            _this.companyId = userSnap.val().company;
            //Get the company details
            _this.db.object('companies/' + userSnap.val().company).$ref.once('value', function (companySnap) {
                _this.company = companySnap.val();
            });
        });
        console.log(this.company);
        console.log(this.companyId);
    }
    CreateProject2Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateProject2Page');
    };
    CreateProject2Page.prototype.getClientInfo = function () {
    };
    CreateProject2Page.prototype.saveProjectQtn = function () {
        var _this = this;
        if (!this.projectQtnForm.valid) {
            var toast = this.toastCtrl.create({
                message: 'Some of your input is invalid. Please try again.',
                duration: 3000,
                position: 'middle'
            });
            toast.present();
        }
        else {
            console.log(this.company);
            console.log(this.companyId);
            //Get the company ID
            this.db.object('users/' + this.afAuth.auth.currentUser.uid).$ref.once('value', function (userSnap) {
                _this.companyId ? _this.companyId : _this.companyId = userSnap.val().company;
                //Get the company details
                _this.db.object('companies/' + userSnap.val().company).$ref.once('value', function (companySnap) {
                    _this.company ? _this.company : _this.company = companySnap.val();
                    console.log(_this.company);
                    console.log(_this.companyId);
                    _this.db.list('questionnaires/').push({
                        'answers': {
                            'Qtn 1': _this.projectQtnForm.value.qtn1,
                            'Qtn 2': _this.projectQtnForm.value.qtn2,
                            'Qtn 3': _this.projectQtnForm.value.qtn3
                        },
                        'client': _this.afAuth.auth.currentUser.uid,
                        'project': '',
                        'company': _this.companyId
                    }).then(function (item) {
                        //create project
                        _this.db.list('projects/').push({
                            'timestamp': Date(),
                            'active': true,
                            'name': _this.company.name + ' Branding Project',
                            'package': _this.package,
                            'client': _this.afAuth.auth.currentUser.uid,
                            'strategist': '',
                            'designer': '',
                            'copywriter': '',
                            'company': _this.companyId,
                            'questionnaire': item.key,
                            'stages': '',
                        }).then(function (thing) {
                            // Add project id to questionnaire, user and company          
                            _this.db.object('users/' + _this.afAuth.auth.currentUser.uid).update({
                                'project': thing.key,
                            }).then(function () {
                                //update the company to include the project
                                _this.db.object('companies/' + _this.companyId).update({
                                    'project': thing.key,
                                });
                            }).then(function () {
                                //update the company to include the questionnaire
                                _this.db.object('questionnaires/' + item.key).update({
                                    'project': thing.key,
                                });
                            }).then(function () {
                                //create project stages. We're using the same key as the projectid since stages is a nromalised form of the entire projects  
                                _this.db.object('stages/' + thing.key).set({
                                    '1': {
                                        'startDate': '',
                                        'endDate': '',
                                        'stage': 'Stage 1',
                                        'name': 'Visioning and personification',
                                        'description': 'Description goes here...',
                                        'comments': '',
                                        'deliverables': ''
                                    },
                                    '2': {
                                        'startDate': '',
                                        'endDate': '',
                                        'stage': 'Stage 2',
                                        'name': 'Sketching',
                                        'description': 'Description goes here...',
                                        'comments': '',
                                        'deliverables': ''
                                    },
                                    '3': {
                                        'startDate': '',
                                        'endDate': '',
                                        'stage': 'Stage 3',
                                        'name': 'Black and White Proofing',
                                        'description': 'Description goes here...',
                                        'comments': '',
                                        'deliverables': ''
                                    },
                                    '4': {
                                        'startDate': '',
                                        'endDate': '',
                                        'stage': 'Stage 4',
                                        'name': 'Full Colour Logo',
                                        'description': 'Description goes here...',
                                        'comments': '',
                                        'deliverables': ''
                                    },
                                    '5': {
                                        'startDate': '',
                                        'endDate': '',
                                        'stage': 'Stage 5',
                                        'name': 'Final Deliverables',
                                        'description': 'Description goes here...',
                                        'comments': '',
                                        'deliverables': ''
                                    }
                                });
                            });
                        }).then(function () {
                            //update the user profile to include the questionnaire
                            _this.db.object('users/' + _this.afAuth.auth.currentUser.uid).update({
                                'questionnaire': item.key,
                            });
                            console.log("updated user");
                        }).then(function () {
                            //update the company to include the questionnaire
                            _this.db.object('companies/' + _this.companyId).update({
                                'questionnaire': item.key,
                            });
                        });
                    });
                });
            })
                .then(function () {
                var toast = _this.toastCtrl.create({
                    message: 'Details saved successfully',
                    duration: 3000,
                    position: 'middle'
                });
                toast.present();
            }).then(function () {
                _this.navCtrl.setRoot(HomePage);
            });
        }
    };
    return CreateProject2Page;
}());
CreateProject2Page = __decorate([
    IonicPage(),
    Component({
        selector: 'page-create-project2',
        templateUrl: 'create-project2.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        AngularFireDatabase, AngularFireAuth,
        FormBuilder, ToastController])
], CreateProject2Page);
export { CreateProject2Page };
//# sourceMappingURL=create-project2.js.map
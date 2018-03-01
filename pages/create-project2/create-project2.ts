import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HomePage} from '../home/home';


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

@IonicPage()
@Component({
  selector: 'page-create-project2',
  templateUrl: 'create-project2.html',
})
export class CreateProject2Page {
   projectQtnForm: FormGroup;
   package: String;
   user: FirebaseObjectObservable<any>;
   companyId: any;
   company: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public db: AngularFireDatabase, public afAuth: AngularFireAuth,
  public formBuilder: FormBuilder, public toastCtrl: ToastController) {

    this.projectQtnForm = formBuilder.group({
      qtn1: ['', Validators.compose([Validators.minLength(1), Validators.required])],
      qtn2: ['', Validators.compose([Validators.minLength(1), Validators.required])],
      qtn3: ['', Validators.compose([Validators.minLength(1), Validators.required])],      
    });  

    //Get the package from navparams
    this.package = navParams.data;
   
    this.db.object('users/'+this.afAuth.auth.currentUser.uid).$ref.once('value',
      userSnap=>{
        this.companyId = userSnap.val().company;
        
        //Get the company details
        this.db.object('companies/'+userSnap.val().company).$ref.once('value',
        companySnap=>{
          this.company = companySnap.val();
        })
    })
            console.log(this.company);
        console.log(this.companyId);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProject2Page');
  }

  getClientInfo(){ //get current info for the client if exists to populate the form 

  }

  saveProjectQtn(){
    if (!this.projectQtnForm.valid){
      let toast = this.toastCtrl.create({
        message: 'Some of your input is invalid. Please try again.',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
    } else {
        console.log(this.company);
        console.log(this.companyId);
        
        //Get the company ID
        this.db.object('users/'+this.afAuth.auth.currentUser.uid).$ref.once('value',
          userSnap=>{
              this.companyId ? this.companyId : this.companyId = userSnap.val().company;
              //Get the company details
              this.db.object('companies/'+userSnap.val().company).$ref.once('value',
              companySnap=>{
                this.company ? this.company: this.company = companySnap.val();
        console.log(this.company);
        console.log(this.companyId);

         this.db.list('questionnaires/').push({
              'answers': {
                'Qtn 1':this.projectQtnForm.value.qtn1,
                'Qtn 2':this.projectQtnForm.value.qtn2,
                'Qtn 3':this.projectQtnForm.value.qtn3},
              'client': this.afAuth.auth.currentUser.uid,
              'project':'',
              'company':this.companyId
            }).then((item)=>{ //Where item is new questionnaire promise
              //create project
                this.db.list('projects/').push({
                    'timestamp': Date(),
                    'active': true,
                    'name': this.company.name+' Branding Project',
                    'package':this.package,
                    'client': this.afAuth.auth.currentUser.uid,
                    'strategist':'',
                    'designer':'',
                    'copywriter':'',
                    'company':this.companyId,
                    'questionnaire': item.key,
                    'stages': '',
                    
                  }).then((thing)=>{ //Where thing is new project promise. note the deeper scope 
                      // Add project id to questionnaire, user and company          
                      this.db.object('users/'+this.afAuth.auth.currentUser.uid).update({
                          'project': thing.key,
                        }).then(()=>{ 
                          //update the company to include the project
                          this.db.object('companies/'+this.companyId).update({
                              'project': thing.key,
                            })
                        }).then(()=>{ 
                            //update the company to include the questionnaire
                            this.db.object('questionnaires/'+item.key).update({
                                'project': thing.key,
                              })
                        }).then(()=>{ 
                            //create project stages. We're using the same key as the projectid since stages is a nromalised form of the entire projects  
                            this.db.object('stages/'+thing.key).set({
                                '1':{
                                  'startDate':'',
                                  'endDate':'',
                                  'stage':'Stage 1',
                                  'name': 'Visioning and personification',
                                  'description': 'Description goes here...',
                                  'comments':'',
                                  'deliverables':''
                                },
                                '2':{
                                  'startDate':'',
                                  'endDate':'',
                                  'stage':'Stage 2',
                                  'name': 'Sketching',
                                  'description': 'Description goes here...',
                                  'comments':'',
                                  'deliverables':''
                                },
                                '3':{
                                  'startDate':'',
                                  'endDate':'',
                                  'stage':'Stage 3',
                                  'name': 'Black and White Proofing',
                                  'description': 'Description goes here...',
                                  'comments':'',
                                  'deliverables':''
                                },
                                '4':{
                                  'startDate':'',
                                  'endDate':'',
                                  'stage':'Stage 4',
                                  'name': 'Full Colour Logo',
                                  'description': 'Description goes here...',
                                  'comments':'',
                                  'deliverables':''
                                },
                                '5':{
                                  'startDate':'',
                                  'endDate':'',
                                  'stage':'Stage 5',
                                  'name': 'Final Deliverables',
                                  'description': 'Description goes here...',
                                  'comments':'',
                                  'deliverables':''
                                }
                                        
                              })
                        });

                    }).then(()=>{ 
                      //update the user profile to include the questionnaire
                      this.db.object('users/'+this.afAuth.auth.currentUser.uid).update({
                          'questionnaire': item.key,
                        });
                        console.log("updated user");
                    }).then(()=>{ 
                    //update the company to include the questionnaire
                    this.db.object('companies/'+this.companyId).update({
                        'questionnaire': item.key,
                      })
                    })
            })
            
            
            })        
          })
            .then(()=>{
            let toast = this.toastCtrl.create({
              message: 'Details saved successfully',
              duration: 3000,
              position: 'middle'
            });
          toast.present();          

      }).then(()=>{
         this.navCtrl.setRoot(HomePage);        
      });      
    }
  } 

}

import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';

/**
 * Generated class for the AddStrategistToProjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-strategist-to-project',
  templateUrl: 'add-strategist-to-project.html',
})
export class AddStrategistToProjectPage {
  strategists : any;
  projectId: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public db:AngularFireDatabase, 
  public actionSheetCtrl: ActionSheetController,
  public toastCtrl: ToastController,
  public viewCtrl: ViewController) {
    this.initializeStrategists();
    //Get project ID from navParams
    this.projectId = navParams.get('projectId');
        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddStrategistToProjectPage');
  }

  initializeStrategists(){
    this.db.list('users'
    , {
          query:{
            orderByChild: 'role',
            equalTo: 'strategist'
          }
      }
      ).subscribe(strategistsSnap=>{
        this.strategists = strategistsSnap;
        console.log(this.strategists);
      });
  };
      
  getStrategists(ev:any) {
      // Reset items back to all of the items
      this.initializeStrategists();

      // this.db.list('strategists').$ref.on('value', strategistsSnap=> {
      
      //   this.strategists = strategistsSnap.val();
      
        // set val to the value of the ev target
        var val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.strategists = this.strategists.filter((item:any) => {
            console.log(val);
            
            console.log(item);
            return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
  //    });
      
    }


    strategistClicked(strategist:any){
          let actionSheet = this.actionSheetCtrl.create({
            title: 'Add this Strategist to project?',
            buttons: [
              {
                text: 'Yes, add strategist',
                handler: () => {
                  this.addStrategistToProject(strategist);
                }
              },{
                text: 'View Strategist Profile',
                handler: () => {

                }
              },{
                text: 'Cancel',
                role: 'cancel',
              }
            ]
          });
          actionSheet.present();
    }

    addStrategistToProject(strategistId:any){
      //Update the project and strategist profile
      //Show toast success
      //go back to project
      console.log(strategistId);
      console.log(this.projectId);
      this.db.object('projects/'+this.projectId).update({'strategist':strategistId}).then(
        _ => {
          this.db.list('users/'+strategistId+'/projects').push(this.projectId).then(_=>{
            let toast = this.toastCtrl.create({
              message: 'The Strategist has been added successfuly.',
              duration: 3000,
              position: 'middle'
            });
            toast.present();          
            this.dismiss();                       
          })
        }
      )

    }
     dismiss() {
    this.viewCtrl.dismiss();
  }


      }





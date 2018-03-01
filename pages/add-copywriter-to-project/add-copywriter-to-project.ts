import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';

/**
 * Generated class for the AddCopywriterToProjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-copywriter-to-project',
  templateUrl: 'add-copywriter-to-project.html',
})
export class AddCopywriterToProjectPage {
  copywriters : any;
  projectId: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public db:AngularFireDatabase, 
  public actionSheetCtrl: ActionSheetController,
  public toastCtrl: ToastController,
  public viewCtrl: ViewController) {
    this.initializeCopywriters();
    //Get project ID from navParams
    this.projectId = navParams.get('projectId');
        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCopywriterToProjectPage');
  }

  initializeCopywriters(){
    this.db.list('users'
    , {
          query:{
            orderByChild: 'role',
            equalTo: 'copywriter'
          }
      }
      ).subscribe(copywritersSnap=>{
        this.copywriters = copywritersSnap;
        console.log(this.copywriters);
      });
  };
      
  getCopywriters(ev:any) {
      // Reset items back to all of the items
      this.initializeCopywriters();

      // this.db.list('copywriters').$ref.on('value', copywritersSnap=> {
      
      //   this.copywriters = copywritersSnap.val();
      
        // set val to the value of the ev target
        var val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.copywriters = this.copywriters.filter((item:any) => {
            console.log(val);
            
            console.log(item);
            return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
  //    });
      
    }


    copywriterClicked(copywriter:any){
          let actionSheet = this.actionSheetCtrl.create({
            title: 'Add this Copywriter to project?',
            buttons: [
              {
                text: 'Yes, add copywriter',
                handler: () => {
                  this.addCopywriterToProject(copywriter);
                }
              },{
                text: 'View Copywriter Profile',
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

    addCopywriterToProject(copywriterId:any){
      //Update the project and copywriter profile
      //Show toast success
      //go back to project
      console.log(copywriterId);
      console.log(this.projectId);
      this.db.object('projects/'+this.projectId).update({'copywriter':copywriterId}).then(
        _ => {
          this.db.list('users/'+copywriterId+'/projects').push(this.projectId).then(_=>{
            let toast = this.toastCtrl.create({
              message: 'The Copywriter has been added successfuly.',
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





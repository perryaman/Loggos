import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';

/**
 * Generated class for the AddDesignerToProjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-designer-to-project',
  templateUrl: 'add-designer-to-project.html',
})
export class AddDesignerToProjectPage {
  designers : any;
  projectId: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public db:AngularFireDatabase, 
  public actionSheetCtrl: ActionSheetController,
  public toastCtrl: ToastController,
  public viewCtrl: ViewController) {
    this.initializeDesigners();
    //Get project ID from navParams
    this.projectId = navParams.get('projectId');
        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDesignerToProjectPage');
  }

  initializeDesigners(){
    this.db.list('users'
    , {
          query:{
            orderByChild: 'role',
            equalTo: 'designer'
          }
      }
      ).subscribe(designersSnap=>{
        this.designers = designersSnap;
        console.log(this.designers);
      });
  };
      
  getDesigners(ev: any) {
      // Reset items back to all of the items
      this.initializeDesigners();

      // this.db.list('designers').$ref.on('value', designersSnap=> {
      
      //   this.designers = designersSnap.val();
      
        // set val to the value of the ev target
        var val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.designers = this.designers.filter((item:any) => {
            console.log(val);
            
            console.log(item);
            return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
  //    });
      
    }


    designerClicked(designer:any){
          let actionSheet = this.actionSheetCtrl.create({
            title: 'Add this Designer to project?',
            buttons: [
              {
                text: 'Yes, add designer',
                handler: () => {
                  this.addDesignerToProject(designer);
                }
              },{
                text: 'View Designer Profile',
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

    addDesignerToProject(designerId: any){
      //Update the project and designer profile
      //Show toast success
      //go back to project
      console.log(designerId);
      console.log(this.projectId);
      this.db.object('projects/'+this.projectId).update({'designer':designerId}).then(
        _ => {
          this.db.list('users/'+designerId+'/projects').push(this.projectId).then(_=>{
            let toast = this.toastCtrl.create({
              message: 'The Designer has been added successfuly.',
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





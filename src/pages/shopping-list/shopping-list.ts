import {Component} from '@angular/core';
import { NavController, NavParams, ActionSheetController} from 'ionic-angular';
import {AddShoppingPage} from '../add-shopping/add-shopping'
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {ShoppingItem} from "../../model/shoppingItem/shoppingItemInterface";
import {EditShoppingItemPage} from "../edit-shopping-item/edit-shopping-item";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppinListRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database: AngularFireDatabase,
             // private actionSheet: ActionSheet,
              private actionSheetCtrl: ActionSheetController) {
//point shoppinglistRef$ at firebase -> "shopping-list" node.Not only can we push data but also have acces to the data.
    this.shoppinListRef$ = this.database.list('shopping-list');

    this.shoppinListRef$.subscribe(x => console.log(x));

  }

  selectShoppingItem(shoppingItem: ShoppingItem) {
    /*
    * display an actionsheet that gives the user the following options
    * edit the shoppingItem
    * delete the shoppingItem
    * cancel the selection*/
    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons:[
        {
          text: "Edit",
          handler: () => {
          //sent user to the the editShoppingItemPage and pass the ke as a parameter
            this.navCtrl.push(EditShoppingItemPage,{shoppingItemId: shoppingItem.$key})
          }
        },
        {
          text:'Delete',
          role: 'destructive',
          handler: ()=> {
           // delete the current shoppingItem passed in via parameter
            this.shoppinListRef$.remove(shoppingItem.$key)
          }
        },
        {
          text: 'cancel',
          role: 'cancel',
          handler: () => {
            console.log("User selected cancel button")
          }
        }
      ]
    }).present();
  }

  navigateToAddShoppingPage() {
    this.navCtrl.push(AddShoppingPage)

  }
}

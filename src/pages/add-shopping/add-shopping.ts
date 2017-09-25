import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ShoppingItem} from "../../model/shoppingItem/shoppingItemInterface";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

/**
 * Generated class for the AddShoppingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {
//creating a new object
  shoppingItem = {}  as ShoppingItem;

  shoppingItemRef$: FirebaseListObservable<ShoppingItem []>

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
this.shoppingItemRef$ = this.database.list('shopping-list')
    /*
    * */
  }
  /*
    * creating a new anonymous object and convert itemNumber to a number
    * push this to our firebase database under the "shopping-list" node*/

  addShoppingItem(shoppingItem: ShoppingItem) {
  this.shoppingItemRef$.push({
    itemName : this.shoppingItem.itemName,
    itemNumber: Number(this.shoppingItem.itemNumber)
  });
  //reset shoppingItem
    this.shoppingItem = {} as ShoppingItem;

    // navigate user back to the shoppingListPage
    this.navCtrl.pop();
  }
}

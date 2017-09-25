import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database";
import {ShoppingItem} from "../../model/shoppingItem/shoppingItemInterface";
import {Subscription} from "rxjs/Subscription";

/**
 * Generated class for the EditShoppingItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItemSubscription: Subscription;
  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database: AngularFireDatabase) {

    //capture the shoppingItemId as a navParameter
    const shoppingItemId = this.navParams.get('shoppingItemId')

    //log out the navParam
    console.log(shoppingItemId)

    //set the scope of firebase object equal to the selected item
    this.shoppingItemRef$ = this.database.object(`shopping-list/${shoppingItemId}`);

    //subscribe to the object and assign the results to this.shoppingItem
    this.shoppingItemSubscription = this.shoppingItemRef$
      .subscribe(shoppingItem => this.shoppingItem = shoppingItem);
  }

  editShoppingItem(shoppingItem: ShoppingItem) {
    //update firebase node with the new data
    this.shoppingItemRef$.update(shoppingItem);
    //send user back to shopping list
    this.navCtrl.pop();

  }
ionViewWillLeave(){
    // unsubscribe from observable  once leaving the view
    this.shoppingItemSubscription.unsubscribe()
}
}

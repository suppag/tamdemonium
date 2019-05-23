import { Component, OnInit } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { Router } from "@angular/router";
import { NgFlashMessageService } from "ng-flash-messages";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  items: any;
  quantity: number = 1;
  subtotal: number;
  totalitems: number;
  total: number;
  products: any;
  totalQty: any;
  totalPrice: any;
  oldCart: {};
  subTotalAmount: any;
  oldTotal: any;
  constructor(
    private router: Router,
    private _cartService: CartService,
    private _ngFlashMessageService: NgFlashMessageService
  ) {}

  ngOnInit() {
    this.items = this._cartService.getOrderFromItems();

    if (this.items == null) {
      this._ngFlashMessageService.showFlashMessage({
        messages: ["Please add some products to the cart"],
        type: "danger"
      });
      this.subtotal = 0;
      this.total = 0;
      this.totalitems = 0;
    } else {
      this.totalitems = this.items.length;

      var sbttl = this.getTotal();
      this.subtotal = parseFloat(sbttl.toFixed(2));
      var finalTotal = this.subtotal.toFixed(2);
      this.oldTotal = parseFloat(finalTotal) + 6.94;
      this.total = this.oldTotal.toFixed(2);
    }
  }
  getTotal() {
    let subTotal = 0;
    for (var i = 0; i < this.items.length; i++) {
      subTotal = subTotal + this.items[i]["price"];
      this.subTotalAmount = subTotal;
    }
    return subTotal;
  }
  removeProduct(i) {
    if (i > -1) {
      this.items.splice(i, 1);
    }
    this.totalitems = this.items.length;
    this.subtotal = this.getTotal();
    var finalTotal = this.subtotal.toFixed(2);
    this.total = parseFloat(finalTotal) + 6.94;
    this._cartService.updateItemsInOrder(this.items);
    this.router.navigate(["/cart"]);
  }

  itemslenth() {
    if (this.items.length == null || this.items.length == 0) {
      return false;
    } else return true;
  }
  
  checkout() {
    if (this.items.length == null || this.items.length == 0) {
      this._ngFlashMessageService.showFlashMessage({
        messages: ["Please add some items to the cart"],
        type: "danger"
      });
    } else {
      this._cartService.storeTotal(this.total);
      this.router.navigate(["/checkout"]);
    }
  }
}

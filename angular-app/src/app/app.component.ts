import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ProductService } from './services/product.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthService } from './services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
declare var Stripe: any;
declare var pendo: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PPM- Product Project Management';

  userID;
    user;
    email;
    orders;
    constructor(
      public toastr: ToastrManager,
      private _route: ActivatedRoute,
      private _productService: ProductService,
      private _authService: AuthService,
      private _router: Router
    ) {console.log("poop")}
  
    ngOnInit() {
      console.log("authservice ngOnIt");

        this._authService.getProfile().subscribe(
        profile => {
          console.log("user logged in?", profile.user);
          this.user = profile.user;
          let email = this.user.email;
          let obs = this._authService.getOrdersByEmail(email);
          obs.subscribe(orders => {
            this.orders = orders;
          });
          // Should rap this up in an if statement...so if the user doesn't log in 
          console.log("about to pendo.ini")
          if(this.user){
            pendo.initialize({
            visitor: {
                id:              this.user._id,  // Required if user is logged in
                // email:        // Optional
                // role:         // Optional
  
                // You can add any additional visitor level key-values here,
                // as long as it's not one of the above reserved names.
            },
  
            account: {
                Admin:           this.user.isAdmin,// Highly recommended
                // name:         // Optional
                // planLevel:    // Optional
                // planPrice:    // Optional
                // creationDate: // Optional
  
                // You can add any additional account level key-values here,
                // as long as it's not one of the above reserved names.
            }
            
        });
      }else{
        console.log("skipping pendo ini");
        }},
        err => {
          console.log(err);
          return false;
        }
      );
    }
  


  }

  
  
  



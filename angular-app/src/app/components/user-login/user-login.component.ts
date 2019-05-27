import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { ProductService } from '../../services/product.service';
declare var pendo: any;
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  email: String;
  password: String;
  constructor(
    private _router: Router,
    private _validateService: ValidateService,
    private _authService: AuthService,
    private _ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
    
  }
  userLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password
    }
    this._authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this._authService.storeUserData(data.token, data.user);
        this._ngFlashMessageService.showFlashMessage({
          messages: ["you are now logged in!"],
          type: 'success'
        });

        console.log('data.user', data.user);
        pendo.initialize({
          visitor: {
              id:              data.user.id  // Required if user is logged in
              // email:        // Optional
              // role:         // Optional

              // You can add any additional visitor level key-values here,
              // as long as it's not one of the above reserved names.
          },

          account: {
              // Admin:           data.user,// Highly recommended
              // name:         // Optional
              // planLevel:    // Optional
              // planPrice:    // Optional
              // creationDate: // Optional

              // You can add any additional account level key-values here,
              // as long as it's not one of the above reserved names.
          }
      });
        this._authService.loggedIn();
        var test = this._authService.loggedIn();
        console.log("user logged in", test);
    //     pendo.initialize({
    //     visitor: {
    //         id:              data.user._id,  // Required if user is logged in
    //         // email:        // Optional
    //         // role:         // Optional

    //         // You can add any additional visitor level key-values here,
    //         // as long as it's not one of the above reserved names.
    //     },

    //     account: {
    //         id:           'ACCOUNT-UNIQUE-ID' // Highly recommended
    //         // name:         // Optional
    //         // planLevel:    // Optional
    //         // planPrice:    // Optional
    //         // creationDate: // Optional

    //         // You can add any additional account level key-values here,
    //         // as long as it's not one of the above reserved names.
    //     }
    // });
        this._router.navigate(['dashboard']);
        

        
      } else {
        this._ngFlashMessageService.showFlashMessage({
          messages:['Invalid Login Credentials'],
          type: 'danger'

        });
        // 
        

        
        this._router.navigate(['login']);
      }
    });
  }
}

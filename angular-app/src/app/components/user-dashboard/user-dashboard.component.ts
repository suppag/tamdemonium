import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.css"]
})
export class UserDashboardComponent implements OnInit {
  userID;
  user;
  email;
  orders;
  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._authService.getProfile().subscribe(
      profile => {
        this.user = profile.user;
        let email = this.user.email;
        let obs = this._authService.getOrdersByEmail(email);
        obs.subscribe(orders => {
          this.orders = orders;
        });
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }
  getOrdersByEmailFromService() {
    this.email = this.user;
    let obs = this._authService.getOrdersByEmail(this.email);
    obs.subscribe(orders => {
      this.orders = orders;
    });
    
    
  }
  stringAsDate(dateStr: string) {
    return new Date(dateStr);
  }
}

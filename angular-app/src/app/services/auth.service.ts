import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { map } from "rxjs/operators";
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: any;
  user: any;
  // pendo:any

  constructor(private http: Http, private _http: HttpClient) {}

  // registerUser(user) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('users/register', user, { headers: headers })
  //     .pipe(map(res => res.json())
  //     )
  // }
  registerUser(user) {
    return this._http.post("users/register", user);
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("users/authenticate", user, { headers: headers })
      .pipe(map(res => res.json()));
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append("Authorization", this.authToken);
    headers.append("Content-Type", "application/json");
    return this.http
      .get("users/profile", { headers: headers })
      .pipe(map(res => res.json()));
  }

  storeUserData(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    console.log(this.authToken)
    this.user = user;
    console.log("pendo_ini")
  //   this.pendo.initialize({
  //     visitor: {
  //         id:              this.authToken.token,  // Required if user is logged in
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
}

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
    console.log(localStorage.token);
  //   pendo.initialize({
  //     visitor: {
  //         id:              this.authToken.token,  // Required if user is logged in
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
  }

  loggedIn() {
    if (localStorage.id_token == undefined) {
      return false;
    }
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(localStorage.id_token);
    
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getAllUsers() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get("users/all", { headers: headers })
      .pipe(map(res => res.json()));
  }

  getUserById(id) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get("users/user/" + id, { headers: headers })
      .pipe(map(res => res.json()));
  }

  deleteAUser(id) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    console.log("Delete a product Service");
    return this.http
      .delete("users/destroy/" + id, { headers: headers })
      .pipe(map(res => res.json()));
  }

  editUser(id, data) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    console.log("Edit a product Service");
    return this.http
      .put("users/edit/" + id, data, { headers: headers })
      .pipe(map(res => res.json()));
  }

  getOrdersByEmail(id) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get("orders/orders/" + id, { headers: headers })
      .pipe(map(res => res.json()));
  }
}

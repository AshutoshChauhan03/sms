import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3000/auth/';
  constructor(private _http: HttpClient, private _global: GlobalService) { }

  signIn(user: User) {
    return this._http.post(this.url+'signin', user);
  }

  verifyToken(token: any) {
    return this._http.post(this.url+'session', token)
  }
  
  loggedIn() {
    return this._global.loggedIn.value;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  sendOTP(reqbody: any) {
    return this._http.post(this.url+ "forgotpassword", reqbody)    
  }

  resetPassword(reqbody: any, id:any) {
    return this._http.patch(`${this.url}resetpassword/id/${id}`, reqbody)    
  }

  checkAdminStatus() {
    return this._http.get(this.url + 'adminstatus');
  }
}

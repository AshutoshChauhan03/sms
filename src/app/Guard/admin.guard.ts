import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../log-in/auth.service';
import { CustomSnackBarService } from '../services/custom-snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private _auth: AuthService, 
    private _customSnack: CustomSnackBarService
  ) {}

  canActivate(): boolean{
    if(this._auth.checkAdminStatus()) {
      console.log("HE");
      
      return true
    }
    else {
      this._customSnack.open('Permission Denied !', 'Failed');
      return false
    }
  }
  
}

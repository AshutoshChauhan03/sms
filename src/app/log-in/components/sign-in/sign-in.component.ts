import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { User } from '../../user';
import { GlobalService } from 'src/app/services/global.service';
import { CustomSnackBarService } from 'src/app/services/custom-snack-bar.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  adminStatus = false;
  user: any = new User();
  showPassword = false;

  ngOnInit(): void {
    this._globalService.adminStatus.subscribe((flag) => {
      this.adminStatus = flag;
    });
  }

  constructor(
    private _globalService: GlobalService,
    private _auth: AuthService,
    private route: Router,
    private snackBar: CustomSnackBarService
  ) {
    let token = localStorage.getItem('token')
    if (token) {
      this._auth.verifyToken(token).subscribe((data) => {
        if(Object.values(data)[0] == "true") {
          this._globalService.loggedIn.next(true);
          this._globalService.adminStatus.subscribe(flag => {
            if(flag)
              route.navigate(['/college'])
            else
              route.navigate(['/home'])
          })
        }
      });
    }
  }

  submitUserDetails(formRef: any) {
    this._globalService.loading.next(true);
    if (formRef.form.status == "VALID") {

      this.user.adminStatus = this.adminStatus;
      this._auth.signIn(this.user).subscribe(
        {
          next: async (data) => {
            this._globalService.loading.next(false);
            if (Object.keys(data)[0] == "token") {
              localStorage.setItem("token", Object.values(data)[0])
              localStorage.setItem("user", this.user.id)
              if(this.user.adminStatus)
                this.route.navigate(['/college'])
              else
                this.route.navigate(['/home'])
              this._globalService.loggedIn.next(true)
              this.snackBar.open("Logged In")
            }
            else if (Object.values(data)[0] == "User Doesn't Exists") {
              this.snackBar.open("User Doesn't Exists", 'Failed')
            }
            else {
              this.snackBar.open("Credential Failed !", 'Failed')
            }
          },
          error: (error) => {
            console.log(JSON.stringify(error))
           this._globalService.loading.next(false);
          }
        }
      );
    }
  }

  showPass() {
    this.showPassword = !this.showPassword;
  }

}

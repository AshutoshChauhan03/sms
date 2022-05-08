import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CustomSnackBarService } from 'src/app/services/custom-snack-bar.service';
import { AuthService } from '../../auth.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  detailsTrue = new BehaviorSubject(false) || false

  constructor(private _formBuilder: FormBuilder, private _auth:AuthService, private _customSnack: CustomSnackBarService) {    
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      id: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
    this.secondFormGroup = this._formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  sendEmail(stepper: MatStepper) {
    if(this.firstFormGroup.valid) {
      this._auth.sendOTP(this.firstFormGroup.value).subscribe((data: any)=> {
        if(Object.keys(data)[0] == "Success") {
          this._customSnack.open(`${Object.values(data)[0]}`)
          this.detailsTrue.next(true)
          stepper.next()
        }
        else {
            this._customSnack.open(`${Object.values(data)[0]}`)
        }
      })
    }
    else {
      console.log("invalid form submission");
    }
  }

  resetPassword(stepper : MatStepper) {
    if(!this.secondFormGroup.valid)
      return;
    else {
      this._auth.resetPassword(this.secondFormGroup.value, Object.values(this.firstFormGroup.value)[0]).subscribe(data => {
        console.log(data);
        if(Object.values(data)[0] == "OTP not verified") {
          this._customSnack.open(`${Object.values(data)[0]}`)
        }
        else {
          console.log("here");
          
          this._customSnack.open(`${Object.values(data)[0]}`)
          stepper.next()
        }
      });

    }
  }
}

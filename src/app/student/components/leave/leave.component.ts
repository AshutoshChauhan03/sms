import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CustomSnackBarService } from 'src/app/services/custom-snack-bar.service';
import { GlobalService } from 'src/app/services/global.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {

  stepperOrientation: Observable<StepperOrientation>;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  today: Date = new Date();
  minDate = "";
  startDate = new BehaviorSubject("");
  allLeaves: any;

  constructor(private _formBuilder: FormBuilder, private _customSnackbar: CustomSnackBarService, private _global: GlobalService, private _studentService: StudentService) {
    this.minDate = `${this.today.getFullYear()}-${(this.today.getMonth()+1).toString().padStart(2, "0")}-${(this.today.getDate()).toString().padStart(2, "0")}`
    this.startDate.next(this.minDate)

    this.stepperOrientation = _global.breakPoint.pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

    this._studentService.getLeave(localStorage.getItem('user')).subscribe((data)=> {
      this.allLeaves = data;
    });
  }

  changeStartDate() {
    this.startDate.next(this.secondFormGroup.controls['secondCtrlOne'].value);
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', [Validators.required, Validators.minLength(10)]],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrlOne: ['', [Validators.required]],
      secondCtrlTwo: ['', Validators.required],
    });
  }

  onSubmit(stepper: MatStepper) {
    if(this.firstFormGroup.valid && this.secondFormGroup.valid) {
      let leaveBody = {
        reason: this.firstFormGroup.controls['firstCtrl'].value,
        start: this.secondFormGroup.controls['secondCtrlOne'].value,
        end: this.secondFormGroup.controls['secondCtrlTwo'].value
      }
    
      this._studentService.postLeave(leaveBody, localStorage.getItem('user')).subscribe(data => {
        if(Object.values(data)[0] === "Successful") {
          this._customSnackbar.open('Leave Applied')
          this._studentService.getLeave(localStorage.getItem('user')).subscribe((data)=> {
            this.allLeaves = data;
          });
          stepper.next()
        }
        else{
          this._customSnackbar.open('Unable to apply !', 'Error')
          stepper.previous()
        }
      })
    }
  }

  deleteLeave(_id: any) {
    this._studentService.deleteLeave(localStorage.getItem('user'), _id).subscribe((data:any)=>{
      this._customSnackbar.open(data.msg)
        this._studentService.getLeave(localStorage.getItem('user')).subscribe((data)=> {
        this.allLeaves = data;
      });
    });
  }
}

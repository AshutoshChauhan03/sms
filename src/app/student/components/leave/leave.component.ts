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
  styleUrls: ['./leave.component.scss'],
})
export class LeaveComponent implements OnInit {
  stepperOrientation: Observable<StepperOrientation>;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  today: Date = new Date();
  minDate = '';
  startDate = new BehaviorSubject('');
  allLeaves: any;
  openView = new BehaviorSubject(false);
  displayApplication = false;
  imageUrl: any;
  loading = false;
  submitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _customSnackbar: CustomSnackBarService,
    private _global: GlobalService,
    private _studentService: StudentService
  ) {
    this.minDate = `${this.today.getFullYear()}-${(this.today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${this.today.getDate().toString().padStart(2, '0')}`;
    this.startDate.next(this.minDate);

    this.stepperOrientation = _global.breakPoint.pipe(
      map(({ matches }) => (matches ? 'horizontal' : 'vertical'))
    );

    this._studentService
      .getLeave(localStorage.getItem('user'))
      .subscribe((data) => {
        this.allLeaves = data;
      });
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrlOne: ['', [Validators.required, Validators.minLength(10)]],
      firstCtrlTwo: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrlOne: ['', [Validators.required]],
      secondCtrlTwo: ['', Validators.required],
    });
  }

  changeStartDate() {
    this.startDate.next(this.secondFormGroup.controls['secondCtrlOne'].value);
  }

  clear() {
    this.firstFormGroup.controls['firstCtrlTwo'].reset();
  }

  view(imageName: string) {
    if (this.openView) {
      if (this.displayApplication) {
        this.displayApplication = false;
      } else {
        this.imageUrl = `http://localhost:3000/upload/${localStorage.getItem('user')}/application/${imageName}`;
        this.displayApplication = true;
      }
    }
  }

  download(imageName: string) {
    this._studentService
      .getFile(localStorage.getItem('user') || '', 'application', imageName)
      .subscribe((data) => {
        this.imageUrl = data;
        this.imageUrl =
          'http://localhost:3000/upload/ashuan03@gmail.com/application/image-1650203177604.png';
      });
  }

  uploadedPic() {
    this.openView.next(true);
  }

  onSubmit(stepper: MatStepper) {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      this.loading = true;
      this.submitted = true;
      const fd = new FormData();
      fd.append('file', this.firstFormGroup.controls['firstCtrlTwo'].value);
      fd.append('student_id', localStorage.getItem('user') || '');
      fd.append('typeOf', 'application');

      let imageName: String;

      this._studentService.uploadFile(fd).subscribe((data) => {
        if (Object.keys(data)[0] === 'msg') imageName = Object.values(data)[0];

        let leaveBody = {
          reason: this.firstFormGroup.controls['firstCtrlOne'].value,
          start: this.secondFormGroup.controls['secondCtrlOne'].value,
          end: this.secondFormGroup.controls['secondCtrlTwo'].value,
          creationDate: new Date().toDateString(),
          imageName: imageName,
        };

        this._studentService
          .postLeave(leaveBody, localStorage.getItem('user'))
          .subscribe((data) => {
            if (Object.values(data)[0] === 'Successful') {
              this._customSnackbar.open('Leave Applied');
              this._studentService
                .getLeave(localStorage.getItem('user'))
                .subscribe((data) => {
                  this.allLeaves = data;
                });
              stepper.next();
            } else {
              this._customSnackbar.open('Unable to apply !', 'Error');
              stepper.previous();
            }
            this.loading = false;
          });
      });
    }
  }

  deleteLeave(_id: any) {
    this._studentService
      .deleteLeave(localStorage.getItem('user'), _id)
      .subscribe((data: any) => {
        this._customSnackbar.open(data.msg);
        this._studentService
          .getLeave(localStorage.getItem('user'))
          .subscribe((data) => {
            this.allLeaves = data;
          });
      });
  }
}

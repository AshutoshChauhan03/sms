import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  studentDetails: any = {};

  constructor(private _http: HttpClient) {
    this._http.get("http://localhost:3000/students/details/" + localStorage.getItem('user')).subscribe(data => {
      this.studentDetails = data;
    })
  }

  ngOnInit(): void {
  }

}

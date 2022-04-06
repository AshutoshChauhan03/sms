import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private _http: HttpClient) { }

  postLeave(leaveBody: {}, student_Id: string | null) {
    const url = `http://localhost:3000/students/leave/${student_Id}`;
    console.log(url);
    console.log(leaveBody);
    return this._http.post(url, leaveBody)
  }
}

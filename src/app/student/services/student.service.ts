import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url = `http://localhost:3000/students/`;

  constructor(private _http: HttpClient) { }

  postLeave(leaveBody: {}, student_Id: string | null) {
    const url = this.url + `leave/${student_Id}`;

    return this._http.post(url, leaveBody)
  }

  getLeave(student_Id: string | null) {
    const url = this.url + `leave/${student_Id}`;
    return this._http.get(url)
  }

  deleteLeave(student_Id: string | null, _id: string) {
    const url = this.url + `leave/${student_Id}/${_id}`;
    return this._http.delete(url, {body: {_id}});
  }

  uploadFile(fd: FormData) {
    return this._http.post("http://localhost:3000/upload", fd);
  }

  getFile(student_id: string, typeOf: string, imageName: string) {
    return this._http.get(`http://localhost:3000/upload/${student_id}/${typeOf}/${imageName}`);
  }
}

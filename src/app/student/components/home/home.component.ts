import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

studentDetails: any = [[]];
sm: boolean = false;

  constructor(private _http: HttpClient) {
    
  }

  ngOnInit(): void {
    this._http.get("http://localhost:3000/students/details/" + localStorage.getItem('user')).subscribe(data => {
      let temp = Object.entries(data);
      
      this.studentDetails = temp.filter((data, index)=> {
        if(index!=0 && index!=20)
          return data;
        return;
      });
      
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if(event.target.innerWidth < 750)
      this.sm = true;
    else
      this.sm = false;
  }

}

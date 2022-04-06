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
name: String = "";
collegeId: String = "";

cards = [
  {
    head: 'Total Attendance Percent',
    icon: 'how_to_vote',
    value: '60 %'
  },
  {
    head: 'Dues / Paid / Balance to pay',
    icon: 'attach_money',
    value: '258896 /258896 /0'
  },
  {
    head: 'Company Visited/Placed Student',
    icon: 'location_city',
    value: '0/0'
  },
  {
    head: 'Total Carry/CGPA',
    icon: 'library_books',
    value: '0/8.45'
  },
]

  constructor(private _http: HttpClient) {
    
  }

  ngOnInit(): void {
    this._http.get("http://localhost:3000/students/details/" + localStorage.getItem('user')).subscribe(data => {
      let temp = Object.entries(data);
      
      this.studentDetails = temp.filter((data, index)=> {
        if(index!=0 && index!=21)
          return data;
        
        return;
      });
      
      this.name = this.studentDetails[0][1];
      this.collegeId = this.studentDetails[2][1];

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

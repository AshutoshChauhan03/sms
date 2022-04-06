import { Component, OnInit } from '@angular/core';

const ELEMENT_DATA: Object[] = [
  {position: 1, name: 'Software lifecycle', weight: 83, symbol: '100'},
  {position: 2, name: 'Engeneering Math', weight: 77, symbol: '100'},
  {position: 3, name: 'Machine Design', weight: 66, symbol: '100'},
  {position: 4, name: 'Opps with C++', weight: 88, symbol: '100'},
  {position: 5, name: 'Android Design', weight: 95, symbol: '100'},
  {position: 6, name: 'Partical One', weight: 67, symbol: '100'},
  {position: 7, name: 'Partical Two', weight: 77, symbol: '100'},
  {position: 8, name: 'Partical Three', weight: 87, symbol: '100'},
  {position: 9, name: 'Partical Four', weight: 95, symbol: '100'},
  {position: 10, name: 'Partical Five', weight: 68, symbol: '100'},
];

interface Semester {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-academics',
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.scss']
})
export class AcademicsComponent implements OnInit {
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  
  semesters: Semester[] = [
    {value: '1', viewValue: 'Semester 1'},
    {value: '2', viewValue: 'Semester 2'},
    {value: '3', viewValue: 'Semester 3'},
    {value: '4', viewValue: 'Semester 4'},
    {value: '5', viewValue: 'Semester 5'},
    {value: '6', viewValue: 'Semester 6'},
  ];
  
  constructor() {
     
  }
  
  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

const ELEMENT_DATA: Object[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-academics',
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.scss']
})
export class AcademicsComponent implements OnInit {

  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  
  public data = [
        {Franchise: "Marvel Universe All Films", TotalWorldBoxOfficeRevenue: 22.55, HighestGrossingMovieInSeries: 2.8 },
        {Franchise: "Star Wars",                 TotalWorldBoxOfficeRevenue: 10.32, HighestGrossingMovieInSeries: 2.07},
        {Franchise: "Harry Potter",              TotalWorldBoxOfficeRevenue: 9.19,  HighestGrossingMovieInSeries: 1.34},
        {Franchise: "Avengers",                  TotalWorldBoxOfficeRevenue: 7.76,  HighestGrossingMovieInSeries: 2.8 },
        {Franchise: "Spider Man",                TotalWorldBoxOfficeRevenue: 7.22,  HighestGrossingMovieInSeries: 1.28},
        {Franchise: "James Bond",                TotalWorldBoxOfficeRevenue: 7.12,  HighestGrossingMovieInSeries: 1.11}
    ];
  
  constructor() {
     
  }
  
  ngOnInit(): void {
  }

}

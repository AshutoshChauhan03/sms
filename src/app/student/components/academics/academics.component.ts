import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../services/student.service';

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

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

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
  
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;
    
  semesters: Semester[] = [
    {value: '1', viewValue: 'Semester 1'},
    {value: '2', viewValue: 'Semester 2'},
    {value: '3', viewValue: 'Semester 3'},
    {value: '4', viewValue: 'Semester 4'},
    {value: '5', viewValue: 'Semester 5'},
    {value: '6', viewValue: 'Semester 6'},
  ];
  allData: any;
  subject: [] = [];
  marks_obtained: {}[] = [{}];
  days_attended: {}[] = [{}];
  total_marks: {}[] = [{}]
  
  constructor(_studentService: StudentService) {
    _studentService.getAcademics().subscribe((data: any) => {
      this.allData = data;
      this.subject = data.subject;
      this.days_attended = data.days_attended;
      this.marks_obtained = data.marks_obtained;
      this.total_marks = data.total_marks;
    })

    this.chartOptions = {
      series: [
        {
          name: "Machine Design",
          data: [44, 55, 57, 56, 61, 58]
        },
        {
          name: "Engeneering Math",
          data: [76, 85, 88, 98, 87, 15]
        },
        {
          name: "Software lifecycle",
          data: [45, 41, 36, 28, 42, 58]
        },
        {
          name: "Opps with C++",
          data: [75, 41, 36, 26, 47, 68]
        },
        {
          name: "Android Design",
          data: [35, 45, 31, 86, 25, 88]
        }
      ],
      chart: {
        type: "bar",
        height: 425
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
      yaxis: {
        title: {
          text: "% (Attendance)"
        }
      },
      fill: {
        opacity: .85
      },
      tooltip: {
        y: {
          formatter: function(val: any) {
            return val + "% (Attendance)";
          }
        }
      }
    };

  }
  
  ngOnInit(): void {
  }



}

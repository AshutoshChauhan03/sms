import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../services/student.service';

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
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-academics',
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.scss']
})
export class AcademicsComponent {
  
  displayedColumns: string[] = ['position', 'subject', 'marks', 'total'];
  dataSource : any;
  
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;

  selectedSemester = 1;
    
  semesters: Semester[] = [
  ];
  
  allData: any;
  subject: [] = [];
  marks_obtained: {}[] = [{}];
  days_attended: {}[] = [{}];
  total_marks: {}[] = [{}]
  ELEMENT_DATA: Object[] = [];
  
  loading = true;

  constructor(public _studentService: StudentService) {
    _studentService.getAcademicsSemData(this.selectedSemester).subscribe((data: any) => {
      this.allData = data;
      this.subject = data.subject;
      this.days_attended = data.days_attended;
      this.marks_obtained = data.marks_obtained;
      this.total_marks = data.total_marks;

      this.prepareTableDataFormat(data);
    })

    _studentService.getAcademics().subscribe((data: any) => {
      let max = 0;
      data.forEach((element: any) => {
        if(max < element.semester)
        max = element.semester
      });
      
      this.semesters = [];
      for(let i=1; i<=max; i++)
        this.semesters.push({value: i, viewValue: `Semester ${i}`})
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

  prepareTableDataFormat(data: any) {
    this.ELEMENT_DATA = []
    for(let i=0; i<data.marks_obtained.length; i++) {
      this.ELEMENT_DATA.push({
        position: i+1,
        subject: Object.keys(data.marks_obtained[i])[0],
        marks: Object.values(data.marks_obtained[i])[0],
        total: Object.values(data.total_marks[i])[0]
      })
    }
    
    this.dataSource = this.ELEMENT_DATA;
    
  }


  switchSemesterResult(e: any) {
    this._studentService.getAcademicsSemData(this.selectedSemester).subscribe((data: any) => {
      if(!data.msg)  
        this.prepareTableDataFormat(data);
      else
        this.dataSource = []        
    })
  }


}

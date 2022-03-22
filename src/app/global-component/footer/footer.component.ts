import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  // Some custom properties
  @Input()
  color = "#124559";
  @Input()
  title = "@ Sample Public School";
  
  @ViewChild("footer")
  footer!: ElementRef;  
  @ViewChild("span")
  span!: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.footer.nativeElement.style.backgroundColor = this.color;    
    this.span.nativeElement.innerHTML = this.title;
  }
}

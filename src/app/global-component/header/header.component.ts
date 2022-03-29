import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef, HostListener, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CustomSnackBarService } from 'src/app/services/custom-snack-bar.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Custom properties
  @Input()
  color!: string;
  @Input()
  height!: string;
  @ViewChild("header")
  header!: any;
  
  loggedIn = false;
  loggedInUserName!: any;
  adminActive: boolean = false;
  
  // emit true if admin is active
  @Output()
  active: EventEmitter<boolean> = new EventEmitter<boolean>();

  navbarOpened = false;
  showHam = false;

  constructor(private _globalService: GlobalService, private router: Router, private snackBar: CustomSnackBarService) { 
    _globalService.loggedIn.subscribe(data=> {
      this.loggedIn = data
      if(this.loggedIn)
        this.loggedInUserName = localStorage.getItem('user');
    })

    if(window.innerWidth < 750)
      this.showHam = true;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.header._elementRef.nativeElement.style.backgroundColor = this.color;
    this.header._elementRef.nativeElement.style.height = `${this.height}px`;
  }

  toggleNavbar(){this.navbarOpened=!this.navbarOpened}

  toggleActive() {
    this.adminActive = !this.adminActive;
    this.active.emit(this.adminActive);
    this._globalService.adminStatus.next(this.adminActive);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._globalService.loggedIn.next(false)
    this.snackBar.open('Logged out !', 'success');
    this.router.navigate(['/signin'])
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this._globalService.screenWidth.next(event.target.innerWidth);
    if(event.target.innerWidth < 800) {
      this.showHam = true;
    }
    else {
      this.navbarOpened=false;
      this.showHam = false;
    }
  }
}


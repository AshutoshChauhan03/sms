import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef, HostListener, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CustomSnackBarService } from 'src/app/services/custom-snack-bar.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(250, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {

  loggedIn = false;
  loggedInUserName!: any;
  adminActive: boolean = false;

  @Output()
  adminActiveEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  expandedNavbar = false;
  showHam = false;

  constructor(private _globalService: GlobalService, private router: Router, private snackBar: CustomSnackBarService) {
    _globalService.loggedIn.subscribe(data => {
      this.loggedIn = data
      if (this.loggedIn)
        this.loggedInUserName = localStorage.getItem('user');
    })

    if (window.innerWidth < 750)
      this.showHam = true;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  indexPageNavigate() {
    if (this.adminActive) {
      return '/college'
    }
    else {
      return '/home'
    }
  }

  expandNavbar() { this.expandedNavbar = !this.expandedNavbar }

  toggleActive() {
    this.adminActive = !this.adminActive;
    this.adminActiveEmitter.emit(this.adminActive);
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
    if (event.target.innerWidth < 800) {
      this.showHam = true;
    }
    else {
      this.expandedNavbar = false;
      this.showHam = false;
    }
  }
}


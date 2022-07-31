import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  adminStatus = new BehaviorSubject(false);
  loggedIn = new BehaviorSubject(false);
  screenWidth = new BehaviorSubject(window.outerWidth);
  breakPoint: Observable<BreakpointState>;
  loading = new BehaviorSubject(false);

  constructor(breakpointObserver: BreakpointObserver) {
    // active listening to screen width
    this.breakPoint = breakpointObserver.observe('(min-width: 650px)')
  }


}

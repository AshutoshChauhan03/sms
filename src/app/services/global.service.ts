import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  adminStatus = new BehaviorSubject(false);
  loggedIn = new BehaviorSubject(false);

  constructor() {
      
  }


}

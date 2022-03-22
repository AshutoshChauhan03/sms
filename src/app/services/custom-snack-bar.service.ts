import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  public open(message: string, action='Success', duration=3000) {
    this.snackBar.open(message, action, {
      duration,
      panelClass: 'my-custom-snackbar'
    })
  }
}

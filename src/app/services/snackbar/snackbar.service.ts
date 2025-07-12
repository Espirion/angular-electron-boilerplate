import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';

// snackbar.service.ts
@Injectable({ providedIn: 'root' })
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  async show(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info'
  ) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message, type },
      duration: 3000,
      panelClass: ['custom-snackbar', type + '-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}

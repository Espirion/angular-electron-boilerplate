import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { ElectronService } from '../electron/electron.service';

// snackbar.service.ts
@Injectable({ providedIn: 'root' })
export class SnackbarService {
  constructor(
    private snackBar: MatSnackBar,
    private electronService: ElectronService
  ) {}

  async show(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info'
  ) {
    const snackBarSettings = await this.electronService.getSnackBarSettings();
    console.log('🚀 ~ SnackbarService ~ snackBarSettings:', snackBarSettings);
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message, type },
      duration: 3000,
      panelClass: ['custom-snackbar', type + '-snackbar'],
      horizontalPosition: snackBarSettings.horizontalPosition,
      verticalPosition: snackBarSettings.verticalPosition,
    });
  }
}

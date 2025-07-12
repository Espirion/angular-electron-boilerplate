import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { ElectronService } from '../electron/electron.service';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  public snackBarSettings: any;

  constructor(
    private snackBar: MatSnackBar,
    private electronService: ElectronService
  ) {}

  async show(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info'
  ) {
    this.snackBarSettings = await this.getSnackBarSettings();
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message, type },
      duration: 300000,
      panelClass: ['custom-snackbar', type + '-snackbar'],
      horizontalPosition: this.snackBarSettings.horizontalPosition,
      verticalPosition: this.snackBarSettings.verticalPosition,
    });
  }

  async updateSnackBarSettings(snackBarSettings: {
    horizontalPosition: string;
    verticalPosition: string;
  }) {
    await this.electronService.setSnackBarSettings(snackBarSettings);
    this.snackBarSettings = await this.getSnackBarSettings();
  }

  async getSnackBarSettings(): Promise<any> {
    return this.electronService.getSnackBarSettings();
  }
}

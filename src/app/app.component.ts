import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { SnackbarService } from './services/snackbar/snackbar.service';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  title = 'angular-electron-boilerplate';
  settings = {};

  constructor(public snackbarService: SnackbarService) {}

  ngOnInit() {}

  showNotification(
    type: 'success' | 'error' | 'info' | 'warning' = 'success'
  ): void {
    this.snackbarService.show('Settings saved!', type);
  }

  updateSnackBarSettings() {
    const newSnackBarSettings = {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    };
    this.snackbarService.updateSnackBarSettings(newSnackBarSettings);
  }
}

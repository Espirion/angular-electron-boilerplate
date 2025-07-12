import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { SnackbarService } from './services/snackbar/snackbar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-electron-boilerplate';
  settings = {};

  constructor(
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {}

  showNotification(
    type: 'success' | 'error' | 'info' | 'warning' = 'success'
  ): void {
    this.snackbarService.show('Settings saved!', type);
  }
}

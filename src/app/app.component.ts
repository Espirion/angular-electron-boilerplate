import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-electron-boilerplate';

  ngOnInit(): void {
    window.electronAPI.send('ping', 'Hello from Angular!');
    window.electronAPI.receive('pong', (data) => {
      console.log('Received:', data);
    });
  }
}

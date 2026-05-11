import { Component, signal } from '@angular/core';
import {  MainLayout} from './shared/presentation/layout/main-layout/main-layout';

@Component({
  selector: 'app-root',
  imports: [MainLayout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend-techwatch');
}

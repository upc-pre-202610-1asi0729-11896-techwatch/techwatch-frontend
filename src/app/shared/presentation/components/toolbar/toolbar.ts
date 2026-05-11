import { Component, signal } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-toolbar',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    RouterLinkActive,
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {
  options = signal([
    {link: '/home',                 label: 'Home'},
    {link: '/mangament/homes',      label: 'Homes'},
    {link: '/mangament/devices',    label: 'Devices'}
  ]);
}

import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import {IamStore} from '../../../../iam/application/iam-store';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, MatButtonModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  readonly iamStore = inject(IamStore);
  private readonly router = inject(Router);

  logout(): void {
    this.iamStore.logout();
    this.router.navigate(['/iam/login']);
  }
}

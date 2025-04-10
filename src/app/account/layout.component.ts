import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Needed for <router-outlet>

import { AccountService } from '../_services';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  imports: [
    CommonModule,
    RouterModule // ✅ This fixes the 'router-outlet' error
  ]
})
export class LayoutComponent {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
    // redirect to home if already logged in
    if (this.accountService.accountValue) {
      this.router.navigate(['/']);
    }
  }
}

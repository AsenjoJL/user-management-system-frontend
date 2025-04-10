import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

import { AccountService, AlertService } from '../_services';

enum EmailStatus {
  Verifying,
  Failed
}

@Component({
  standalone: true,
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  imports: [CommonModule]
})
export class VerifyEmailComponent implements OnInit {
  EmailStatus = EmailStatus;
  emailStatus = EmailStatus.Verifying;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParams['token'];

    if (!token) {
      this.emailStatus = EmailStatus.Failed;
      return;
    }

    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

    this.accountService.verifyEmail(token)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Verification successful, you can now login', { keepAfterRouteChange: true });
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: () => {
          this.emailStatus = EmailStatus.Failed;
        }
      });
  }
}
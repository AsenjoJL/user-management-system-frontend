import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../_services';

enum EmailStatus {
  Verifying,
  Failed
}

@Component({ templateUrl: './verify-email.component.html' })
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

    // Check if token exists
    if (!token) {
      this.handleInvalidToken();
      return;
    }

    // Remove token from URL to prevent HTTP referer leakages
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

    // Verify the email
    this.accountService.verifyEmail(token)
      .pipe(first())
      .subscribe({
        next: () => this.handleSuccess(),
        error: (error) => this.handleError(error)
      });
  }

  private handleInvalidToken() {
    this.emailStatus = EmailStatus.Failed;
    this.alertService.error('Invalid or missing token.');
  }

  private handleSuccess() {
    this.alertService.success('Verification successful, you can now login', { keepAfterRouteChange: true });
    this.router.navigate(['../login'], { relativeTo: this.route });
  }

  private handleError(error: any) {
    console.error('Verification failed:', error); // Log the error for debugging
    this.emailStatus = EmailStatus.Failed;
    this.alertService.error('Verification failed. Please try again.');
  }
}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

import { AccountService, AlertService } from '../_services';
import { MustMatch } from '../_helpers';

@Component({
    selector: 'app-update',
    templateUrl: 'update.component.html',
    standalone: true,
    imports: [
        CommonModule,           // For *ngIf and ngClass
        ReactiveFormsModule    // For form directives
    ]
})
export class UpdateComponent implements OnInit {
    account: any;
    form!: FormGroup;
    loading = false;
    submitted = false;
    deleting = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.account = this.accountService.accountValue!;
        this.form = this.formBuilder.group({
            title: [this.account.title, Validators.required],
            firstName: [this.account.firstName, Validators.required],
            lastName: [this.account.lastName, Validators.required],
            email: [this.account.email, [Validators.required, Validators.email]],
            password: ['', [Validators.minLength(6)]],
            confirmPassword: ['']
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.update(this.account.id!, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    onDelete() {
        if (confirm('Are you sure you want to delete your account?')) {
            this.deleting = true;
            this.accountService.delete(this.account.id!)
                .pipe(first())
                .subscribe({
                    next: () => {
                        this.alertService.success('Account deleted successfully');
                        this.router.navigate(['/account/login']);
                    },
                    error: error => {
                        this.alertService.error(error);
                        this.deleting = false;
                    }
                });
        }
    }
}
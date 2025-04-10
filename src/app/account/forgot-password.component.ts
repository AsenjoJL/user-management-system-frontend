import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ForgotPasswordComponent {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    // handle forgot password logic here
  }
}
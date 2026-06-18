import {Component, inject} from '@angular/core';
import {TitleCasePipe} from '@angular/common';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {MatFormFieldModule, MatError} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

import {IamStore} from '../../../application/iam-store';

@Component({
  selector: 'app-register',
  imports: [
    TitleCasePipe, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatError,
    MatInputModule, MatSelectModule, MatButtonModule, MatProgressSpinner,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly store = inject(IamStore);

  readonly plans = ['free', 'premium'] as const;

  form = this.fb.group({
    name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    email: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    password: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(6)]}),
    plan: new FormControl<string>('free', {nonNullable: true, validators: [Validators.required]}),
  });

  submit(): void {
    if (this.form.invalid) return;
    this.store.register(
      this.form.value.name!,
      this.form.value.email!,
      this.form.value.password!,
      this.form.value.plan!,
      () => this.router.navigate(['/management/properties']),
    );
  }
}

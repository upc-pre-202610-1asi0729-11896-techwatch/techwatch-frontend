import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {MatFormFieldModule, MatError} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

import {IamStore} from '../../../application/iam-store';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule, RouterLink, MatFormFieldModule, MatError,
    MatInputModule, MatButtonModule, MatProgressSpinner,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly store = inject(IamStore);

  form = this.fb.group({
    email: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    password: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(6)]}),
  });

  submit(): void {
    if (this.form.invalid) return;
    this.store.login(
      this.form.value.email!,
      this.form.value.password!,
      () => this.router.navigate(['/management/properties']),
    );
  }
}

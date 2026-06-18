import {Component, effect, inject, OnInit} from '@angular/core';
import {DatePipe, TitleCasePipe} from '@angular/common';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule, MatError} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

import {ProfileStore} from '../../../application/profile-store';
import {UserProfileEntity} from '../../../domain/model/user-profile.entity';

@Component({
  selector: 'app-profile-edit',
  imports: [
    DatePipe, TitleCasePipe, ReactiveFormsModule, MatFormFieldModule, MatError,
    MatInputModule, MatSelectModule, MatButtonModule, MatProgressSpinner,
  ],
  templateUrl: './profile-edit.html',
  styleUrl: './profile-edit.css',
})
export class ProfileEdit implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly store = inject(ProfileStore);

  readonly plans = ['free', 'premium'] as const;

  form = this.fb.group({
    name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    email: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    plan: new FormControl<string>('free', {nonNullable: true, validators: [Validators.required]}),
  });

  constructor() {
    effect(() => {
      const profile = this.store.profile();
      if (profile) {
        this.form.patchValue({
          name: profile.name,
          email: profile.email,
          plan: profile.plan,
        });
      }
    });
  }

  ngOnInit(): void {
    this.store.loadProfile();
  }

  submit(): void {
    const current = this.store.profile();
    if (this.form.invalid || !current) return;

    const profile = new UserProfileEntity({
      id: current.id,
      name: this.form.value.name!,
      email: this.form.value.email!,
      plan: this.form.value.plan!,
      createdAt: current.createdAt,
      subscription: current.subscription,
    });

    this.store.updateProfile(profile);
  }
}

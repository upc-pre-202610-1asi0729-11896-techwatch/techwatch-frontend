import {inject, Injectable, signal} from '@angular/core';
import {retry} from 'rxjs';

import {SessionStore} from '../../shared/application/session-store';
import {UserProfileEntity} from '../domain/model/user-profile.entity';
import {ProfileApi} from '../infrastructure/profile-api';

/**
 * Application store for the Profile context: the current user's profile data
 * and updates to their account information.
 */
@Injectable({
  providedIn: 'root',
})
export class ProfileStore {
  private readonly profileApi = inject(ProfileApi);
  private readonly session = inject(SessionStore);

  private readonly profileSignal = signal<UserProfileEntity | null>(null);
  readonly profile = this.profileSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  private readonly savingSignal = signal<boolean>(false);
  readonly saving = this.savingSignal.asReadonly();

  loadProfile(): void {
    const userId = this.session.userId;
    if (!userId) return;

    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.profileApi.getProfileByUserId(userId).pipe(retry(2)).subscribe({
      next: profile => {
        this.profileSignal.set(profile);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load profile'));
        this.loadingSignal.set(false);
      },
    });
  }

  updateProfile(profile: UserProfileEntity): void {
    this.savingSignal.set(true);
    this.errorSignal.set(null);
    this.profileApi.updateProfile(profile).pipe(retry(2)).subscribe({
      next: updated => {
        this.profileSignal.set(updated);
        this.savingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update profile'));
        this.savingSignal.set(false);
      },
    });
  }

  private formatError(error: unknown, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  }
}

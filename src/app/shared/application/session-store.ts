import {Injectable, signal} from '@angular/core';

/**
 * Holds session-scoped state that the rest of the app needs but that does not
 * belong to any single bounded context.
 *
 * The current user id is driven by the IAM context after sign-in. When no user
 * is authenticated, {@link userId} falls back to 1 for backward compatibility
 * with existing flows during development.
 */
@Injectable({
  providedIn: 'root',
})
export class SessionStore {
  private readonly userIdSignal = signal<number>(1);

  /** Current authenticated user id, or 1 when no session is active. */
  get userId(): number {
    return this.userIdSignal();
  }

  private readonly selectedPropertyIdSignal = signal<number | null>(null);
  /** Property currently in focus for analytics and simulation views. */
  readonly selectedPropertyId = this.selectedPropertyIdSignal.asReadonly();

  setUser(userId: number): void {
    this.userIdSignal.set(userId);
  }

  clearUser(): void {
    this.userIdSignal.set(1);
  }

  selectProperty(propertyId: number | null): void {
    this.selectedPropertyIdSignal.set(propertyId);
  }
}

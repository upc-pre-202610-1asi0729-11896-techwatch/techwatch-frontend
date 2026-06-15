import {Injectable, signal} from '@angular/core';

/**
 * Holds session-scoped state that the rest of the app needs but that does not
 * belong to any single bounded context.
 *
 * The IAM context does not exist yet in the backend, so the current user is
 * fixed to id 1. Once authentication is implemented this value will come from
 * the sign-in flow / JWT instead of being hard-coded.
 */
@Injectable({
  providedIn: 'root',
})
export class SessionStore {
  /** Current user id. Fixed until the IAM context is available. */
  readonly userId = 1;

  private readonly selectedPropertyIdSignal = signal<number | null>(null);
  /** Property currently in focus for analytics and simulation views. */
  readonly selectedPropertyId = this.selectedPropertyIdSignal.asReadonly();

  selectProperty(propertyId: number | null): void {
    this.selectedPropertyIdSignal.set(propertyId);
  }
}

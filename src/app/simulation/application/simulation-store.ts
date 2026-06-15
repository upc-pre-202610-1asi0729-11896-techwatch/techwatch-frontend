import {inject, Injectable, signal} from '@angular/core';

import {SessionStore} from '../../shared/application/session-store';
import {SimulationSessionEntity} from '../domain/model/simulation-session-entity';
import {SimulationApi} from '../infrastructure/simulation-api';
import {RecordDeviceActionRequest} from '../infrastructure/simulation-session-resource';

/**
 * Application store for the Simulation context: the active simulation session
 * of the current user (a user can only have one at a time).
 */
@Injectable({
  providedIn: 'root',
})
export class SimulationStore {
  private readonly simulationApi = inject(SimulationApi);
  private readonly session = inject(SessionStore);

  private readonly activeSessionSignal = signal<SimulationSessionEntity | null>(null);
  readonly activeSession = this.activeSessionSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  constructor() {
    this.loadActiveSession();
  }

  loadActiveSession(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.simulationApi.getActiveByUserId(this.session.userId).subscribe({
      next: session => {
        this.activeSessionSignal.set(session);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load active session'));
        this.loadingSignal.set(false);
      }
    });
  }

  startSession(propertyId: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.simulationApi.start(this.session.userId, propertyId).subscribe({
      next: session => {
        this.activeSessionSignal.set(session);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to start session'));
        this.loadingSignal.set(false);
      }
    });
  }

  recordAction(deviceId: number, actionType: string, durationMinutes: number): void {
    const session = this.activeSessionSignal();
    if (!session) return;
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    const body: RecordDeviceActionRequest = {
      deviceId,
      actionType,
      parameterName: null,
      parameterValue: null,
      durationMinutes,
    };
    this.simulationApi.recordAction(session.id, body).subscribe({
      next: updated => {
        this.activeSessionSignal.set(updated);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to record action'));
        this.loadingSignal.set(false);
      }
    });
  }

  endSession(): void {
    const session = this.activeSessionSignal();
    if (!session) return;
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.simulationApi.end(session.id).subscribe({
      next: () => {
        this.activeSessionSignal.set(null);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to end session'));
        this.loadingSignal.set(false);
      }
    });
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  }
}

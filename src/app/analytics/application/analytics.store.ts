import {computed, Injectable, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';
import {Consumption} from '../domain/model/consumption.entity';
import {AnalyticsApi} from '../infrastructure/analytics-api';
import {ManagementStore} from '../../management/aplication/mangament-store';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsStore {
  readonly totalKwh = computed(() =>
    Math.round(this.consumptions().reduce((sum, c) => sum + c.kwh, 0) * 100) / 100
  );

  readonly kwhByDevice = computed(() => {
    const map = new Map<number, number>();
    for (const c of this.consumptions()) {
      map.set(c.deviceId, (map.get(c.deviceId) ?? 0) + c.kwh);
    }
    return map;
  });

  private readonly consumptionsSignal = signal<Consumption[]>([]);
  readonly consumptions = this.consumptionsSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  constructor(
    private analyticsApi: AnalyticsApi,
    private managementStore: ManagementStore
  ) {
    this.loadConsumptions();
  }

  getDeviceName(deviceId: number): string {
    const device = this.managementStore.devices().find(d => d.id === deviceId);
    return device?.name ?? `Device #${deviceId}`;
  }

  addConsumption(consumption: Consumption): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.analyticsApi.createConsumption(consumption).pipe(retry(2)).subscribe({
      next: created => {
        this.consumptionsSignal.update(list => [...list, created]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create consumption'));
        this.loadingSignal.set(false);
      }
    });
  }

  private loadConsumptions(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.analyticsApi.getConsumptions().pipe(takeUntilDestroyed()).subscribe({
      next: consumptions => {
        this.consumptionsSignal.set(consumptions);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load consumptions'));
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

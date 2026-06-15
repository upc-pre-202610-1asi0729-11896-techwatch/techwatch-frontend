import {computed, inject, Injectable, signal} from '@angular/core';
import {retry} from 'rxjs';

import {SessionStore} from '../../shared/application/session-store';
import {ConsumptionMetric} from '../domain/model/consumption-metric.entity';
import {ConsumptionAlert} from '../domain/model/consumption-alert.entity';
import {ConsumptionReport} from '../domain/model/consumption-report.entity';
import {AnalyticsApi} from '../infrastructure/analytics-api';
import {GenerateReportRequest} from '../infrastructure/analytics-resources';

/**
 * Application store for the Analytics context: metrics and reports of the
 * selected property, and alerts of the current user.
 */
@Injectable({
  providedIn: 'root',
})
export class AnalyticsStore {
  private readonly analyticsApi = inject(AnalyticsApi);
  private readonly session = inject(SessionStore);

  private readonly metricsSignal = signal<ConsumptionMetric[]>([]);
  readonly metrics = this.metricsSignal.asReadonly();

  private readonly alertsSignal = signal<ConsumptionAlert[]>([]);
  readonly alerts = this.alertsSignal.asReadonly();

  private readonly reportsSignal = signal<ConsumptionReport[]>([]);
  readonly reports = this.reportsSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  readonly totalConsumption = computed(() =>
    Math.round(this.metrics().reduce((sum, m) => sum + m.value, 0) * 100) / 100
  );

  readonly unreadAlertCount = computed(() => this.alerts().filter(a => !a.isRead).length);

  readonly metricsByDevice = computed(() => {
    const map = new Map<number, number>();
    for (const metric of this.metrics()) {
      const key = metric.deviceId ?? 0;
      map.set(key, (map.get(key) ?? 0) + metric.value);
    }
    return map;
  });

  constructor() {
    this.loadAlerts();
  }

  loadMetrics(propertyId: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.analyticsApi.getMetricsByPropertyId(propertyId).pipe(retry(2)).subscribe({
      next: metrics => {
        this.metricsSignal.set(metrics);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load metrics'));
        this.loadingSignal.set(false);
      }
    });
  }

  loadReports(propertyId: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.analyticsApi.getReportsByPropertyId(propertyId).pipe(retry(2)).subscribe({
      next: reports => {
        this.reportsSignal.set(reports);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load reports'));
        this.loadingSignal.set(false);
      }
    });
  }

  loadAlerts(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.analyticsApi.getAlertsByUserId(this.session.userId).pipe(retry(2)).subscribe({
      next: alerts => {
        this.alertsSignal.set(alerts);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load alerts'));
        this.loadingSignal.set(false);
      }
    });
  }

  markAlertAsRead(alertId: number): void {
    this.analyticsApi.markAlertAsRead(alertId).subscribe({
      next: updated => this.alertsSignal.update(alerts => alerts.map(a => a.id === updated.id ? updated : a)),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to mark alert as read')),
    });
  }

  generateReport(propertyId: number, startDate: string, endDate: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    const request: GenerateReportRequest = {userId: this.session.userId, propertyId, startDate, endDate};
    this.analyticsApi.generateReport(request).subscribe({
      next: report => {
        this.reportsSignal.update(reports => [report, ...reports]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to generate report'));
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

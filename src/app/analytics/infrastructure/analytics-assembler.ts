import {ConsumptionMetric} from '../domain/model/consumption-metric.entity';
import {ConsumptionAlert} from '../domain/model/consumption-alert.entity';
import {ConsumptionReport} from '../domain/model/consumption-report.entity';
import {ReportItem} from '../domain/model/report-item.entity';
import {
  ConsumptionAlertResource,
  ConsumptionMetricResource,
  ConsumptionReportResource,
} from './analytics-resources';

export class AnalyticsAssembler {

  static toMetric(resource: ConsumptionMetricResource): ConsumptionMetric {
    return new ConsumptionMetric({
      id: resource.id,
      propertyId: resource.propertyId,
      deviceId: resource.deviceId,
      metricType: resource.metricType,
      value: resource.value,
      unit: resource.unit,
      periodStart: resource.periodStart,
      periodEnd: resource.periodEnd,
      calculatedAt: resource.calculatedAt,
    });
  }

  static toAlert(resource: ConsumptionAlertResource): ConsumptionAlert {
    return new ConsumptionAlert({
      id: resource.id,
      userId: resource.userId,
      propertyId: resource.propertyId,
      deviceId: resource.deviceId,
      severity: resource.severity,
      message: resource.message,
      threshold: resource.threshold,
      currentValue: resource.currentValue,
      isRead: resource.isRead,
      triggeredAt: resource.triggeredAt,
    });
  }

  static toReport(resource: ConsumptionReportResource): ConsumptionReport {
    return new ConsumptionReport({
      id: resource.id,
      userId: resource.userId,
      propertyId: resource.propertyId,
      periodStart: resource.periodStart,
      periodEnd: resource.periodEnd,
      totalConsumption: resource.totalConsumption,
      unit: resource.unit,
      generatedAt: resource.generatedAt,
      items: (resource.items ?? []).map(i => new ReportItem({
        id: i.id,
        deviceId: i.deviceId,
        deviceName: i.deviceName,
        consumption: i.consumption,
        unit: i.unit,
        usageFrequency: i.usageFrequency,
      })),
    });
  }
}

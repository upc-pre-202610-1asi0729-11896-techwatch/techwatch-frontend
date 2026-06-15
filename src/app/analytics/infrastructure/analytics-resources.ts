import {BaseResource} from '../../shared/interface/base-resource';

export interface ConsumptionMetricResource extends BaseResource {
  id: number;
  propertyId: number;
  deviceId: number | null;
  metricType: string;
  value: number;
  unit: string;
  periodStart: string;
  periodEnd: string;
  calculatedAt: string;
}

export interface ConsumptionAlertResource extends BaseResource {
  id: number;
  userId: number;
  propertyId: number;
  deviceId: number | null;
  severity: string;
  message: string;
  threshold: number;
  currentValue: number;
  isRead: boolean;
  triggeredAt: string;
}

export interface ReportItemResource {
  id: number;
  deviceId: number;
  deviceName: string;
  consumption: number;
  unit: string;
  usageFrequency: number;
}

export interface ConsumptionReportResource extends BaseResource {
  id: number;
  userId: number;
  propertyId: number;
  periodStart: string;
  periodEnd: string;
  totalConsumption: number;
  unit: string;
  generatedAt: string;
  items: ReportItemResource[];
}

/** Request body for POST /reports. */
export interface GenerateReportRequest {
  userId: number;
  propertyId: number;
  startDate: string;
  endDate: string;
}

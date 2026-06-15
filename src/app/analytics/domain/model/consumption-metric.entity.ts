import {BaseEntity} from '../../../shared/interface/base-entity';

/** A consumption metric calculated for a property (optionally per device). */
export class ConsumptionMetric implements BaseEntity {
  private _id: number;
  private _propertyId: number;
  private _deviceId: number | null;
  private _metricType: string;
  private _value: number;
  private _unit: string;
  private _periodStart: string;
  private _periodEnd: string;
  private _calculatedAt: string;

  constructor(metric: {
    id: number;
    propertyId: number;
    deviceId: number | null;
    metricType: string;
    value: number;
    unit: string;
    periodStart: string;
    periodEnd: string;
    calculatedAt: string;
  }) {
    this._id = metric.id;
    this._propertyId = metric.propertyId;
    this._deviceId = metric.deviceId;
    this._metricType = metric.metricType;
    this._value = metric.value;
    this._unit = metric.unit;
    this._periodStart = metric.periodStart;
    this._periodEnd = metric.periodEnd;
    this._calculatedAt = metric.calculatedAt;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get propertyId(): number { return this._propertyId; }
  set propertyId(value: number) { this._propertyId = value; }

  get deviceId(): number | null { return this._deviceId; }
  set deviceId(value: number | null) { this._deviceId = value; }

  get metricType(): string { return this._metricType; }
  set metricType(value: string) { this._metricType = value; }

  get value(): number { return this._value; }
  set value(value: number) { this._value = value; }

  get unit(): string { return this._unit; }
  set unit(value: string) { this._unit = value; }

  get periodStart(): string { return this._periodStart; }
  set periodStart(value: string) { this._periodStart = value; }

  get periodEnd(): string { return this._periodEnd; }
  set periodEnd(value: string) { this._periodEnd = value; }

  get calculatedAt(): string { return this._calculatedAt; }
  set calculatedAt(value: string) { this._calculatedAt = value; }
}

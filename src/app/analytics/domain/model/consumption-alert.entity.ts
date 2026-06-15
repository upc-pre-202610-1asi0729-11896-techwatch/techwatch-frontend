import {BaseEntity} from '../../../shared/interface/base-entity';

export type AlertSeverity = 'LOW' | 'MEDIUM' | 'HIGH';

/** A consumption alert raised for a user when a threshold is exceeded. */
export class ConsumptionAlert implements BaseEntity {
  private _id: number;
  private _userId: number;
  private _propertyId: number;
  private _deviceId: number | null;
  private _severity: string;
  private _message: string;
  private _threshold: number;
  private _currentValue: number;
  private _isRead: boolean;
  private _triggeredAt: string;

  constructor(alert: {
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
  }) {
    this._id = alert.id;
    this._userId = alert.userId;
    this._propertyId = alert.propertyId;
    this._deviceId = alert.deviceId;
    this._severity = alert.severity;
    this._message = alert.message;
    this._threshold = alert.threshold;
    this._currentValue = alert.currentValue;
    this._isRead = alert.isRead;
    this._triggeredAt = alert.triggeredAt;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get userId(): number { return this._userId; }
  set userId(value: number) { this._userId = value; }

  get propertyId(): number { return this._propertyId; }
  set propertyId(value: number) { this._propertyId = value; }

  get deviceId(): number | null { return this._deviceId; }
  set deviceId(value: number | null) { this._deviceId = value; }

  get severity(): string { return this._severity; }
  set severity(value: string) { this._severity = value; }

  get message(): string { return this._message; }
  set message(value: string) { this._message = value; }

  get threshold(): number { return this._threshold; }
  set threshold(value: number) { this._threshold = value; }

  get currentValue(): number { return this._currentValue; }
  set currentValue(value: number) { this._currentValue = value; }

  get isRead(): boolean { return this._isRead; }
  set isRead(value: boolean) { this._isRead = value; }

  get triggeredAt(): string { return this._triggeredAt; }
  set triggeredAt(value: string) { this._triggeredAt = value; }
}

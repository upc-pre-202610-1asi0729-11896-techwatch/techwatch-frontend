import {BaseEntity} from '../../../shared/interface/base-entity';

/** A usage data record generated during a simulation session. */
export class UsageData implements BaseEntity {
  private _id: number;
  private _deviceId: number;
  private _consumptionValue: number;
  private _unit: string;
  private _recordedAt: string;

  constructor(usage: {
    id: number;
    deviceId: number;
    consumptionValue: number;
    unit: string;
    recordedAt: string;
  }) {
    this._id = usage.id;
    this._deviceId = usage.deviceId;
    this._consumptionValue = usage.consumptionValue;
    this._unit = usage.unit;
    this._recordedAt = usage.recordedAt;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get deviceId(): number { return this._deviceId; }
  set deviceId(value: number) { this._deviceId = value; }

  get consumptionValue(): number { return this._consumptionValue; }
  set consumptionValue(value: number) { this._consumptionValue = value; }

  get unit(): string { return this._unit; }
  set unit(value: string) { this._unit = value; }

  get recordedAt(): string { return this._recordedAt; }
  set recordedAt(value: string) { this._recordedAt = value; }
}

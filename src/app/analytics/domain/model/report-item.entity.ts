import {BaseEntity} from '../../../shared/interface/base-entity';

/** A per-device line of a consumption report. */
export class ReportItem implements BaseEntity {
  private _id: number;
  private _deviceId: number;
  private _deviceName: string;
  private _consumption: number;
  private _unit: string;
  private _usageFrequency: number;

  constructor(item: {
    id: number;
    deviceId: number;
    deviceName: string;
    consumption: number;
    unit: string;
    usageFrequency: number;
  }) {
    this._id = item.id;
    this._deviceId = item.deviceId;
    this._deviceName = item.deviceName;
    this._consumption = item.consumption;
    this._unit = item.unit;
    this._usageFrequency = item.usageFrequency;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get deviceId(): number { return this._deviceId; }
  set deviceId(value: number) { this._deviceId = value; }

  get deviceName(): string { return this._deviceName; }
  set deviceName(value: string) { this._deviceName = value; }

  get consumption(): number { return this._consumption; }
  set consumption(value: number) { this._consumption = value; }

  get unit(): string { return this._unit; }
  set unit(value: string) { this._unit = value; }

  get usageFrequency(): number { return this._usageFrequency; }
  set usageFrequency(value: number) { this._usageFrequency = value; }
}

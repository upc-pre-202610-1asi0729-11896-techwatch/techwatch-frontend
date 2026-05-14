import {BaseEntity} from '../../../shared/interface/base-entity';

export class Consumption implements BaseEntity {
  private _id: number;
  private _deviceId: number;
  private _kwh: number;
  private _date: string;

  constructor(consumption: { id: number; deviceId: number; kwh: number; date: string }) {
    this._id = consumption.id;
    this._deviceId = consumption.deviceId;
    this._kwh = consumption.kwh;
    this._date = consumption.date;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get deviceId(): number { return this._deviceId; }
  set deviceId(value: number) { this._deviceId = value; }

  get kwh(): number { return this._kwh; }
  set kwh(value: number) { this._kwh = value; }

  get date(): string { return this._date; }
  set date(value: string) { this._date = value; }
}

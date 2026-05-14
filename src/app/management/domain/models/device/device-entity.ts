import {BaseEntity} from '../../../../shared/interface/base-entity';
import {HomeEntity} from '../home/home-entity';

export class DeviceEntity {
  private _id: number;
  private _name: string;
  private _type: string;
  private _powerWatts: number;
  private _status: string;
  private _homeId: number;
  private _home: HomeEntity | null;

  constructor(device: {
    id: number;
    name: string;
    type: string;
    powerWatts: number;
    status: string;
    homeId: number;
    home?: HomeEntity | null;
  }) {
    this._id = device.id;
    this._name = device.name;
    this._type = device.type;
    this._powerWatts = device.powerWatts;
    this._status = device.status;
    this._homeId = device.homeId;
    this._home = device.home ?? null;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }

  get type(): string { return this._type; }
  set type(value: string) { this._type = value; }

  get powerWatts(): number { return this._powerWatts; }
  set powerWatts(value: number) { this._powerWatts = value; }

  get status(): string { return this._status; }
  set status(value: string) { this._status = value; }

  get homeId(): number { return this._homeId; }
  set homeId(value: number) { this._homeId = value; }

  get home(): HomeEntity | null { return this._home; }
  set home(value: HomeEntity | null) { this._home = value; }
}

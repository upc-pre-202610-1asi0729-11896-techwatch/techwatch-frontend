import {BaseEntity} from '../../../../shared/interface/base-entity';

export type DeviceType = 'LIGHT' | 'THERMOSTAT' | 'CAMERA' | 'SMART_PLUG' | 'AIR_CONDITIONER' | 'DOOR_LOCK';
export type DeviceStatus = 'ON' | 'OFF';

/**
 * Device aggregate root: an appliance registered in a space. Mirrors the
 * backend Device Management `Device` (references its space by id).
 */
export class DeviceEntity implements BaseEntity {
  private _id: number;
  private _spaceId: number;
  private _name: string;
  private _brand: string;
  private _model: string;
  private _type: string;
  private _status: string;
  private _powerWatts: number;

  constructor(device: {
    id: number;
    spaceId: number;
    name: string;
    brand: string;
    model: string;
    type: string;
    status: string;
    powerWatts: number;
  }) {
    this._id = device.id;
    this._spaceId = device.spaceId;
    this._name = device.name;
    this._brand = device.brand;
    this._model = device.model;
    this._type = device.type;
    this._status = device.status;
    this._powerWatts = device.powerWatts;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get spaceId(): number { return this._spaceId; }
  set spaceId(value: number) { this._spaceId = value; }

  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }

  get brand(): string { return this._brand; }
  set brand(value: string) { this._brand = value; }

  get model(): string { return this._model; }
  set model(value: string) { this._model = value; }

  get type(): string { return this._type; }
  set type(value: string) { this._type = value; }

  get status(): string { return this._status; }
  set status(value: string) { this._status = value; }

  get powerWatts(): number { return this._powerWatts; }
  set powerWatts(value: number) { this._powerWatts = value; }
}

import {BaseEntity} from '../../../shared/interface/base-entity';

/** An action executed against a device during a simulation session. */
export class DeviceAction implements BaseEntity {
  private _id: number;
  private _deviceId: number;
  private _actionType: string;
  private _parameterName: string | null;
  private _parameterValue: string | null;
  private _executedAt: string;

  constructor(action: {
    id: number;
    deviceId: number;
    actionType: string;
    parameterName: string | null;
    parameterValue: string | null;
    executedAt: string;
  }) {
    this._id = action.id;
    this._deviceId = action.deviceId;
    this._actionType = action.actionType;
    this._parameterName = action.parameterName;
    this._parameterValue = action.parameterValue;
    this._executedAt = action.executedAt;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get deviceId(): number { return this._deviceId; }
  set deviceId(value: number) { this._deviceId = value; }

  get actionType(): string { return this._actionType; }
  set actionType(value: string) { this._actionType = value; }

  get parameterName(): string | null { return this._parameterName; }
  set parameterName(value: string | null) { this._parameterName = value; }

  get parameterValue(): string | null { return this._parameterValue; }
  set parameterValue(value: string | null) { this._parameterValue = value; }

  get executedAt(): string { return this._executedAt; }
  set executedAt(value: string) { this._executedAt = value; }
}

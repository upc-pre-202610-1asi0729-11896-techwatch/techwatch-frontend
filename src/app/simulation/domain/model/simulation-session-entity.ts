import {BaseEntity} from '../../../shared/interface/base-entity';
import {DeviceAction} from './device-action';
import {UsageData} from './usage-data';

export type SessionStatus = 'ACTIVE' | 'ENDED';

/**
 * Simulation session aggregate root: a run over a property during which device
 * actions are recorded and usage data is generated. Mirrors the backend
 * Device Management `SimulationSession`.
 */
export class SimulationSessionEntity implements BaseEntity {
  private _id: number;
  private _userId: number;
  private _propertyId: number;
  private _status: string;
  private _startedAt: string;
  private _endedAt: string | null;
  private _actions: DeviceAction[];
  private _usageData: UsageData[];

  constructor(session: {
    id: number;
    userId: number;
    propertyId: number;
    status: string;
    startedAt: string;
    endedAt: string | null;
    actions?: DeviceAction[];
    usageData?: UsageData[];
  }) {
    this._id = session.id;
    this._userId = session.userId;
    this._propertyId = session.propertyId;
    this._status = session.status;
    this._startedAt = session.startedAt;
    this._endedAt = session.endedAt;
    this._actions = session.actions ?? [];
    this._usageData = session.usageData ?? [];
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get userId(): number { return this._userId; }
  set userId(value: number) { this._userId = value; }

  get propertyId(): number { return this._propertyId; }
  set propertyId(value: number) { this._propertyId = value; }

  get status(): string { return this._status; }
  set status(value: string) { this._status = value; }

  get startedAt(): string { return this._startedAt; }
  set startedAt(value: string) { this._startedAt = value; }

  get endedAt(): string | null { return this._endedAt; }
  set endedAt(value: string | null) { this._endedAt = value; }

  get actions(): DeviceAction[] { return this._actions; }
  set actions(value: DeviceAction[]) { this._actions = value; }

  get usageData(): UsageData[] { return this._usageData; }
  set usageData(value: UsageData[]) { this._usageData = value; }

  get totalConsumption(): number {
    return Math.round(this._usageData.reduce((sum, u) => sum + u.consumptionValue, 0) * 100) / 100;
  }
}

import {BaseResource} from '../../shared/interface/base-resource';

export interface DeviceActionResource {
  id: number;
  deviceId: number;
  actionType: string;
  parameterName: string | null;
  parameterValue: string | null;
  executedAt: string;
}

export interface UsageDataResource {
  id: number;
  deviceId: number;
  consumptionValue: number;
  unit: string;
  recordedAt: string;
}

export interface SimulationSessionResource extends BaseResource {
  id: number;
  userId: number;
  propertyId: number;
  status: string;
  startedAt: string;
  endedAt: string | null;
  actions: DeviceActionResource[];
  usageData: UsageDataResource[];
}

/** Request body for POST /simulation-sessions. */
export interface StartSimulationSessionRequest {
  userId: number;
  propertyId: number;
}

/** Request body for POST /simulation-sessions/{id}/actions. */
export interface RecordDeviceActionRequest {
  deviceId: number;
  actionType: string;
  parameterName: string | null;
  parameterValue: string | null;
  durationMinutes: number;
}

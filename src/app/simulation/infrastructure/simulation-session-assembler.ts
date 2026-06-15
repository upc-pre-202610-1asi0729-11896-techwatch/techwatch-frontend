import {SimulationSessionEntity} from '../domain/model/simulation-session-entity';
import {DeviceAction} from '../domain/model/device-action';
import {UsageData} from '../domain/model/usage-data';
import {SimulationSessionResource} from './simulation-session-resource';

export class SimulationSessionAssembler {

  static toEntityFromResource(resource: SimulationSessionResource): SimulationSessionEntity {
    return new SimulationSessionEntity({
      id: resource.id,
      userId: resource.userId,
      propertyId: resource.propertyId,
      status: resource.status,
      startedAt: resource.startedAt,
      endedAt: resource.endedAt,
      actions: (resource.actions ?? []).map(a => new DeviceAction({
        id: a.id,
        deviceId: a.deviceId,
        actionType: a.actionType,
        parameterName: a.parameterName,
        parameterValue: a.parameterValue,
        executedAt: a.executedAt,
      })),
      usageData: (resource.usageData ?? []).map(u => new UsageData({
        id: u.id,
        deviceId: u.deviceId,
        consumptionValue: u.consumptionValue,
        unit: u.unit,
        recordedAt: u.recordedAt,
      })),
    });
  }
}

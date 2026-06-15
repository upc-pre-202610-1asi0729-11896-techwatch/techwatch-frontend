import {computed, inject, Injectable, signal, Signal} from '@angular/core';
import {forkJoin, retry} from 'rxjs';

import {SessionStore} from '../../shared/application/session-store';
import {PropertyEntity} from '../domain/models/property/property-entity';
import {DeviceEntity} from '../domain/models/device/device-entity';
import {ManagementApi} from '../infrastructure/management-api';

/**
 * Application store for the Device Management context: properties (with their
 * spaces) of the current user, and the devices of a selected space.
 */
@Injectable({
  providedIn: 'root',
})
export class ManagementStore {
  private readonly managementApi = inject(ManagementApi);
  private readonly session = inject(SessionStore);

  private readonly propertiesSignal = signal<PropertyEntity[]>([]);
  readonly properties = this.propertiesSignal.asReadonly();

  private readonly devicesSignal = signal<DeviceEntity[]>([]);
  /** Devices of the space loaded last via {@link loadDevicesBySpace}. */
  readonly devices = this.devicesSignal.asReadonly();

  private readonly propertyDevicesSignal = signal<DeviceEntity[]>([]);
  /** All devices across the spaces of the property loaded via {@link loadDevicesForProperty}. */
  readonly propertyDevices = this.propertyDevicesSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  constructor() {
    this.loadProperties();
  }

  getPropertyById(id: number): Signal<PropertyEntity | undefined> {
    return computed(() => id ? this.properties().find(p => p.id === id) : undefined);
  }

  getDeviceById(id: number): Signal<DeviceEntity | undefined> {
    return computed(() => id ? this.devices().find(d => d.id === id) : undefined);
  }

  loadProperties(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi.getPropertiesByUserId(this.session.userId).pipe(retry(2)).subscribe({
      next: properties => {
        this.propertiesSignal.set(properties);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load properties'));
        this.loadingSignal.set(false);
      }
    });
  }

  addProperty(property: PropertyEntity): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi.createProperty(property).pipe(retry(2)).subscribe({
      next: created => {
        this.propertiesSignal.update(properties => [...properties, created]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create property'));
        this.loadingSignal.set(false);
      }
    });
  }

  addSpace(propertyId: number, name: string, description: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi.createSpace(propertyId, name, description).pipe(retry(2)).subscribe({
      next: () => this.reloadProperty(propertyId),
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create space'));
        this.loadingSignal.set(false);
      }
    });
  }

  loadDevicesBySpace(spaceId: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi.getDevicesBySpaceId(spaceId).pipe(retry(2)).subscribe({
      next: devices => {
        this.devicesSignal.set(devices);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load devices'));
        this.loadingSignal.set(false);
      }
    });
  }

  addDevice(device: DeviceEntity): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi.createDevice(device).pipe(retry(2)).subscribe({
      next: created => {
        this.devicesSignal.update(devices => [...devices, created]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create device'));
        this.loadingSignal.set(false);
      }
    });
  }

  updateDevice(updated: DeviceEntity): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi.updateDevice(updated).pipe(retry(2)).subscribe({
      next: device => {
        this.devicesSignal.update(devices => devices.map(d => d.id === device.id ? device : d));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update device'));
        this.loadingSignal.set(false);
      }
    });
  }

  deleteDevice(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi.deleteDevice(id).pipe(retry(2)).subscribe({
      next: () => {
        this.devicesSignal.update(devices => devices.filter(d => d.id !== id));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete device'));
        this.loadingSignal.set(false);
      }
    });
  }

  /** Loads every device across all the spaces of a property into {@link propertyDevices}. */
  loadDevicesForProperty(property: PropertyEntity): void {
    const spaces = property.spaces;
    if (spaces.length === 0) {
      this.propertyDevicesSignal.set([]);
      return;
    }
    forkJoin(spaces.map(space => this.managementApi.getDevicesBySpaceId(space.id))).pipe(retry(2)).subscribe({
      next: deviceLists => this.propertyDevicesSignal.set(deviceLists.flat()),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to load devices')),
    });
  }

  private reloadProperty(propertyId: number): void {
    this.managementApi.getProperty(propertyId).subscribe({
      next: property => {
        this.propertiesSignal.update(properties => properties.map(p => p.id === property.id ? property : p));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to reload property'));
        this.loadingSignal.set(false);
      }
    });
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  }
}

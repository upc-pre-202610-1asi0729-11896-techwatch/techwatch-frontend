import {computed, Injectable, signal, Signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';

import {HomeEntity} from '../domain/models/home/home-entity';
import {ManagementApi} from '../infrastructure/management-api';
import {DeviceEntity} from '../domain/models/device/device-entity';

@Injectable({
  providedIn: 'root',
})
export class ManagementStore {
  private readonly homesSignal = signal<HomeEntity[]>([]);
  readonly homes = this.homesSignal.asReadonly();

  private readonly devicesSignal = signal<DeviceEntity[]>([]);
  readonly devices = this.devicesSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  constructor(private managementApi: ManagementApi) {
    this.loadHomes();
    this.loadDevices();
  }

  getHomeById(id: number): Signal<HomeEntity | undefined> {
    return computed(() => id ? this.homes().find(h => h.id === id) : undefined);
  }

  getDeviceById(id: number): Signal<DeviceEntity | undefined> {
    return computed(() => id ? this.devices().find(d => d.id === id) : undefined);
  }

  addHome(home: HomeEntity): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi.createHome(home).pipe(retry(2)).subscribe({
      next: created => {
        this.homesSignal.update(homes => [...homes, created]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create home'));
        this.loadingSignal.set(false);
      }
    });
  }

  updateHome(updated: HomeEntity): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi.updateHome(updated).pipe(retry(2)).subscribe({
      next: home => {
        this.homesSignal.update(homes => homes.map(h => h.id === home.id ? home : h));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update home'));
        this.loadingSignal.set(false);
      }
    });
  }

  deleteHome(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi.deleteHome(id).pipe(retry(2)).subscribe({
      next: () => {
        this.homesSignal.update(homes => homes.filter(h => h.id !== id));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete home'));
        this.loadingSignal.set(false);
      }
    });
  }

  addDevices(device: DeviceEntity): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi.createDevice(device).pipe(retry(2)).subscribe({
      next: created => {
        created = this.assignHomeToDevice(created);
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
        device = this.assignHomeToDevice(device);
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

  private loadHomes(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi.getHomes().pipe(takeUntilDestroyed()).subscribe({
      next: homes => {
        this.homesSignal.set(homes);
        this.loadingSignal.set(false);
        this.assignHomesToDevices();
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load homes'));
        this.loadingSignal.set(false);
      }
    });
  }

  private loadDevices(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi.getDevices().pipe(takeUntilDestroyed()).subscribe({
      next: devices => {
        this.devicesSignal.set(devices);
        this.loadingSignal.set(false);
        this.assignHomesToDevices();
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load devices'));
        this.loadingSignal.set(false);
      }
    });
  }

  private assignHomesToDevices(): void {
    this.devicesSignal.update(devices => devices.map(d => this.assignHomeToDevice(d)));
  }

  private assignHomeToDevice(device: DeviceEntity): DeviceEntity {
    const homeId = device.homeId ?? 0;
    device.home = homeId ? (this.getHomeById(homeId)() ?? null) : null;
    return device;
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  }
}

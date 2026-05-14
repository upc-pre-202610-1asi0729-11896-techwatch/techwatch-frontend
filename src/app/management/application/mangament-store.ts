import {Injectable, signal, computed, inject, Signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';


import {HomeEntity} from '../domain/models/home/home-entity';
import {ManagementApi} from '../infrastructure/management-api';
import {DeviceEntity} from '../domain/models/device/device-entity';


@Injectable({
  providedIn: 'root',
})
export class MangamentStore {
  // Homes
  private readonly homeSignal = signal<HomeEntity[]>([]);
  readonly homes = this.homeSignal.asReadonly();

  //Devices
  private readonly deviceSignal = signal<DeviceEntity[]>([]);
  readonly devices = this.deviceSignal.asReadonly();


  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  constructor(private managementApi: ManagementApi) {
    this.loadHomes();
    this.loadDevices();
  }
  // Homes
  private loadHomes(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi.getHomes().pipe(takeUntilDestroyed()).subscribe({
      next: homes => {
        this.homeSignal.set(homes);
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load homes'));
        this.loadingSignal.set(false);
      }
    });
  }

  getHomeById(id: number): Signal<HomeEntity | undefined> {
    return computed(() => id ? this.homes().find(c => c.id === id) : undefined);
  }

  addHome(home: HomeEntity): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi.createHome(home).pipe(retry(2)).subscribe({
      next: createdHome => {
        this.homeSignal.update(homes => [...homes, createdHome]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create home'));
        this.loadingSignal.set(false);
      }
    });
  }

  updateHome(updateHome: HomeEntity): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi.updateHome(updateHome).pipe(retry(2)).subscribe({
      next: home => {
        this.homeSignal.update(homes =>
          homes.map(c => c.id === home.id ? home : c)
        );
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
        this.homeSignal.update(homes => homes.filter(c => c.id !== id));
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete home'));
        this.loadingSignal.set(false);
      }
    });
  }


  // Devices
  private loadDevices(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi.getDevices().pipe(takeUntilDestroyed()).subscribe({
      next: devices => {
        console.log(devices);
        this.deviceSignal.set(devices);
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
        this.assignHomesToDevices();
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load devices'));
        this.loadingSignal.set(false);
      }
    });
  }

  getDevicesById(id: number): Signal<DeviceEntity | undefined> {
    return computed(() => id ? this.devices().find(c => c.id === id) : undefined);
  }

  private assignHomeToDevice(devices: DeviceEntity): DeviceEntity {
    const homeId = devices.homeId ?? 0;
    devices.home = homeId ? (this.getHomeById(homeId)() ?? null) : null;
    return devices;
  }

  private assignHomesToDevices(): void {
    this.deviceSignal.update((devices) =>
      devices.map((devicesData) => this.assignHomeToDevice(devicesData)),
    );
  }

  addDevices(device: DeviceEntity): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi.createDevice(device).pipe(retry(2)).subscribe({
      next: createDeviceData => {
        createDeviceData = this.assignHomeToDevice(device);
        this.deviceSignal.update(devices => [...devices, createDeviceData]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create device'));
        this.loadingSignal.set(false);
      }
    });
  }

  updateDevice(updatedDevicesData: DeviceEntity): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi
      .updateDevice(updatedDevicesData)
      .pipe(retry(2))
      .subscribe({
        next: (device) => {
          device = this.assignHomeToDevice(device);
          this.deviceSignal.update((devicesdata) =>
            devicesdata.map((c) => (c.id === device.id ? device : c)),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update device'));
          this.loadingSignal.set(false);
        },
      });
  }

  deleteDevice(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi
      .deleteDevice(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.deviceSignal.update((devices) => devices.filter((c) => c.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete devices'));
          this.loadingSignal.set(false);
        },
      });
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  }
}

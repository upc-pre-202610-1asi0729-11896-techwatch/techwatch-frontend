import {Injectable, signal, computed, inject, Signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';


import {HomeEntity} from '../domain/models/home/home-entity';
import {ManagementApi} from '../infrastructure/management-api';


@Injectable({
  providedIn: 'root',
})
export class MangamentStore {
  private readonly homeSignal = signal<HomeEntity[]>([]);
  readonly homes = this.homeSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  constructor(private managementApi: ManagementApi) {
    this.loadHomes();
  }

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
        this.errorSignal.set(this.formatError(err, 'Failed to load categories'));
        this.loadingSignal.set(false);
      }
    });
  }

  addHome(home: HomeEntity): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.managementApi.createHome(home).pipe(retry(2)).subscribe({
      next: createdHome => {
        this.homeSignal.update(categories => [...categories, createdHome]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create category'));
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
        this.errorSignal.set(this.formatError(err, 'Failed to update category'));
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
        this.errorSignal.set(this.formatError(err, 'Failed to delete category'));
        this.loadingSignal.set(false);
      }
    });
  }

  getHomeById(id: number): Signal<HomeEntity | undefined> {
    return computed(() => id ? this.homes().find(c => c.id === id) : undefined);
  }


  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  }
}

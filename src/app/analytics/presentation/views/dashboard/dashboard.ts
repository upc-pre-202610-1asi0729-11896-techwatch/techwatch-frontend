import {AfterViewChecked, Component, computed, inject, ViewChild} from '@angular/core';
import {
  MatCell, MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatError} from '@angular/material/form-field';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

import {AnalyticsStore} from '../../../application/analytics.store';
import {ManagementStore} from '../../../../management/application/mangament-store';

interface DeviceSummary {
  deviceId: number;
  deviceName: string;
  totalKwh: number;
  lastDate: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    MatTable, MatHeaderCellDef, MatCellDef, MatColumnDef,
    MatHeaderCell, MatCell, MatHeaderRowDef, MatRowDef,
    MatHeaderRow, MatRow,
    MatProgressSpinner, MatError,
    MatSort, MatSortHeader, MatPaginator,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements AfterViewChecked {
  readonly store = inject(AnalyticsStore);
  readonly managementStore = inject(ManagementStore);

  displayedColumns = ['deviceName', 'totalKwh', 'lastDate'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly activeDeviceCount = computed(() =>
    this.managementStore.devices().filter(d => d.status === 'on').length
  );

  readonly deviceSummaries = computed((): DeviceSummary[] => {
    const consumptions = this.store.consumptions();
    const kwhMap = this.store.kwhByDevice();
    const dateMap = new Map<number, string>();

    for (const c of consumptions) {
      const existing = dateMap.get(c.deviceId);
      if (!existing || c.date > existing) {
        dateMap.set(c.deviceId, c.date);
      }
    }

    return Array.from(kwhMap.entries()).map(([deviceId, totalKwh]) => ({
      deviceId,
      deviceName: this.store.getDeviceName(deviceId),
      totalKwh: Math.round(totalKwh * 100) / 100,
      lastDate: dateMap.get(deviceId) ?? '—',
    }));
  });

  dataSource = computed(() => {
    const source = new MatTableDataSource(this.deviceSummaries());
    source.sort = this.sort;
    source.paginator = this.paginator;
    return source;
  });

  ngAfterViewChecked() {
    if (this.dataSource().sort !== this.sort) {
      this.dataSource().sort = this.sort;
    }
    if (this.dataSource().paginator !== this.paginator) {
      this.dataSource().paginator = this.paginator;
    }
  }
}

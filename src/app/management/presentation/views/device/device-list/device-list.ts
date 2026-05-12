import {AfterViewChecked, Component, computed, inject, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatError} from '@angular/material/form-field';

import {MangamentStore} from '../../../../aplication/mangament-store';

import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';

import {MatButton, MatIconButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIcon} from '@angular/material/icon';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
@Component({
  selector: 'app-device-list',
  imports: [
    MatError,
    MatTable,
    MatHeaderCellDef,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRowDef,
    MatRowDef,
    MatButton,
    MatHeaderRow,
    MatRow,
    MatProgressSpinner,
    MatIcon,
    MatIconButton,
    MatSort,
    MatSortHeader,
    MatPaginator
  ],
  templateUrl: './device-list.html',
  styleUrl: './device-list.css',
})
export class DeviceList implements AfterViewChecked{
  readonly store = inject(MangamentStore);
  protected router = inject(Router);

  displayedColumns: string[] = ['id', 'name', 'powerWatts', 'status', 'homeId','actions'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataDevices = computed(() => {
    const device = new MatTableDataSource(this.store.devices());
    device.sort = this.sort;
    device.paginator = this.paginator;
    return device;
  });

  editDevice(id: number) { this.router.navigate(['managament/devices', id, 'edit']).then();}

  deleteDevices(id: number) {this.store.deleteDevice(id);}

  navigateToNew() {this.router.navigate(['managament/devices/new']).then();}

  ngAfterViewChecked() {
    if (this.dataDevices().paginator !== this.paginator) {
      this.dataDevices().paginator = this.paginator;
    }
    if (this.dataDevices().sort !== this.sort) {
      this.dataDevices().sort = this.sort;
    }
  }
}


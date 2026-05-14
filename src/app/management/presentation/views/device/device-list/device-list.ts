import {AfterViewChecked, Component, computed, inject, signal, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {
  MatCell, MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIcon} from '@angular/material/icon';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

import {ManagementStore} from '../../../../aplication/mangament-store';

@Component({
  selector: 'app-device-list',
  imports: [
    MatError, MatFormFieldModule, MatSelectModule,
    MatTable, MatHeaderCellDef, MatCellDef, MatColumnDef,
    MatHeaderCell, MatCell, MatHeaderRowDef, MatRowDef,
    MatButton, MatHeaderRow, MatRow,
    MatProgressSpinner, MatIcon, MatIconButton,
    MatSort, MatSortHeader, MatPaginator,
  ],
  templateUrl: './device-list.html',
  styleUrl: './device-list.css',
})
export class DeviceList implements AfterViewChecked {
  readonly store = inject(ManagementStore);
  protected router = inject(Router);

  displayedColumns: string[] = ['id', 'name', 'type', 'powerWatts', 'status', 'home', 'actions'];

  readonly selectedHomeId = signal<number | null>(null);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataDevices = computed(() => {
    const filtered = this.selectedHomeId()
      ? this.store.devices().filter(d => d.homeId === this.selectedHomeId())
      : this.store.devices();
    const source = new MatTableDataSource(filtered);
    source.sort = this.sort;
    source.paginator = this.paginator;
    return source;
  });

  editDevice(id: number) {
    this.router.navigate(['/management/devices', id, 'edit']);
  }

  deleteDevice(id: number) {
    this.store.deleteDevice(id);
  }

  navigateToNew() {
    this.router.navigate(['/management/devices/new']);
  }

  ngAfterViewChecked() {
    if (this.dataDevices().paginator !== this.paginator) {
      this.dataDevices().paginator = this.paginator;
    }
    if (this.dataDevices().sort !== this.sort) {
      this.dataDevices().sort = this.sort;
    }
  }
}

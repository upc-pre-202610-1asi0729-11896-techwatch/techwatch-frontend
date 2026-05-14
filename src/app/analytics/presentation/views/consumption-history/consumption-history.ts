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
import {Consumption} from '../../../domain/model/consumption.entity';

interface ConsumptionRow {
  id: number;
  date: string;
  deviceName: string;
  kwh: number;
}

@Component({
  selector: 'app-consumption-history',
  imports: [
    MatTable, MatHeaderCellDef, MatCellDef, MatColumnDef,
    MatHeaderCell, MatCell, MatHeaderRowDef, MatRowDef,
    MatHeaderRow, MatRow,
    MatProgressSpinner, MatError,
    MatSort, MatSortHeader, MatPaginator,
  ],
  templateUrl: './consumption-history.html',
  styleUrl: './consumption-history.css',
})
export class ConsumptionHistory implements AfterViewChecked {
  readonly store = inject(AnalyticsStore);

  displayedColumns = ['date', 'deviceName', 'kwh'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly rows = computed((): ConsumptionRow[] =>
    this.store.consumptions()
      .map((c: Consumption) => ({
        id: c.id,
        date: c.date,
        deviceName: this.store.getDeviceName(c.deviceId),
        kwh: c.kwh,
      }))
      .sort((a, b) => b.date.localeCompare(a.date))
  );

  dataSource = computed(() => {
    const source = new MatTableDataSource(this.rows());
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

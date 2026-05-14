import {AfterViewChecked, Component, computed, inject, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatError} from '@angular/material/form-field';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';

import {ManagementStore} from '../../../../aplication/mangament-store';


@Component({
  selector: 'app-home-list',
  imports: [MatTableModule, MatButtonModule, MatError, MatProgressSpinner, MatIcon, MatPaginator, MatSort, MatSortHeader],
  templateUrl: './home-list.html',
  styleUrl: './home-list.css',
})
export class HomeList implements AfterViewChecked {
  readonly store = inject(ManagementStore);
  protected router = inject(Router);


  displayedColumns: string[] = ['id', 'name', 'type','actions'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = computed(() => {
    const source = new MatTableDataSource(this.store.homes());
    source.sort = this.sort;
    source.paginator = this.paginator;
    return source;
  });

  editHome(id: number) {
    this.router.navigate(['/management/homes', id, 'edit']);
  }

  deleteHome(id: number) {
    this.store.deleteHome(id);
  }

  navigateToNew() {
    this.router.navigate(['/management/homes/new']);
  }

  ngAfterViewChecked() {
    if (this.dataSource().paginator !== this.paginator) {
      this.dataSource().paginator = this.paginator;
    }
    if (this.dataSource().sort !== this.sort) {
      this.dataSource().sort = this.sort;
    }
  }
}

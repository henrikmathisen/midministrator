import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { UserDataSource } from '../data/user-data-source';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { OverlayRef } from '@angular/cdk/overlay';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  searchControl: FormControl;
  dataSource: UserDataSource;
  displayedColumns = ['edit', 'id', 'name', 'userName', 'email', 'hsaId', 'lastLogin', 'lastUpdated', 'deleted'  ];
  size = new BehaviorSubject<number>(0);
  filterString = '';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true }) sort: MatSort;

  constructor(private userService: UserService, private spinnerService: SpinnerService) { }

  ngOnInit() {

    this.dataSource = new UserDataSource(this.userService);

    this.dataSource.loading$.subscribe({
      next: loading => { this.spinnerService.spin$.next(loading); }
    });

    this.dataSource.findUsers(this.filterString);

    this.dataSource.getSize().subscribe({
      next: size => { this.size.next(size); }
    });

    this.searchControl = new FormControl();

    this.searchControl.valueChanges
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe({
        next: val => this.onSearch(val)
      });
  }

  onPage(event: PageEvent) {
    if (this.sort.direction) {
        this.dataSource.findUsers(this.filterString, this.sort.active, this.sort.direction, event.pageIndex + 1, event.pageSize);
    } else {
      this.dataSource.findUsers(this.filterString, '', 'asc', event.pageIndex + 1, event.pageSize);
    }
  }

  onSearch(value: string) {
    this.filterString = value;
    this.paginator.pageIndex = 0;
    if (this.sort.direction) {
      this.dataSource.findUsers(value, this.sort.active, this.sort.direction, this.paginator.pageIndex + 1, this.paginator.pageSize);
  } else {
    this.dataSource.findUsers(value, '', 'asc', this.paginator.pageIndex + 1, this.paginator.pageSize);
  }
}


}

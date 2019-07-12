import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GrantDataSource } from '../data/grant-data-source';
import { BehaviorSubject } from 'rxjs';
import { MatPaginator, MatSort, PageEvent } from '@angular/material';
import { GrantService } from 'src/app/services/grant/grant.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-grant-list',
  templateUrl: './grant-list.component.html',
  styleUrls: ['./grant-list.component.scss']
})
export class GrantListComponent implements OnInit {
  searchControl: FormControl;
  dataSource: GrantDataSource;
  displayedColumns = ['remove', 'subjectId', 'key', 'clientId', 'creationTime', 'expiration', 'type' ];
  size = new BehaviorSubject<number>(0);
  filterString = '';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private grantService: GrantService, private spinnerService: SpinnerService) { }

  ngOnInit() {

    this.dataSource = new GrantDataSource(this.grantService);

    this.dataSource.loading$.subscribe({
      next: loading => { this.spinnerService.spin$.next(loading); }
    });

    this.dataSource.findGrants(this.filterString);

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

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe({
      next: ev => { 
        if (ev.active) {
          this.dataSource.findGrants(this.filterString, ev.active, ev.direction, this.paginator.pageIndex + 1, this.paginator.pageSize);
        } else {
          this.dataSource.findGrants(this.filterString, '', '', this.paginator.pageIndex + 1, this.paginator.pageSize);
        }
        
      }
    });
  }

  onPage(event: PageEvent) {
    if (this.sort.direction) {
      this.dataSource.findGrants(this.filterString, this.sort.active, this.sort.direction, event.pageIndex + 1, event.pageSize);
    } else {
      this.dataSource.findGrants(this.filterString, '', 'asc', event.pageIndex + 1, event.pageSize);
    }
  }

  onSearch(value: string) {
    this.filterString = value;
    this.paginator.pageIndex = 0;
    if (this.sort.direction) {
      this.dataSource.findGrants(value, this.sort.active, this.sort.direction, this.paginator.pageIndex + 1, this.paginator.pageSize);
    } else {
      this.dataSource.findGrants(value, '', 'asc', this.paginator.pageIndex + 1, this.paginator.pageSize);
    }
  }

  onRemoveGrant(key: string) {
    this.spinnerService.spin$.next(true);
    this.grantService.removeGrant(key).subscribe({
      next: val => { 
        this.spinnerService.spin$.next(false);
        this.dataSource.findGrants(this.filterString, this.sort.active, this.sort.direction, this.paginator.pageIndex +1, this.paginator.pageSize);
      },
      error: msg => { console.error(msg); this.spinnerService.spin$.next(false); }
    })
  }

}

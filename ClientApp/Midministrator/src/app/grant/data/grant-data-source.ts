import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { GrantService } from '../../services/grant/grant.service';
import { catchError, finalize, tap } from "rxjs/operators";
import { MidentityAccount } from '../../models/account';
import { PagingModel } from '../../models/paging-model';
import { Grant } from '../../models/grant';

export class GrantDataSource extends DataSource<Grant> {

    private grantSubject = new BehaviorSubject<Grant[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private collectionSizeSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private grantService: GrantService) 
    { 
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<Grant[]> {
        return this.grantSubject.asObservable();
    }   

    disconnect(collectionViewer: CollectionViewer): void {

    }

    getSize(): Observable<number> {
        return this.collectionSizeSubject.asObservable();
    }

    findGrants(filter = '', sortBy = '', sortDirection = 'asc', pageIndex = 1, pageSize = 25) {
        this.loadingSubject.next(true);
        this.grantService.getGrants(filter, sortBy, sortDirection, pageIndex, pageSize)
        .pipe(
            catchError(() => of({ items: [], size: 0 })),
            finalize(() => this.loadingSubject.next(false)))
        .subscribe({
            next: data => { this.grantSubject.next(data.items); this.collectionSizeSubject.next(data.size); this.loadingSubject.next(false); }
        });
    }
    
}

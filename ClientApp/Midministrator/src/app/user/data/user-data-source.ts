import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { UserService } from '../../services/user/user.service';
import { catchError, finalize, tap } from "rxjs/operators";
import { MidentityAccount } from '../../models/account';
import { PagingModel } from 'src/app/models/paging-model';

export class UserDataSource extends DataSource<MidentityAccount> {

    private accountSubject = new BehaviorSubject<MidentityAccount[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private collectionSizeSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private userService: UserService) 
    { 
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<MidentityAccount[]> {
        return this.accountSubject.asObservable();
    }   

    disconnect(collectionViewer: CollectionViewer): void {

    }

    getSize(): Observable<number> {
        return this.collectionSizeSubject.asObservable();
    }

    findUsers(filter = '', sortBy = '', sortDirection = 'asc', pageIndex = 1, pageSize = 25) {
        this.loadingSubject.next(true);
        this.userService.getUsers(filter, sortBy, sortDirection, pageIndex, pageSize)
        .pipe(
            catchError(() => of({ items: [], size: 0 })),
            finalize(() => this.loadingSubject.next(false)))
        .subscribe({
            next: data => { this.accountSubject.next(data.items); this.collectionSizeSubject.next(data.size); }
        });
    }

    
}

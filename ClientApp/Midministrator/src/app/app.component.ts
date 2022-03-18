import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  private loggedInSub: Subscription;

  constructor(private router: Router, private spinner: SpinnerService) {

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        spinner.spin$.next(true);
      }
      if (event instanceof NavigationEnd) {
        spinner.spin$.next(false);
      }
      if (event instanceof NavigationCancel) {
        spinner.spin$.next(false);
      }
      if (event instanceof NavigationError) {
        spinner.spin$.next(false);
      }
    });
  }

  title = 'Midministrator';

  ngOnDestroy(): void {
    this.loggedInSub.unsubscribe();
  }

}

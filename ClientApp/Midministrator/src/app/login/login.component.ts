import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private loggedInSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.loggedInSub = this.authService.loggedIn$
    .pipe(distinctUntilChanged())
    .subscribe({
      next: (loggedIn) => {
        if (loggedIn) this.router.navigateByUrl('/clients');
      }
    });
  }

  ngOnDestroy(): void {
    this.loggedInSub.unsubscribe();
  }

  ngOnInit(): void {
  }

}

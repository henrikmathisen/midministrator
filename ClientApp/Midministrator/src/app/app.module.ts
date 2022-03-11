import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerInterceptorService } from './base/server-interceptor.service';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from './shared/error-dialog/error-dialog.component';
import { MatSpinner } from '@angular/material/progress-spinner';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { SpinnerService } from './services/spinner.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        ConfirmDialogComponent,
        ErrorDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ServerInterceptorService,
            multi: true
        },
        AuthGuardService,
        AuthService,
        SpinnerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

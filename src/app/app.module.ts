/**
 * This is the main module of the app.
 * It imports all the required module for the app to serve correctly.
 */
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleModule } from './article/article.module';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoginModule } from './login/login.module';
import { MaterialModule } from './material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterModule } from './register/register.module';
import { LoadingIndicatorComponent } from './shared/loading-indicator/loading-indicator.component';
import { LoadingIndicatorFacade } from './shared/loading-indicator/store/loading-indicator.facade';
import { LoadingIndicatorState } from './shared/loading-indicator/store/loading-indicator.state';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoadingIndicatorComponent,
    NavigationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([LoadingIndicatorState], {
      developmentMode: !environment.production,
    }),
    LoginModule,
    RegisterModule,
    ArticleModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [
    LoadingIndicatorFacade,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

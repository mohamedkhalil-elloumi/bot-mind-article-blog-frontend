import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SnackBarService } from '../snackbar/snackbar.service';
import { LoadingIndicatorFacade } from './store/loading-indicator.facade';

/**
 * This component is used in the app.component
 * In order to show a progress bar when loading
 * Or to show an error progress bar when an error occured.
 */
@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
})
export class LoadingIndicatorComponent implements OnInit {
  $loading: Observable<boolean>;
  $error: Observable<boolean>;

  constructor(
    private router: Router,
    private snackbar: SnackBarService,
    private loadingIndicatorFacade: LoadingIndicatorFacade
  ) {}

  ngOnInit(): void {
    this.$loading = this.loadingIndicatorFacade.$loading;
    this.$error = this.loadingIndicatorFacade.$error;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadingIndicatorFacade.beginLoading();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel
      ) {
        this.loadingIndicatorFacade.endLoadingWithSuccess();
      } else if (event instanceof NavigationError) {
        this.loadingIndicatorFacade.endLoadingWithError();
        this.snackbar.showErrorMessage(event.error.message);
      }
    });
  }
}

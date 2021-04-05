/**
 * The facade allow the component to communicate with the
 * state container.
 * It is a way to hide the store dispatches in the component.
 */
import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  BeginLoading,
  EndLoadingWithError,
  EndLoadingWithSuccess,
} from './loading-indicator.actions';
import { LoadingIndicatorState } from './loading-indicator.state';

@Injectable()
export class LoadingIndicatorFacade {
  @Select(LoadingIndicatorState.loading)
  $loading: Observable<boolean>;

  @Select(LoadingIndicatorState.error)
  $error: Observable<boolean>;

  constructor(private store: Store) {}

  beginLoading(): void {
    this.store.dispatch(new BeginLoading());
  }

  endLoadingWithSuccess(): void {
    this.store.dispatch(new EndLoadingWithSuccess());
  }

  endLoadingWithError(): void {
    this.store.dispatch(new EndLoadingWithError());
  }
}

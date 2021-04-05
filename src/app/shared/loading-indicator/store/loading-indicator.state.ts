import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  BeginLoading,
  EndLoadingWithError,
  EndLoadingWithSuccess,
} from './loading-indicator.actions';

export enum LoadingStatus {
  Success = 'success',
  Loading = 'loading',
  Error = 'error',
}

export interface LoadingIndicatorStateModel {
  status: LoadingStatus;
}

/**
 * The default state is success to hide the progress bar.
 */
const DEFAULT_LOADING_INDICATOR_STATE: LoadingIndicatorStateModel = {
  status: LoadingStatus.Success,
};

/**
 * Loading Indicator State is a classe along with decorators
 * to describe the metadata (error and loading)
 * and action mappings.
 */
@State<LoadingIndicatorStateModel>({
  name: 'loadingIndicator',
  defaults: DEFAULT_LOADING_INDICATOR_STATE,
})
@Injectable()
export class LoadingIndicatorState {
  @Selector()
  static loading({ status }: LoadingIndicatorStateModel): boolean {
    return status === LoadingStatus.Loading;
  }

  @Selector()
  static error({ status }: LoadingIndicatorStateModel): boolean {
    return status === LoadingStatus.Error;
  }

  @Action(BeginLoading)
  beginLoading({ patchState }: StateContext<LoadingIndicatorStateModel>): void {
    patchState({ status: LoadingStatus.Loading });
  }

  @Action(EndLoadingWithSuccess)
  endLoadingWithSuccess({
    patchState,
  }: StateContext<LoadingIndicatorStateModel>): void {
    patchState({ status: LoadingStatus.Success });
  }

  @Action(EndLoadingWithError)
  endLoadingWithError({
    patchState,
  }: StateContext<LoadingIndicatorStateModel>): void {
    patchState({ status: LoadingStatus.Error });
  }
}

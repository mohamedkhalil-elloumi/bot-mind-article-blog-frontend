/**
 * The loading indicator actions are commands
 * which should trigger the loading or ending it.
 */
export class BeginLoading {
  static readonly type = '[Loading-Indicator] BeginLoading';
}

export class EndLoadingWithSuccess {
  static readonly type = '[Loading-Indicator] EndLoadingWithSuccess';
}

export class EndLoadingWithError {
  static readonly type = '[Loading-Indicator] EndLoadingWithError';
}

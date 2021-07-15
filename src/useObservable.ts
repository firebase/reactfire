import * as React from 'react';
import { Observable } from 'rxjs';
import { SuspenseSubject } from './SuspenseSubject';
import { useSuspenseEnabledFromConfigAndContext } from './firebaseApp';
import { ReactFireGlobals, ReactFireOptions } from './';

const DEFAULT_TIMEOUT = 30_000;

// Since we're side-effect free, we need to ensure our observable cache is global
const preloadedObservables: Map<string, SuspenseSubject<any>> = (globalThis as any as ReactFireGlobals)._reactFirePreloadedObservables || new Map();

if (!(globalThis as any as ReactFireGlobals)._reactFirePreloadedObservables) {
  (globalThis as any as ReactFireGlobals)._reactFirePreloadedObservables = preloadedObservables;
}

// Starts listening to an Observable.
// Call this once you know you're going to render a
// child that will consume the observable
export function preloadObservable<T>(source: Observable<T>, id: string) {
  if (preloadedObservables.has(id)) {
    return preloadedObservables.get(id) as SuspenseSubject<T>;
  } else {
    const observable = new SuspenseSubject(source, DEFAULT_TIMEOUT);
    preloadedObservables.set(id, observable);
    return observable;
  }
}

export interface ObservableStatus<T> {
  /**
   * The loading status.
   *
   * - `loading`: Waiting for the first value from an observable
   * - `error`: Something went wrong. Check `ObservableStatus.error` for more details
   * - `success`: The hook has emitted at least one value
   *
   * If `initialData` is passed in, this will skip `loading` and go straight to `success`.
   */
  status: 'loading' | 'error' | 'success';
  /**
   * Indicates whether the hook has emitted a value at some point
   *
   * If `initialData` is passed in, this will be `true`.
   */
  hasEmitted: boolean; // has received at least one value
  /**
   * If this is `true`, the hook will be emitting no further items.
   */
  isComplete: boolean;
  /**
   * The most recent value.
   *
   * If `initialData` is passed in, the first value of `data` will be the valuea provided in `initialData` **UNLESS** the underlying observable is ready, in which case it will skip `initialData`.
   */
  data: T;
  /**
   * Any error that may have occurred in the underlying observable
   */
  error: Error | undefined;
  /**
   * Promise that resolves after first emit from observable
   */
  firstValuePromise: Promise<void>;
}

export function useObservable<T = unknown>(observableId: string, source: Observable<T>, config: ReactFireOptions = {}): ObservableStatus<T> {
  if (!observableId) {
    throw new Error('cannot call useObservable without an observableId');
  }
  const observable = preloadObservable(source, observableId);

  const hasInitialData = config.hasOwnProperty('initialData') || config.hasOwnProperty('startWithValue');

  const suspenseEnabled = useSuspenseEnabledFromConfigAndContext(config.suspense);

  if (suspenseEnabled === true && !observable.hasValue && (!config?.initialData ?? !config?.startWithValue)) {
    throw observable.firstEmission;
  }

  const [latest, setValue] = React.useState(() => (observable.hasValue ? observable.value : config.initialData ?? config.startWithValue));
  const [isComplete, setIsComplete] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  React.useEffect(() => {
    const subscription = observable.subscribe({
      next: (v) => {
        setValue(() => v);
      },
      error: (e) => {
        setHasError(true);
        throw e;
      },
      complete: () => {
        setIsComplete(true);
      },
    });
    return () => subscription.unsubscribe();
  }, [observable]);

  let status: ObservableStatus<T>['status'];

  if (hasError) {
    status = 'error';
  } else if (observable.hasValue || hasInitialData) {
    status = 'success';
  } else {
    status = 'loading';
  }

  return {
    status,
    hasEmitted: observable.hasValue || hasInitialData,
    isComplete: isComplete,
    data: latest,
    error: observable.ourError,
    firstValuePromise: observable.firstEmission,
  };
}

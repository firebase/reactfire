import '@testing-library/jest-dom/extend-expect';
import { act, cleanup, render, waitFor } from '@testing-library/react';
import { act as actOnHook, renderHook } from '@testing-library/react-hooks';
import * as React from 'react';
import { of, Subject, BehaviorSubject, throwError } from 'rxjs';
import { useObservable } from '..';

describe('useObservable', () => {
  afterEach(cleanup);

  describe('Non-Suspense Mode', () => {
    it('Reports its status correctly', () => {
      const observable$: Subject<any> = new Subject();

      const { result } = renderHook(() => useObservable('non-suspense test', observable$, { suspense: false }));

      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeUndefined();
      expect(result.current.firstValuePromise).toBeInstanceOf(Promise);
      expect(result.current.hasEmitted).toEqual(false);
      expect(result.current.isComplete).toEqual(false);
      expect(result.current.status).toEqual('loading');

      actOnHook(() => observable$.next('val'));

      expect(result.current.data).toEqual('val');
      expect(result.current.error).toBeUndefined();
      expect(result.current.hasEmitted).toEqual(true);
      expect(result.current.isComplete).toEqual(false);
      expect(result.current.status).toEqual('success');
    });

    it('Sets status correctly when passed initialData', () => {
      const observable$: Subject<any> = new Subject();

      const initialData = 1;
      const asyncData = 2;

      const { result } = renderHook(() => useObservable('non-suspense test with initialData', observable$, { suspense: false, initialData }));

      expect(result.current.data).toEqual(initialData);
      expect(result.current.error).toBeUndefined();
      expect(result.current.firstValuePromise).toBeInstanceOf(Promise);
      expect(result.current.hasEmitted).toEqual(true); // set `hasEmitted` to true since there is data
      expect(result.current.isComplete).toEqual(false);
      expect(result.current.status).toEqual('success'); // skip 'loading'

      actOnHook(() => observable$.next(asyncData));

      expect(result.current.data).toEqual(asyncData);
      expect(result.current.error).toBeUndefined();
      expect(result.current.hasEmitted).toEqual(true);
      expect(result.current.isComplete).toEqual(false);
      expect(result.current.status).toEqual('success');
    });

    it('can get the value from an observable that already has one', async () => {
      const startVal = 'start';
      const observable$ = new BehaviorSubject(startVal);

      const { result } = renderHook(() => useObservable('test-warm-observable', observable$, { suspense: false }));

      expect(result.current.data).toEqual(startVal);
    });

    it('does not show stale data after navigating away', async () => {
      const startVal = 'start';
      const newVal = 'anotherValue';
      const observable$ = new BehaviorSubject(startVal);

      // a component that subscribes to the observable
      const Comp = () => {
        const { data } = useObservable('test-stale-on-rerender', observable$, { suspense: false });

        return <span data-testid="comp">{`${data}`}</span>;
      };

      // a component that conditionally renders its child based on props
      const ConditionalRenderer = ({ renderChildren }: { renderChildren: boolean }) => {
        if (renderChildren) {
          return <Comp />;
        } else {
          return <span data-testid="no-children">Filler</span>;
        }
      };

      // render the child and make sure it has the initial value
      const { findByTestId, rerender } = render(<ConditionalRenderer renderChildren={true} />);
      const element = await findByTestId('comp');
      expect(element).toHaveTextContent(startVal);

      // unrender the child, causing it to get cleaned up and not listen any more
      rerender(<ConditionalRenderer renderChildren={false} />);
      const placeHolderElement = await findByTestId('no-children');
      expect(placeHolderElement).toHaveTextContent('Filler');

      // while no components are actively subscribed, emit a new value
      act(() => observable$.next(newVal));

      // render the child again and make sure it has the new value, not a stale one
      rerender(<ConditionalRenderer renderChildren={true} />);
      await findByTestId('comp');
      expect(element).toHaveTextContent(startVal);
    });
  });

  describe('Suspense Mode', () => {
    it('throws an error if no observableId is provided', () => {
      const observable$: Subject<any> = new Subject();

      // @ts-ignore: we're intentionally trying to break this
      const { result } = renderHook(() => useObservable(undefined, observable$, { suspense: true }));

      expect(result.error).toBeInstanceOf(Error);
    });

    it('can return a startval and then the observable once it is ready', () => {
      const startVal = 'howdy';
      const observableVal = "y'all";
      const observable$ = new Subject<any>();

      const { result } = renderHook(() => useObservable('test-2', observable$, { initialData: startVal, suspense: true }));

      expect(result.current.data).toEqual(startVal);

      // prove that it actually does emit the value from the observable too
      actOnHook(() => observable$.next(observableVal));
      expect(result.current.data).toEqual(observableVal);
    });

    it('throws an error if there is an error on initial fetch', async () => {
      const error = new Error('I am an error');
      const observable$ = throwError(error);

      const { result } = renderHook(() => useObservable('test-error', observable$, { suspense: true }));
      expect(result.error).toEqual(error);
    });

    it('provides the value, rather than initialData, when the observable is ready right away', () => {
      const startVal = 'howdy';
      const observableVal = "y'all";
      const observable$ = of(observableVal);

      const Component = () => {
        const { data: val } = useObservable('test-3', observable$, { initialData: startVal, suspense: true });
        expect(val).toEqual(observableVal);
        return <h1>Hello</h1>;
      };

      render(<Component />);
    });

    it('works with Suspense', async () => {
      const observableFinalVal = "y'all";
      const observable$ = new Subject();
      const actualComponentId = 'actual-component';
      const fallbackComponentId = 'fallback-component';

      const FallbackComponent = () => <h1 data-testid={fallbackComponentId}>Fallback</h1>;

      const Component = () => {
        const { data: val } = useObservable('test-suspense', observable$, { suspense: true });
        return <h1 data-testid={actualComponentId}>{JSON.stringify(val)}</h1>;
      };

      const { queryByTestId, getByTestId } = render(
        <React.Suspense fallback={<FallbackComponent />}>
          <Component />
        </React.Suspense>
      );

      // make sure Suspense renders the fallback component if the observable has not emitted a value
      expect(getByTestId(fallbackComponentId)).toBeInTheDocument();
      expect(queryByTestId(actualComponentId)).toBeNull();

      act(() => observable$.next(observableFinalVal));
      await waitFor(() => getByTestId(actualComponentId));

      // make sure Suspense correctly renders its child after the observable emits a value
      expect(getByTestId(actualComponentId)).toBeInTheDocument();
      expect(getByTestId(actualComponentId)).toHaveTextContent(observableFinalVal);
      expect(queryByTestId(fallbackComponentId)).toBeNull();
    });

    it('emits new values as the observable changes', async () => {
      const startVal = 'start';
      const values = ['a', 'b', 'c'];
      const observable$ = new Subject();

      const { result } = renderHook(() => useObservable('test-changes', observable$, { initialData: startVal, suspense: true }));

      expect(result.current.data).toEqual(startVal);

      values.forEach((value) => {
        actOnHook(() => observable$.next(value));
        expect(result.current.data).toEqual(value);
      });
    });

    it('returns the most recent value of an observable to all subscribers of an observableId', async () => {
      const values = ['a', 'b', 'c'];
      const observable$ = new Subject();
      const observableId = 'my-observable-id';
      const firstComponentId = 'first';
      const secondComponentId = 'second';

      const ObservableConsumer = (props: Object) => {
        const { data: val } = useObservable(observableId, observable$, { suspense: true });

        return <h1 {...props}>{JSON.stringify(val)}</h1>;
      };

      const Component = ({ renderSecondComponent }: { renderSecondComponent: boolean }) => {
        return (
          <React.Suspense fallback="loading">
            <ObservableConsumer data-testid={firstComponentId} />
            {renderSecondComponent ? <ObservableConsumer data-testid={secondComponentId} /> : null}
          </React.Suspense>
        );
      };

      const { getByTestId, rerender } = render(<Component renderSecondComponent={false} />);

      // emit one value to the first component (second one isn't rendered yet)
      act(() => observable$.next(values[0]));
      const comp = await waitFor(() => getByTestId(firstComponentId));
      expect(comp).toHaveTextContent(values[0]);

      // emit a second value to the first component (second one still isn't rendered)
      act(() => observable$.next(values[1]));
      expect(comp).toHaveTextContent(values[1]);

      // keep the original component around, but now render the second one.
      // they both use the same observableId
      rerender(<Component renderSecondComponent={true} />);

      // the second component should start by receiving the latest value
      // since the first component has already been subscribed
      const comp2 = await waitFor(() => getByTestId(secondComponentId));
      expect(comp2).toHaveTextContent(values[1]);
    });

    it(`emits the new observable's value if the observable is swapped out`, async () => {
      const obs1$ = new Subject();
      const obs2$ = new Subject();

      let currentObs$ = obs1$;
      let currentObsId = 'observable-1';

      const ObservableConsumer = (props: Object) => {
        const { data: val } = useObservable(currentObsId, currentObs$, { suspense: true });

        return <h1 {...props}>{JSON.stringify(val)}</h1>;
      };

      const Component = () => {
        return (
          <React.Suspense fallback={<span data-testid="fallback">Loading...</span>}>
            <ObservableConsumer data-testid={'consumer'} />
          </React.Suspense>
        );
      };

      const { getByTestId, rerender } = render(<Component />);

      act(() => obs1$.next('Jeff'));
      const comp = await waitFor(() => getByTestId('consumer'));
      expect(comp).toBeInTheDocument();

      currentObs$ = obs2$;
      currentObsId = 'observable-2';

      rerender(<Component />);
      expect(getByTestId('fallback')).toBeInTheDocument();

      act(() => obs2$.next('James'));
      const refreshedComp = await waitFor(() => getByTestId('consumer'));
      expect(refreshedComp).toBeInTheDocument();

      // if useObservable doesn't re-emit, the value here will still be "Jeff"
      expect(refreshedComp).toHaveTextContent('James');
    });
  });
});

import * as React from 'react';

export interface SuspensePerfProps {
  children: React.ReactNode;
  traceId: string;
  fallback: React.ReactNode;
}

export function SuspenseWithPerf({ children, traceId, fallback }: SuspensePerfProps): JSX.Element {
  // TODO: Should this import firebase/performance?

  const entries = performance?.getEntriesByName?.(traceId, 'measure') || [];
  const startMarkName = `_${traceId}Start[${entries.length}]`;
  const endMarkName = `_${traceId}End[${entries.length}]`;

  const Fallback = () => {
    React.useLayoutEffect(() => {
      performance?.mark?.(startMarkName);

      return () => {
        performance?.mark?.(endMarkName);
        performance?.measure?.(traceId, startMarkName, endMarkName);
      };
    }, []);

    return <>{fallback}</>;
  };

  return <React.Suspense fallback={<Fallback />}>{children}</React.Suspense>;
}

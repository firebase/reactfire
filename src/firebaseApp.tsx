import * as React from 'react';
import { getApps, initializeApp, registerVersion } from 'firebase/app';

import type { FirebaseApp, FirebaseOptions } from 'firebase/app';

// INVESTIGATE I don't like magic strings, can we have export this in js-sdk?
const DEFAULT_APP_NAME = '[DEFAULT]';

const FirebaseAppContext = React.createContext<FirebaseApp | undefined>(undefined);
const SuspenseEnabledContext = React.createContext<boolean>(false);

interface FirebaseAppProviderProps {
  firebaseApp?: FirebaseApp;
  firebaseConfig?: FirebaseOptions;
  appName?: string;
  suspense?: boolean;
}

// @ts-ignore: "__REACTFIRE_VERSION__" is replaced with actual ReactFire version (see babel.config.js)
export const version = __REACTFIRE_VERSION__;

const shallowEq = (a: { [key: string]: any }, b: { [key: string]: any }) => a === b || [...Object.keys(a), ...Object.keys(b)].every((key) => a[key] === b[key]);

export function FirebaseAppProvider(props: React.PropsWithChildren<FirebaseAppProviderProps>) {
  const { firebaseConfig, appName, suspense } = props;

  const firebaseApp: FirebaseApp = React.useMemo(() => {
    if (props.firebaseApp) {
      return props.firebaseApp;
    }

    const existingApp = getApps().find((app) => app.name === (appName || DEFAULT_APP_NAME));
    if (existingApp) {
      if (firebaseConfig && shallowEq(existingApp.options, firebaseConfig)) {
        return existingApp;
      } else {
        throw new Error(
          `Does not match the options already provided to the ${appName || 'default'} firebase app instance, give this new instance a different appName.`
        );
      }
    } else {
      if (!firebaseConfig) {
        throw new Error('No firebaseConfig provided');
      }

      const reactVersion = React.version || 'unknown';
      registerVersion('react', reactVersion);
      registerVersion('reactfire', version);
      return initializeApp(firebaseConfig, appName);
    }
  }, [props.firebaseApp, firebaseConfig, appName]);

  return (
    <FirebaseAppContext.Provider value={firebaseApp}>
      <SuspenseEnabledContext.Provider value={suspense ?? false} {...props} />
    </FirebaseAppContext.Provider>
  );
}

export function useIsSuspenseEnabled(): boolean {
  const suspense = React.useContext(SuspenseEnabledContext);

  // default to false if not available in context
  return suspense ?? false;
}

export function useSuspenseEnabledFromConfigAndContext(suspenseFromConfig?: boolean): boolean {
  let suspenseFromContext = React.useContext(SuspenseEnabledContext);

  // prioritize config over context
  if (suspenseFromConfig !== undefined) {
    return suspenseFromConfig;
  }

  return suspenseFromContext;
}

export function useFirebaseApp() {
  const firebaseApp = React.useContext(FirebaseAppContext);
  if (!firebaseApp) {
    throw new Error('Cannot call useFirebaseApp unless your component is within a FirebaseAppProvider');
  }

  return firebaseApp;
}

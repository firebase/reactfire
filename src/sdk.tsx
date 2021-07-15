import * as React from 'react';

import type { Auth } from 'firebase/auth';
import type { FirebaseDatabase } from 'firebase/database';
import type { FirebaseFirestore } from 'firebase/firestore';
import type { FirebasePerformance } from 'firebase/performance';
import type { StorageService } from 'firebase/storage';
import type { RemoteConfig } from 'firebase/remote-config';
import { useFirebaseApp } from './firebaseApp';

const AuthSdkContext = React.createContext<Auth | undefined>(undefined);
const DatabaseSdkContext = React.createContext<FirebaseDatabase | undefined>(undefined);
const FirestoreSdkContext = React.createContext<FirebaseFirestore | undefined>(undefined);
const StorageSdkContext = React.createContext<StorageService | undefined>(undefined);
const PerformanceSdkContext = React.createContext<FirebasePerformance | undefined>(undefined);
const RemoteConfigSdkContext = React.createContext<RemoteConfig | undefined>(undefined);

type FirebaseSdks = Auth | FirebaseDatabase | FirebaseFirestore | FirebasePerformance | StorageService | RemoteConfig;

function getSdkProvider<Sdk extends FirebaseSdks>(SdkContext: React.Context<Sdk | undefined>) {
  return function SdkProvider(props: React.PropsWithChildren<{ sdk: Sdk }>) {
    const contextualAppName = useFirebaseApp().name;
    let sdkAppName;

    // @ts-ignore Auth doesn't have field 'app'
    if (props.sdk.app) {
      // @ts-ignore Auth doesn't have field 'app'
      sdkAppName = props.sdk.app.name;

      // @ts-ignore only Auth has field 'name'
    } else if (props.sdk.name) {
      // @ts-ignore only Auth has field 'name'
      sdkAppName = props.sdk.name;
    }

    if (sdkAppName !== contextualAppName) {
      throw new Error('sdk was initialized with a different firebase app');
    }

    if (!props.sdk) {
      throw new Error('no sdk provided');
    }

    return <SdkContext.Provider value={props.sdk} {...props} />;
  };
}

function useSdk<Sdk>(SdkContext: React.Context<Sdk | undefined>): Sdk {
  const sdk = React.useContext(SdkContext);

  if (!sdk) {
    throw new Error('SDK not found. useSdk must be called from within a provider');
  }

  return sdk;
}

export const AuthProvider = getSdkProvider<Auth>(AuthSdkContext);
export const DatabaseProvider = getSdkProvider<FirebaseDatabase>(DatabaseSdkContext);
export const FirestoreProvider = getSdkProvider<FirebaseFirestore>(FirestoreSdkContext);
export const PerformanceProvider = getSdkProvider<FirebasePerformance>(PerformanceSdkContext);
export const StorageProvider = getSdkProvider<StorageService>(StorageSdkContext);
export const RemoteConfigProvider = getSdkProvider<RemoteConfig>(RemoteConfigSdkContext);

export const useAuth = () => useSdk<Auth>(AuthSdkContext);
export const useDatabase = () => useSdk<FirebaseDatabase>(DatabaseSdkContext);
export const useFirestore = () => useSdk<FirebaseFirestore>(FirestoreSdkContext);
export const usePerformance = () => useSdk<FirebasePerformance>(PerformanceSdkContext);
export const useStorage = () => useSdk<StorageService>(StorageSdkContext);
export const useRemoteConfig = () => useSdk<RemoteConfig>(RemoteConfigSdkContext);

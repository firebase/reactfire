import { Observable } from 'rxjs';
import {
  ensureInitialized,
  getValue as rcGetValue,
  getString as rcGetString,
  getNumber as rcGetNumber,
  getBoolean as rcGetBoolean,
  getAll as rcGetAll,
} from 'firebase/remote-config';

import type { RemoteConfig, Value as RemoteConfigValue } from 'firebase/remote-config';

export type AllParameters = {
  [key: string]: RemoteConfigValue;
};

interface ParameterSettings<T> {
  remoteConfig: RemoteConfig;
  key: string;
  getter: (key: string) => T;
}

// TODO(davideast): Replace with RxFire functions when they land
function parameter$<T>({ remoteConfig, key, getter }: ParameterSettings<T>): Observable<T> {
  return new Observable((subscriber) => {
    ensureInitialized(remoteConfig).then(() => {
      // 'this' for the getter loses context in the next()
      // call, so it needs to be bound.
      subscriber.next(getter.bind(remoteConfig)(key));
    });
  });
}

export function getValue(remoteConfig: RemoteConfig, key: string) {
  const getter = () => rcGetValue(remoteConfig, key);
  return parameter$({ remoteConfig, key, getter });
}

export function getString(remoteConfig: RemoteConfig, key: string) {
  const getter = () => rcGetString(remoteConfig, key);
  return parameter$<string>({ remoteConfig, key, getter });
}

export function getNumber(remoteConfig: RemoteConfig, key: string) {
  const getter = () => rcGetNumber(remoteConfig, key);
  return parameter$<number>({ remoteConfig, key, getter });
}

export function getBoolean(remoteConfig: RemoteConfig, key: string) {
  const getter = () => rcGetBoolean(remoteConfig, key);
  return parameter$<boolean>({ remoteConfig, key, getter });
}

export function getAll(remoteConfig: RemoteConfig) {
  const getter = () => rcGetAll(remoteConfig);
  // No key is needed for getAll()
  return parameter$<AllParameters>({ remoteConfig, key: '', getter });
}

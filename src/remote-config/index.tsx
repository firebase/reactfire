import { useRemoteConfig } from '../';
import { useObservable, ObservableStatus } from '../useObservable';
import { getValue, getString, getBoolean, getNumber, getAll, AllParameters } from './getValue';
import { Observable } from 'rxjs';

import type { RemoteConfig, Value as RemoteConfigValue } from 'firebase/remote-config';

type Getter$<T> = (remoteConfig: RemoteConfig, key: string) => Observable<T>;

interface RemoteConfigWithPrivate extends RemoteConfig {
  // This is a private API, assume optional
  _storage?: { appName: string };
}

/**
 * Helper function to construct type safe functions. Since Remote Config has
 * methods that return different types for values, we need to be extra safe
 * to make sure we are not returning improper types by accident.
 * @param key
 * @param getter
 * @param remoteConfig
 */
function useRemoteConfigValue_INTERNAL<T>(key: string, getter: Getter$<T>): ObservableStatus<T> {
  const remoteConfig = useRemoteConfig();

  // INVESTIGATE need to use a public API to get at the app name, one doesn't appear to exist...
  // we might need to iterate over the Firebase apps and check for remoteConfig equality? this works for now
  const appName = (remoteConfig as RemoteConfigWithPrivate)._storage?.appName;
  const $value = getter(remoteConfig, key);

  const observableId = `remoteConfig:${key}:${getter.name}:${appName}`;
  return useObservable<T>(observableId, $value);
}

/**
 * Accepts a key and optionally a Remote Config instance. Returns a
 * Remote Config Value.
 *
 * @param key The parameter key in Remote Config
 * @param remoteConfig Optional instance. If not provided ReactFire will either grab the default instance or lazy load.
 */
export function useRemoteConfigValue(key: string): ObservableStatus<RemoteConfigValue> {
  return useRemoteConfigValue_INTERNAL<RemoteConfigValue>(key, getValue);
}

/**
 * Convience method similar to useRemoteConfigValue. Returns a `string` from a Remote Config parameter.
 * @param key The parameter key in Remote Config
 * @param remoteConfig Optional instance. If not provided ReactFire will either grab the default instance or lazy load.
 */
export function useRemoteConfigString(key: string): ObservableStatus<string> {
  return useRemoteConfigValue_INTERNAL<string>(key, getString);
}

/**
 * Convience method similar to useRemoteConfigValue. Returns a `number` from a Remote Config parameter.
 * @param key The parameter key in Remote Config
 * @param remoteConfig Optional instance. If not provided ReactFire will either grab the default instance or lazy load.
 */
export function useRemoteConfigNumber(key: string): ObservableStatus<number> {
  return useRemoteConfigValue_INTERNAL<number>(key, getNumber);
}

/**
 * Convience method similar to useRemoteConfigValue. Returns a `boolean` from a Remote Config parameter.
 * @param key The parameter key in Remote Config
 * @param remoteConfig Optional instance. If not provided ReactFire will either grab the default instance or lazy load.
 */
export function useRemoteConfigBoolean(key: string): ObservableStatus<boolean> {
  return useRemoteConfigValue_INTERNAL<boolean>(key, getBoolean);
}

/**
 * Convience method similar to useRemoteConfigValue. Returns allRemote Config parameters.
 * @param key The parameter key in Remote Config
 * @param remoteConfig Optional instance. If not provided ReactFire will either grab the default instance or lazy load.
 */
export function useRemoteConfigAll(key: string): ObservableStatus<AllParameters> {
  return useRemoteConfigValue_INTERNAL<AllParameters>(key, getAll);
}

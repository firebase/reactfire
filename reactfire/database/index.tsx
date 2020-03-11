import { database } from 'firebase/app';
import { list, object, QueryChange, listVal } from 'rxfire/database';
import { ReactFireOptions, useObservable, checkIdField, checkStartWithValue } from '..';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const QUERY_UNIQUE_IDS = '_reactFireDatabaseQueryUniqueIds';

// Since we're side-effect free, we need to ensure our observableId cache is global
const cachedUniqueIds: Map<database.Query, string> = globalThis[QUERY_UNIQUE_IDS] || new Map();

if (!globalThis[QUERY_UNIQUE_IDS]) {
  globalThis[QUERY_UNIQUE_IDS] = cachedUniqueIds;
}

function getUnqiueIdForDatabaseQuery(query: database.Query) {
  for (const [cachedQuery, cachedUniqueId] of cachedUniqueIds.entries()) {
    if (cachedQuery.isEqual(query)) {
      return cachedUniqueId;
    }
  }
  const uniqueId = Math.random()
    .toString(36)
    .split('.')[1];
  cachedUniqueIds.set(query, uniqueId);
  return uniqueId;
}

/**
 * Subscribe to a Realtime Database object
 *
 * @param ref - Reference to the DB object you want to listen to
 * @param options
 */
export function useDatabaseObject<T = unknown>(ref: database.Reference, options?: ReactFireOptions<T>): QueryChange | T {
  return useObservable(object(ref), `database:object:${ref.toString()}`, options ? options.startWithValue : undefined);
}

// ============================================================================
// TODO: switch to rxfire's objectVal once this PR is merged:
// https://github.com/firebase/firebase-js-sdk/pull/2352

function objectVal<T>(query: database.Query, keyField?: string): Observable<T> {
  return object(query).pipe(map(change => changeToData(change, keyField) as T));
}

function changeToData(change: QueryChange, keyField?: string): {} {
  const val = change.snapshot.val();

  // don't worry about setting IDs if the value is a primitive type
  if (typeof val !== 'object') {
    return val;
  }

  return {
    ...change.snapshot.val(),
    ...(keyField ? { [keyField]: change.snapshot.key } : null)
  };
}
// ============================================================================

export function useDatabaseObjectData<T>(ref: database.Reference, options?: ReactFireOptions<T>): T {
  const idField = checkIdField(options);
  return useObservable(objectVal(ref, idField), `database:objectVal:${ref.toString()}:idField=${idField}`, checkStartWithValue(options));
}

/**
 * Subscribe to a Realtime Database list
 *
 * @param ref - Reference to the DB List you want to listen to
 * @param options
 */
export function useDatabaseList<T = { [key: string]: unknown }>(
  ref: database.Reference | database.Query,
  options?: ReactFireOptions<T[]>
): QueryChange[] | T[] {
  const hash = `database:list:${getUnqiueIdForDatabaseQuery(ref)}`;

  return useObservable(list(ref), hash, options ? options.startWithValue : undefined);
}

export function useDatabaseListData<T = { [key: string]: unknown }>(ref: database.Reference | database.Query, options?: ReactFireOptions<T[]>): T[] {
  const idField = checkIdField(options);
  return useObservable(listVal(ref, idField), `database:listVal:${getUnqiueIdForDatabaseQuery(ref)}:idField=${idField}`, checkStartWithValue(options));
}

import { collectionData, doc, docData, fromRef } from 'rxfire/firestore';
import { ReactFireOptions, useObservable, checkIdField, ReactFireGlobals } from './';
import { preloadObservable, ObservableStatus } from './useObservable';
import { first } from 'rxjs/operators';

import { Query as FirestoreQuery, QuerySnapshot, DocumentReference, queryEqual, DocumentData, DocumentSnapshot } from 'firebase/firestore';

// Since we're side-effect free, we need to ensure our observableId cache is global
const cachedQueries: Array<FirestoreQuery> = (globalThis as any as ReactFireGlobals)._reactFireFirestoreQueryCache || [];

if (!(globalThis as any as ReactFireGlobals)._reactFireFirestoreQueryCache) {
  (globalThis as any as ReactFireGlobals)._reactFireFirestoreQueryCache = cachedQueries;
}

function getUniqueIdForFirestoreQuery(query: FirestoreQuery) {
  const index = cachedQueries.findIndex((cachedQuery) => queryEqual(cachedQuery, query));
  if (index > -1) {
    return index;
  }
  return cachedQueries.push(query) - 1;
}

/**
 * Preload a subscription to a Firestore document reference.
 *
 * Use this to warm up `useFirestoreDoc` for a specific document
 */
export async function preloadFirestoreDoc(refProvider: () => Promise<DocumentReference>) {
  const ref = await refProvider();
  return preloadObservable(doc(ref), getDocObservableId(ref));
}

function getDocObservableId(ref: DocumentReference) {
  return `firestore:doc:${ref.firestore.app.name}:${ref.path}`;
}

/**
 * Suscribe to Firestore Document changes
 *
 * You can preload data for this hook by calling `preloadFirestoreDoc`
 */
export function useFirestoreDoc<T = DocumentData>(ref: DocumentReference<T>, options?: ReactFireOptions<T>): ObservableStatus<DocumentSnapshot<T>> {
  const observableId = getDocObservableId(ref);
  const observable$ = doc(ref);

  return useObservable(observableId, observable$, options);
}

/**
 * Get a firestore document and don't subscribe to changes
 */
export function useFirestoreDocOnce<T = DocumentData>(ref: DocumentReference<T>, options?: ReactFireOptions<T>): ObservableStatus<DocumentSnapshot<T>> {
  const observableId = `firestore:docOnce:${ref.firestore.app.name}:${ref.path}`;
  const observable$ = doc(ref).pipe(first());

  return useObservable(observableId, observable$, options);
}

/**
 * Suscribe to Firestore Document changes and unwrap the document into a plain object
 */
export function useFirestoreDocData<T = unknown>(ref: DocumentReference<T>, options?: ReactFireOptions<T>): ObservableStatus<T> {
  const idField = options ? checkIdField(options) : 'NO_ID_FIELD';

  const observableId = `firestore:docData:${ref.firestore.app.name}:${ref.path}:idField=${idField}`;
  const observable = docData(ref, idField);

  return useObservable(observableId, observable, options);
}

/**
 * Get a Firestore document, unwrap the document into a plain object, and don't subscribe to changes
 */
export function useFirestoreDocDataOnce<T = unknown>(ref: DocumentReference<T>, options?: ReactFireOptions<T>): ObservableStatus<T> {
  const idField = options ? checkIdField(options) : 'NO_ID_FIELD';

  const observableId = `firestore:docDataOnce:${ref.firestore.app.name}:${ref.path}:idField=${idField}`;
  const observable$ = docData(ref, idField).pipe(first());

  return useObservable(observableId, observable$, options);
}

/**
 * Subscribe to a Firestore collection
 */
export function useFirestoreCollection<T = DocumentData>(query: FirestoreQuery<T>, options?: ReactFireOptions<T[]>): ObservableStatus<QuerySnapshot<T>> {
  const observableId = `firestore:collection:${getUniqueIdForFirestoreQuery(query)}`;
  const observable$ = fromRef(query);

  return useObservable(observableId, observable$, options);
}

/**
 * Subscribe to a Firestore collection and unwrap the snapshot into an array.
 */
export function useFirestoreCollectionData<T = DocumentData>(query: FirestoreQuery<T>, options?: ReactFireOptions<T[]>): ObservableStatus<T[]> {
  const idField = options ? checkIdField(options) : 'NO_ID_FIELD';
  const observableId = `firestore:collectionData:${getUniqueIdForFirestoreQuery(query)}:idField=${idField}`;
  const observable$ = collectionData(query, idField);

  return useObservable(observableId, observable$, options);
}

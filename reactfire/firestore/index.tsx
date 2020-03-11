import { firestore } from 'firebase/app';
import { collectionData, doc, docData, fromCollectionRef } from 'rxfire/firestore';
import { preloadFirestore, ReactFireOptions, useObservable, checkIdField, checkStartWithValue } from '..';
import { preloadObservable } from '../useObservable';
import { first } from 'rxjs/operators';
import { useFirebaseApp } from '../firebaseApp';

const QUERY_UNIQUE_IDS = '_reactFireFirestoreQueryUniqueIds';

// Since we're side-effect free, we need to ensure our observableId cache is global
const cachedUniqueIds: Map<firestore.Query, string> = globalThis[QUERY_UNIQUE_IDS] || new Map();

if (!globalThis[QUERY_UNIQUE_IDS]) {
  globalThis[QUERY_UNIQUE_IDS] = cachedUniqueIds;
}

function getUnqiueIdForFirestoreQuery(query: firestore.Query) {
  for (const [cachedQuery, cachedUniqueId] of cachedUniqueIds.entries()) {
    if (cachedQuery.isEqual(query as any)) {
      return cachedUniqueId;
    }
  }
  const uniqueId = Math.random()
    .toString(36)
    .split('.')[1];
  cachedUniqueIds.set(query, uniqueId);
  return uniqueId;
}

// starts a request for a firestore doc.
// imports the firestore SDK automatically
// if it hasn't been imported yet.
//
// there's a decent chance this gets called before the Firestore SDK
// has been imported, so it takes a refProvider instead of a ref
export function preloadFirestoreDoc(
  refProvider: (firestore: firebase.firestore.Firestore) => firestore.DocumentReference,
  options?: { firebaseApp?: firebase.app.App }
) {
  const firebaseApp = options?.firebaseApp || useFirebaseApp();
  return preloadFirestore({ firebaseApp }).then(firestore => {
    const ref = refProvider(firestore());
    return preloadObservable(doc(ref), `firestore:doc:${firebaseApp.name}:${ref.path}`);
  });
}

/**
 * Suscribe to Firestore Document changes
 *
 * @param ref - Reference to the document you want to listen to
 * @param options
 */
export function useFirestoreDoc<T = unknown>(ref: firestore.DocumentReference, options?: ReactFireOptions<T>): T extends {} ? T : firestore.DocumentSnapshot {
  return useObservable(doc(ref), `firestore:doc:${ref.firestore.app.name}:${ref.path}`, options ? options.startWithValue : undefined);
}

/**
 * Get a firestore document and don't subscribe to changes
 *
 * @param ref - Reference to the document you want to get
 * @param options
 */
export function useFirestoreDocOnce<T = unknown>(
  ref: firestore.DocumentReference,
  options?: ReactFireOptions<T>
): T extends {} ? T : firestore.DocumentSnapshot {
  return useObservable(doc(ref).pipe(first()), `firestore:docOnce:${ref.firestore.app.name}:${ref.path}`, checkStartWithValue(options));
}

/**
 * Suscribe to Firestore Document changes
 *
 * @param ref - Reference to the document you want to listen to
 * @param options
 */
export function useFirestoreDocData<T = unknown>(ref: firestore.DocumentReference, options?: ReactFireOptions<T>): T {
  const idField = checkIdField(options);
  return useObservable(docData(ref, idField), `firestore:docData:${ref.firestore.app.name}:${ref.path}:idField=${idField}`, checkStartWithValue(options));
}

/**
 * Get a firestore document and don't subscribe to changes
 *
 * @param ref - Reference to the document you want to get
 * @param options
 */
export function useFirestoreDocDataOnce<T = unknown>(ref: firestore.DocumentReference, options?: ReactFireOptions<T>): T {
  const idField = checkIdField(options);
  return useObservable(
    docData(ref, idField).pipe(first()),
    `firestore:docDataOnce:${ref.firestore.app.name}:${ref.path}:idField=${idField}`,
    checkStartWithValue(options)
  );
}

/**
 * Subscribe to a Firestore collection
 *
 * @param ref - Reference to the collection you want to listen to
 * @param options
 */
export function useFirestoreCollection<T = { [key: string]: unknown }>(
  query: firestore.Query,
  options?: ReactFireOptions<T[]>
): T extends {} ? T[] : firestore.QuerySnapshot {
  const queryId = `firestore:collection:${getUnqiueIdForFirestoreQuery(query)}`;
  return useObservable(fromCollectionRef(query), queryId, checkStartWithValue(options));
}

/**
 * Subscribe to a Firestore collection and unwrap the snapshot.
 *
 * @param ref - Reference to the collection you want to listen to
 * @param options
 */
export function useFirestoreCollectionData<T = { [key: string]: unknown }>(query: firestore.Query, options?: ReactFireOptions<T[]>): T[] {
  const idField = checkIdField(options);
  const queryId = `firestore:collectionData:${getUnqiueIdForFirestoreQuery(query)}:idField=${idField}`;

  return useObservable(collectionData(query, idField), queryId, checkStartWithValue(options));
}

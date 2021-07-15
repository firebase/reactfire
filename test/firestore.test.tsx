import { renderHook, act as actOnHook, cleanup as hooksCleanup } from '@testing-library/react-hooks';

import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  useFirestoreDoc,
  useFirestoreCollection,
  FirebaseAppProvider,
  useFirestoreCollectionData,
  useFirestoreDocData,
  useFirestoreDocOnce,
  useFirestoreDocDataOnce,
  FirestoreProvider,
} from '..';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import fetch from 'node-fetch';
import { baseConfig } from './appConfig';
import { randomString } from './test-utils';

import { addDoc, collection, doc, getFirestore, query, setDoc, useFirestoreEmulator, where } from 'firebase/firestore';

describe('Firestore', () => {
  const app = initializeApp(baseConfig, 'firestore-test-suite');
  const db = getFirestore(app);
  useFirestoreEmulator(db, 'localhost', 8080);

  const Provider = ({ children }: { children: React.ReactNode }) => (
    <FirebaseAppProvider firebaseApp={app} suspense={true}>
      <FirestoreProvider sdk={db}>{children}</FirestoreProvider>
    </FirebaseAppProvider>
  );

  afterEach(async () => {
    hooksCleanup();

    // clear all Firestore emulator data
    // do this AFTER cleaning up hooks, otherwise they'll re-emit values
    await fetch(`http://localhost:8080/emulator/v1/projects/rxfire-525a3/databases/(default)/documents`, { method: 'DELETE' });
  });

  test('double check - emulator is running', async () => {
    // IF THIS TEST FAILS, MAKE SURE YOU'RE RUNNING THESE TESTS BY DOING:
    // yarn test

    await addDoc(collection(db, randomString()), { a: 'hello' });
  });

  describe('useFirestoreDoc', () => {
    it('can get a Firestore document', async () => {
      const mockData = { a: 'hello' };

      const ref = doc(collection(db, randomString()), randomString());

      await setDoc(ref, mockData);

      const { result, waitFor } = renderHook(() => useFirestoreDoc(ref), { wrapper: Provider });

      await waitFor(() => result.current.status === 'success');

      const dataFromFirestore = result.current.data;

      expect(dataFromFirestore).toBeDefined();
      const data = dataFromFirestore.data();
      expect(data).toBeDefined();
      expect(data).toEqual(mockData);
    });
  });

  describe('useFirestoreDocData', () => {
    it('can get a Firestore document', async () => {
      const mockData = { a: 'hello' };

      const ref = doc(collection(db, randomString()), randomString());

      await setDoc(ref, mockData);

      const { result, waitFor } = renderHook(() => useFirestoreDocData<any>(ref, { idField: 'id' }), { wrapper: Provider });

      await waitFor(() => result.current.status === 'success');

      const data = result.current.data;

      expect(data).toBeDefined();
      expect(data.a).toEqual(mockData.a);
      expect(data.id).toBeDefined();
    });
  });

  describe('useFirestoreDocOnce', () => {
    it('works when the document does not exist, and does not update when it is created', async () => {
      const ref = doc(collection(db, randomString()), randomString());

      const { result: subscribeResult, waitFor: waitForSubscribe } = renderHook(() => useFirestoreDoc(ref), { wrapper: Provider });
      const { result: onceResult, waitFor: waitForOnce } = renderHook(() => useFirestoreDocOnce(ref), { wrapper: Provider });

      await waitForSubscribe(() => subscribeResult.current.status === 'success');
      await waitForOnce(() => onceResult.current.status === 'success');

      expect(onceResult.current.data.exists()).toEqual(false);

      await actOnHook(() => setDoc(ref, { a: 'test' }));

      await waitForSubscribe(() => subscribeResult.current.data.exists() === true);

      expect(onceResult.current.data.exists()).toEqual(false);
    });
  });

  describe('useFirestoreDocDataOnce', () => {
    it('does not update on database changes', async () => {
      const mockData1 = { a: 'hello' };
      const mockData2 = { a: 'goodbye' };

      const ref = doc(collection(db, randomString()), randomString());

      await setDoc(ref, mockData1);
      const { result: subscribeResult, waitFor: waitForSubscribe } = renderHook(() => useFirestoreDocData<any>(ref, { idField: 'id' }), { wrapper: Provider });
      const { result: onceResult, waitFor: waitForOnce } = renderHook(() => useFirestoreDocDataOnce<any>(ref, { idField: 'id' }), { wrapper: Provider });

      await waitForSubscribe(() => subscribeResult.current.status === 'success');
      await waitForOnce(() => onceResult.current.status === 'success');

      expect(onceResult.current.data.a).toEqual(mockData1.a);
      expect(onceResult.current.data).toEqual(subscribeResult.current.data);

      await actOnHook(() => setDoc(ref, mockData2));

      await waitForSubscribe(() => subscribeResult.current.data.a === mockData2.a);

      expect(onceResult.current.data.a).toEqual(mockData1.a);
      expect(subscribeResult.current.data).not.toEqual(onceResult.current.data);
    });
  });

  describe('useFirestoreCollection', () => {
    it('can get a Firestore collection', async () => {
      const mockData1 = { a: 'hello' };
      const mockData2 = { a: 'goodbye' };

      const ref = collection(db, randomString());

      await addDoc(ref, mockData1);
      await addDoc(ref, mockData2);

      const { result, waitFor } = renderHook(() => useFirestoreCollection(ref), { wrapper: Provider });

      await waitFor(() => result.current.status === 'success');

      const collectionSnap = result.current.data;
      expect(collectionSnap.docs.length).toEqual(2);
    });

    it('Returns different data for different queries on the same path', async () => {
      const mockData1 = { a: 'hello' };
      const mockData2 = { a: 'goodbye' };

      const ref = collection(db, randomString());
      const filteredRef = query(ref, where('a', '==', 'hello'));

      await addDoc(ref, mockData1);
      await addDoc(ref, mockData2);

      const { result: unfilteredResult, waitFor: waitForUnfiltered } = renderHook(() => useFirestoreCollection(ref), { wrapper: Provider });
      const { result: filteredResult, waitFor: waitForFiltered } = renderHook(() => useFirestoreCollection(filteredRef), { wrapper: Provider });

      await waitForUnfiltered(() => unfilteredResult.current.status === 'success');
      await waitForFiltered(() => filteredResult.current.status === 'success');

      const filteredSnap = filteredResult.current.data;
      const unfilteredSnap = unfilteredResult.current.data;

      // filteredList's length should be 1 since we only added one value that matches its query
      expect(filteredSnap.docs.length).toEqual(1);

      // the full list should be bigger than the filtered list
      expect(unfilteredSnap.docs.length).toBeGreaterThan(filteredSnap.docs.length);
    });
  });

  describe('useFirestoreCollectionData', () => {
    it('can get a Firestore collection', async () => {
      const mockData1 = { a: 'hello' };
      const mockData2 = { a: 'goodbye' };

      const ref = collection(db, randomString());

      await addDoc(ref, mockData1);
      await addDoc(ref, mockData2);

      const { result, waitFor } = renderHook(() => useFirestoreCollectionData<any>(ref, { idField: 'id' }), { wrapper: Provider });

      await waitFor(() => result.current.status === 'success');

      expect(result.current.data.length).toEqual(2);
    });

    it('Returns different data for different queries on the same path', async () => {
      const mockData1 = { a: 'hello' };
      const mockData2 = { a: 'goodbye' };

      const ref = collection(db, randomString());
      const filteredRef = query(ref, where('a', '==', 'hello'));

      await addDoc(ref, mockData1);
      await addDoc(ref, mockData2);

      const { result: unfilteredResult, waitFor: waitForFiltered } = renderHook(() => useFirestoreCollectionData<any>(ref, { idField: 'id' }), {
        wrapper: Provider,
      });
      const { result: filteredResult, waitFor: waitForUnfiltered } = renderHook(
        () =>
          useFirestoreCollectionData<any>(filteredRef, {
            idField: 'id',
          }),
        { wrapper: Provider }
      );

      await waitForUnfiltered(() => unfilteredResult.current.status === 'success');
      await waitForFiltered(() => filteredResult.current.status === 'success');

      const filteredList = filteredResult.current.data;
      const list = unfilteredResult.current.data;

      // filteredList's length should be 1 since we only added one value that matches its query
      expect(filteredList.length).toEqual(1);

      // the full list should be bigger than the filtered list
      expect(list.length).toBeGreaterThan(filteredList.length);
    });
  });
});

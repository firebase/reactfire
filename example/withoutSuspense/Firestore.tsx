import * as React from 'react';
import { useEffect, useState } from 'react';
import { FirestoreProvider, useFirebaseApp, useFirestore, useFirestoreCollectionData, useFirestoreDocData, useFirestoreDocDataOnce } from 'reactfire';
import { WideButton } from '../display/Button';
import { CardSection } from '../display/Card';
import { LoadingSpinner } from '../display/LoadingSpinner';
import { AuthWrapper } from './Auth';
import { initializeFirestore, doc, collection, enableIndexedDbPersistence, onSnapshot, increment, updateDoc, orderBy, query, addDoc } from 'firebase/firestore';
import type { FirebaseFirestore } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const Counter = () => {
  const firestore = useFirestore();
  const app = useFirebaseApp();

  if(getFirestore(app) !== firestore) {
    throw new Error('firestore instances do not match')
  }
  

  console.log("USEFIRESTORE", firestore.app.name);

  const ref = doc(firestore, 'count', 'counter');

  useEffect(() => {
    onSnapshot(ref, (doc) => {
      console.log(doc.data());
    });
  }, []);

  const incrementCounter = (amountToIncrement) => {
    updateDoc(ref, {
      value: increment(amountToIncrement),
    });
  };

  const { status, data: count } = useFirestoreDocData(ref);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <>
      <button onClick={() => incrementCounter(-1)}>-</button>
      <span> {(count as any).value} </span>
      <button onClick={() => incrementCounter(1)}>+</button>
    </>
  );
};

const AnimalsList = () => {
  debugger;
  const firestore = useFirestore();
  const animalsCollection = collection(firestore, 'animals');
  const [isAscending, setIsAscending] = useState(false);
  const animalsQuery = query(animalsCollection, orderBy('commonName', isAscending ? 'asc' : 'desc'));
  const { status, data: animals } = useFirestoreCollectionData(animalsQuery, {
    idField: 'id',
  });

  const addAnimal = () => {
    const possibleAnimals = ['Dog', 'Cat', 'Iguana', 'Zebra'];
    const selectedAnimal = possibleAnimals[Math.floor(Math.random() * possibleAnimals.length)];
    addDoc(animalsCollection, { commonName: selectedAnimal });
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <>
      <WideButton
        label="Sort"
        onClick={() => {
          setIsAscending(!isAscending);
        }}
      />
      <div className="h-20 overflow-x-scroll shadow-inner m-2 border border-black">
        <ul>
          {animals.map((animal) => (
            <li key={animal.id as string}>{animal.commonName as string}</li>
          ))}
        </ul>
      </div>
      <WideButton
        label="Add Animal"
        onClick={() => {
          addAnimal();
        }}
      />
    </>
  );
};

const StaticValue = () => {
  const firestore = useFirestore();

  const ref = doc(firestore, 'count/counter');

  const { status, data } = useFirestoreDocDataOnce(ref);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  return <span>{(data as any).value}</span>;
};

export const Firestore = () => {
  const firebaseApp = useFirebaseApp();
  const [firestoreInstance, setFirestoreInstance] = useState<FirebaseFirestore | undefined>();

  // idea: useFirestoreInstance();
  // this could set up enableIndexedDbPersistence
  // and emulators!
  // https://github.com/angular/angularfire/issues/1158

  useEffect(() => {
    console.log(`Initializing Firestore with app name ${firebaseApp.name}`);
    const db = initializeFirestore(firebaseApp, {});
    enableIndexedDbPersistence(db).then(() => {
      setFirestoreInstance(db);
    });
  }, [firebaseApp]);

  if (!firestoreInstance) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <AuthWrapper fallback={<span>Sign in to use this component</span>}>
        <FirestoreProvider sdk={firestoreInstance}>
          <CardSection title="Get/Set document value">
            <Counter />
          </CardSection>
          {/* <CardSection title="Fetch data once">
            <StaticValue />
          </CardSection>
          <CardSection title="Work with lists of data">
            <AnimalsList />
          </CardSection> */}
        </FirestoreProvider>
      </AuthWrapper>
    </>
  );
};

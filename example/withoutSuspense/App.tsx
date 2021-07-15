import * as React from 'react';
import { FirebaseAppProvider, AuthProvider } from 'reactfire';
import { Card } from '../display/Card';
import { Auth } from './Auth';
import { Firestore } from './Firestore';
import { RealtimeDatabase } from './RealtimeDatabase';
import { RemoteConfig } from './RemoteConfig';
import { Storage } from './Storage';

// Import auth directly because most components need it
// Other Firebase libraries can be lazy-loaded as-needed
import { initializeApp, getApp, setLogLevel } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const App = ({ firebaseConfig }: { firebaseConfig: { [key: string]: unknown } }) => {
  
  let firebaseApp;
  try {
    firebaseApp = initializeApp(firebaseConfig);
  } catch {
    firebaseApp = getApp();
  }
  // setLogLevel('debug');
  const auth = getAuth(firebaseApp);
  
  return (
    <div className="flex flex-wrap justify-around p-4">
      <FirebaseAppProvider firebaseApp={firebaseApp}>
        <AuthProvider sdk={auth}>
        <Card title="Authentication">
          <Auth />
        </Card>
        <Card title="Firestore">
          <Firestore />
        </Card>
        <Card title="Realtime Database">
          <RealtimeDatabase />
        </Card>
        <Card title="Remote Config">
          <RemoteConfig />
        </Card>
        <Card title="Storage">
          <Storage />
        </Card>
        </AuthProvider>
      </FirebaseAppProvider>
    </div>
  );
};

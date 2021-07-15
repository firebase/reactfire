import { fetchAndActivate, getRemoteConfig } from 'firebase/remote-config';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { RemoteConfigProvider, useFirebaseApp, useRemoteConfigString } from 'reactfire';
import { CardSection } from '../display/Card';
import { LoadingSpinner } from '../display/LoadingSpinner';

export const RcString = ({ messageKey }) => {
  const { status, data: messageValue } = useRemoteConfigString(messageKey);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  return (
    <CardSection title="Retrieve string 'message'">
      <span>{messageValue}</span>
    </CardSection>
  );
};

export const RemoteConfig = () => {
  const firebaseApp = useFirebaseApp();
  const remoteConfig = getRemoteConfig(firebaseApp);
  const [remoteConfigLoaded, setRemoteConfigLoaded] = useState<boolean>(false);
  useEffect(() => {
    remoteConfig.settings = {
      minimumFetchIntervalMillis: 10000,
      fetchTimeoutMillis: 10000
    };
    fetchAndActivate(remoteConfig).then(() => setRemoteConfigLoaded(true))
  }, []);

  if (!remoteConfigLoaded) {
    return <LoadingSpinner />;
  }

  return <RemoteConfigProvider sdk={remoteConfig}><RcString messageKey="message" /></RemoteConfigProvider>;
};

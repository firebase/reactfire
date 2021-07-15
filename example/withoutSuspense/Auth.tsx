import * as React from 'react';
import { useAuth, useSigninCheck } from 'reactfire';
import { WideButton } from '../display/Button';
import { CardSection } from '../display/Card';
import { LoadingSpinner } from '../display/LoadingSpinner';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const signOut = auth => auth.signOut().then(() => console.log('signed out'));
const signIn = async auth => {
  const provider = new GoogleAuthProvider();

  await signInWithPopup(auth, provider);
}

export const AuthWrapper = ({ children, fallback }: React.PropsWithChildren<{ fallback: JSX.Element }>): JSX.Element => {
  const { status, data: signInCheckResult } = useSigninCheck();

  if (!children) {
    throw new Error('Children must be provided');
  }
  if (status === 'loading') {
    return <LoadingSpinner />;
  } else if (signInCheckResult.signedIn === true) {
    return children as JSX.Element;
  }

  return fallback;
};

const UserDetails = ({ user }) => {
  const auth = useAuth();

  return (
    <>
      <CardSection title="Displayname">{user.displayName}</CardSection>
      <CardSection title="Providers">
        <ul>
          {user.providerData?.map(profile => (
            <li key={profile?.providerId}>{profile?.providerId}</li>
          ))}
        </ul>
      </CardSection>
      <CardSection title="Sign Out">
        <WideButton label="Sign Out" onClick={() => signOut(auth)} />
      </CardSection>
    </>
  );
};

const SignInForm = () => {
  const auth = useAuth();

  return (
    <CardSection title="Sign-in form">
      <WideButton label="Sign in with Google" onClick={() => signIn(auth)} />
    </CardSection>
  );
};

export const Auth = () => {
  const { status, data: signinResult } = useSigninCheck();

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  const { signedIn, user } = signinResult;

  if (signedIn === true) {
    return <UserDetails user={user} />;
  } else {
    return <SignInForm />;
  }
};

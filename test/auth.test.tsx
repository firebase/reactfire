import { cleanup, render, waitFor } from '@testing-library/react';
import { renderHook, act as hooksAct, cleanup as hooksCleanup } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { FirebaseAppProvider, AuthCheck, AuthProvider, useUser, useSigninCheck, ClaimCheckErrors, ClaimsValidator } from '..';
import { act } from 'react-dom/test-utils';
import { baseConfig } from './appConfig';
import { FirebaseApp, initializeApp } from 'firebase/app';

import { getAuth, GoogleAuthProvider, signInWithCredential, signInWithCustomToken, signOut, useAuthEmulator, UserCredential } from 'firebase/auth';

describe('Authentication', () => {
  let app: FirebaseApp;
  let signIn: () => Promise<UserCredential>;

  const Provider: React.FunctionComponent = ({ children }) => (
    <FirebaseAppProvider firebaseApp={app}>
      <AuthProvider sdk={getAuth(app)}>{children}</AuthProvider>
    </FirebaseAppProvider>
  );

  const AuthCheckWrapper = (props?: { children?: any }) => (
    <FirebaseAppProvider firebaseApp={app} suspense={true}>
      <AuthProvider sdk={getAuth(app)}>
        <React.Suspense fallback={'loading'}>
          <AuthCheck fallback={<h1 data-testid="signed-out">not signed in</h1>}>{props?.children || <h1 data-testid="signed-in">signed in</h1>}</AuthCheck>
        </React.Suspense>
      </AuthProvider>
    </FirebaseAppProvider>
  );

  beforeAll(() => {
    // Auth Emulator emits a warning, which adds noise to test output. So, we get rid of console.warn for a moment
    const realConsoleInfo = console.info;
    jest.spyOn(console, 'info').mockImplementation((...args) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.')
      ) {
        return;
      }
      return realConsoleInfo.call(console, args);
    });

    app = initializeApp(baseConfig);

    useAuthEmulator(getAuth(app), 'http://localhost:9099/', { disableWarnings: true });

    signIn = async () => {
      return signInWithCredential(getAuth(app), GoogleAuthProvider.credential('{"sub": "abc123", "email": "foo@example.com", "email_verified": true}'));
    };
  });

  afterAll(() => {
    afterAll(() => {
      // @ts-ignore console.info is mocked in beforeAll
      console.info.mockRestore();
    });
  });

  test('double check - emulator is running', async () => {
    // IF THIS TEST FAILS, MAKE SURE YOU'RE RUNNING THESE TESTS BY DOING:
    // yarn test

    const user = await signIn();

    expect(user).toBeDefined();
  });

  beforeEach(async () => {
    // clear the signed in user
    await signOut(getAuth(app));
  });

  afterEach(async () => {
    hooksCleanup();
    cleanup();
  });

  describe('AuthCheck', () => {
    it('can find firebase Auth from Context', async () => {
      const { getByTestId } = render(<AuthCheckWrapper />);

      await waitFor(() => expect(getByTestId('signed-out')).toBeInTheDocument());
    });

    it('renders the fallback if a user is not signed in', async () => {
      const { getByTestId } = render(<AuthCheckWrapper />);

      await waitFor(() => expect(getByTestId('signed-out')).toBeInTheDocument());

      await act(async () => {
        await signIn();
      });

      await waitFor(() => expect(getByTestId('signed-in')).toBeInTheDocument());
    });

    it('renders children if a user is logged in', async () => {
      await act(async () => {
        await signIn();
      });

      const { getByTestId } = render(<AuthCheckWrapper />);

      await waitFor(() => expect(getByTestId('signed-in')).toBeInTheDocument());
    });

    it('can switch between logged in and logged out', async () => {
      const { getByTestId } = render(<AuthCheckWrapper />);

      await waitFor(() => expect(getByTestId('signed-out')).toBeInTheDocument());

      await act(async () => {
        await signIn();
      });

      await waitFor(() => expect(getByTestId('signed-in')).toBeInTheDocument());

      await act(async () => {
        await signOut(getAuth(app));
      });

      await waitFor(() => expect(getByTestId('signed-out')).toBeInTheDocument());
    });

    test.todo('checks requiredClaims');
  });

  describe('useSigninCheck()', () => {
    it('accurately reflects signed-in state', async () => {
      const { result, waitFor: waitForHookCondition } = renderHook(() => useSigninCheck(), { wrapper: Provider });

      await waitForHookCondition(() => result.current.status === 'success');

      // Signed out
      expect(getAuth(app).currentUser).toBeNull();
      expect(result.current.data).toEqual({ signedIn: false, hasRequiredClaims: false, user: null, errors: {} });

      await hooksAct(async () => {
        await signIn();
      });

      // Signed in
      expect(getAuth(app).currentUser).not.toBeNull();
      expect(result.current.data).toEqual({ signedIn: true, hasRequiredClaims: true, user: getAuth(app).currentUser, errors: {} });

      // Signed out again
      await hooksAct(async () => {
        await getAuth(app).signOut();
      });
      expect(getAuth(app).currentUser).toBeNull();
      expect(result.current.data).toEqual({ signedIn: false, hasRequiredClaims: false, user: null, errors: {} });
    });

    it('recognizes valid custom claims', async () => {
      const requiredClaims = { canModifyPages: 'true', moderator: 'true' };

      const withClaimsCustomToken = {
        uid: 'aUserWithCustomClaims',
        claims: requiredClaims,
      };

      const { result, waitFor: waitForHookCondition } = renderHook(() => useSigninCheck({ requiredClaims: requiredClaims }), {
        wrapper: Provider,
      });

      await hooksAct(async () => {
        await signInWithCustomToken(getAuth(app), JSON.stringify(withClaimsCustomToken));
      });

      await waitForHookCondition(() => result.current.status === 'success');

      expect(result.current.data.signedIn).toEqual(true);
      expect(result.current.data.hasRequiredClaims).toEqual(true);
    });

    it('recognizes invalid custom claims', async () => {
      const requiredClaims = { canModifyPages: 'true', moderator: 'true' };

      const withClaimsCustomToken = {
        uid: 'aUserWithCustomClaims',
        claims: requiredClaims,
      };

      // Extra claim passed to useSignInCheck
      const { result, waitFor: waitForHookCondition } = renderHook(() => useSigninCheck({ requiredClaims: { ...requiredClaims, anExtraClaim: 'true' } }), {
        wrapper: Provider,
      });

      await hooksAct(async () => {
        await signInWithCustomToken(getAuth(app), JSON.stringify(withClaimsCustomToken));
      });

      await waitForHookCondition(() => result.current.status === 'success');

      expect(result.current.data.signedIn).toEqual(true);
      expect(result.current.data.hasRequiredClaims).toEqual(false);
      expect(result.current.data.errors as ClaimCheckErrors);
    });

    it('accepts a custom claims validator', async () => {
      const withClaimsCustomToken = {
        uid: 'aUserWithCustomClaims',
        claims: { someClaim: true, someOtherClaim: false },
      };

      const claimsValidator: ClaimsValidator = (userClaims) => {
        const validClaimsSet = ['someClaim', 'someOtherClaim'];
        let hasAnyClaim = false;

        for (const claim of validClaimsSet) {
          if (userClaims[claim] !== undefined) {
            hasAnyClaim = true;
            break;
          }
        }

        return {
          hasRequiredClaims: hasAnyClaim,
          errors: hasAnyClaim ? {} : validClaimsSet,
        };
      };

      const { result, waitFor: waitForHookCondition } = renderHook(() => useSigninCheck({ validateCustomClaims: claimsValidator }), {
        wrapper: Provider,
      });

      await hooksAct(async () => {
        await signInWithCustomToken(getAuth(app), JSON.stringify(withClaimsCustomToken));
      });

      await waitForHookCondition(() => result.current.status === 'success');

      expect(result.current.data.signedIn).toEqual(true);
      expect(result.current.data.hasRequiredClaims).toEqual(true);
    });
  });

  describe('useUser', () => {
    it('always returns a user if inside an <AuthCheck> component', async () => {
      // Since this is wrapped in an AuthCheck component and we never sign in, this should never get rendered
      const UserDetails = () => {
        const { data: user } = useUser();

        expect(user).not.toBeNull();
        expect(user).toBeDefined();

        return <h1>Hello</h1>;
      };

      render(
        <>
          <AuthCheckWrapper>
            <UserDetails />
          </AuthCheckWrapper>
        </>
      );
    });

    it('returns the same value as getAuth(app).currentUser', async () => {
      const { result } = renderHook(() => useUser(), { wrapper: Provider });

      // Signed out
      expect(getAuth(app).currentUser).toBeNull();
      expect(result.current.data).toEqual(getAuth(app).currentUser);

      await hooksAct(async () => {
        await signIn();
      });

      // Signed in
      expect(getAuth(app).currentUser).not.toBeNull();
      expect(result.current.data).toEqual(getAuth(app).currentUser);
    });

    it('synchronously returns a user if one is already signed in', async () => {
      await signIn();

      const { result } = renderHook(() => useUser(), { wrapper: Provider });

      expect(getAuth(app).currentUser).not.toBeNull();
      expect(result.current.data).toEqual(getAuth(app).currentUser);
    });

    it('does not show a logged-out user after navigating away', async () => {
      await signIn();

      // a component that conditionally renders its child based on props
      const ConditionalRenderer = ({ renderChildren }: { renderChildren: boolean }) => {
        if (renderChildren) {
          return <AuthCheckWrapper />;
        } else {
          return <span data-testid="no-children">Filler</span>;
        }
      };

      // render the child and make sure it has the initial value
      const { findByTestId, rerender } = render(<ConditionalRenderer renderChildren={true} />);
      await findByTestId('signed-in');

      // unrender the child, causing it to get cleaned up and not listen any more
      rerender(<ConditionalRenderer renderChildren={false} />);
      const placeHolderElement = await findByTestId('no-children');
      expect(placeHolderElement).toHaveTextContent('Filler');

      // while no components are actively subscribed, sign out
      await act(async () => await getAuth(app).signOut());

      // render the child again and make sure it has the new value, not a stale one
      rerender(<ConditionalRenderer renderChildren={true} />);
      await findByTestId('signed-out');
    });
  });
});

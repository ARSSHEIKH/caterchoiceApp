import React from 'react';



type Context = {
  isInitialized: boolean;
  isSignedIn: boolean;
  isIntro: boolean;
  signIn: () => void;
  signOut: () => void;
};

export const AuthContext = React.createContext<Context>({
  isInitialized: false,
  isSignedIn: false,
  isIntro: false,
  signIn: () => { },
  signOut: () => { },
});

interface AuthProviderProps {
  children: React.ReactElement;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isInitialized, setInitialized] = React.useState<boolean>(false);
  const [isIntro, setIsIntro] = React.useState<boolean>(false);
  const [isSignedIn, setSignedIn] = React.useState<boolean>(false);
 

  const signIn = React.useCallback(() => {
    setSignedIn(true);
  }, []);

  const signOut = React.useCallback(async () => {

    setSignedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isInitialized,
        isSignedIn,
        isIntro,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { createContext, ReactNode, useEffect, useState } from "react";

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setIsUserLoading] = useState(false)
  
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "250842508775-us81udraa6fdp75enol88d0qc1q0snsf.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"]
  });

  const signIn = async () => {
    try {
      setIsUserLoading(true)
      await promptAsync()

    } catch (err) {
      console.log(err)
      throw err
    } finally {
      setIsUserLoading(false)
    }
  };

  const signInWithGoogle = async (access_token: string) => {
    console.log('Token de autenticação ===> ', access_token)
  }

  useEffect(() => {
    if(response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

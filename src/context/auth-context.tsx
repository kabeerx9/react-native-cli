import React, {createContext, useContext, useEffect, useState} from 'react';
import {authService} from '../services/auth-service';

type AuthContextType = {
  isLoading: boolean;
  isSignedIn: boolean | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for stored authentication state when app loads

    authService.setSignOutHandler(async () => {
      await signOut();
    });

    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    console.log('Auth check going on ');
    try {
      // Simulate a delay to show splash screen
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSignedIn(Math.random() < 0.5);
    } catch (error) {
      console.error('Error checking auth state:', error);
      setIsSignedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSignedIn(true);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      setIsSignedIn(false);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{isLoading, isSignedIn, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

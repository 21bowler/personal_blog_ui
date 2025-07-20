import { supabase } from '~/supabase-client';
import type { User, Session, Subscription } from '@supabase/supabase-js';

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
}

export const signUp = async (credentials: SignInCredentials) => {
  const { data, error } = await supabase.auth.signUp(credentials);

  if (error) {
    console.error('Error signing up: ', error.message);
    throw new Error('Error signing up');
  }

  return data;
};

export const signInUser = async (credentials: SignUpCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    console.error('Error signing in: ', error.message);
    throw new Error('Error signing in');
  }

  // Log successful sign-in
  // console.log('Sign in successful:', data);

  // Immediately verify session after sign in
  const session = await supabase.auth.getSession();
  // console.log('Session after sign in:', session);

  return data;
};

// Get Current User logged In
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    //First get the session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Error Getting Current Session(Browser)', sessionError);
      return null;
    }
    if (!session) {
      console.log('No Session Found (Browser - from getSession call)');
      return null;
    }
    console.log('Session Found (Browser - from getSession call):', session);

    //2. Then, get the user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error('Error Getting Current User(BROWSER).', userError.message);
      throw new Error('Error getting Current User.');
    }

    console.log('User Found (Browser):', user);
    return user;
  } catch (error: any) {
    console.error('Auth State Error (Browser): ', error);
    return null;
  }
};

// fetching from the profile table
export const getProfileUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (!data) {
    throw new Error('No data Found!');
  }

  if (error) {
    console.error('Error fetching user profile:', error.message);
    throw error;
  }

  return data;
};

// Get Current Session
export const getCurrentSession = async (): Promise<Session | null> => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting Current Session', error.message);
    throw new Error('Error Getting Current session!');
  }

  return session;
};

// Sign Out the Current User
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error Signing Out Current User.', error.message);
    throw new Error('Error Signing Out Current User');
  }
};

// subscription handler for auth state changes
export const onAuthStateChange = (
  callback: (user: User | null) => void,
): Subscription => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    console.log('Auth state changed:', _event, session);
    callback(session?.user || null);
  });

  return subscription;
};

import { supabase } from '~/supabase-client';

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

export const signIn = async (credentials: SignUpCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    console.error('Error signing in: ', error.message);
    throw new Error('Error signing in');
  }

  return data;
};

// Get Current User logged In
export const getCurrentUser = async (): Promise<User | null> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error('Error Getting Current User.', error.message);
    throw new Error('Error getting Current User.');
  }

  return user;
};

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

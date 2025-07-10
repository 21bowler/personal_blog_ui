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

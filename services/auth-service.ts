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
  try {
    // Add specific options for signup
    const { data, error } = await supabase.auth.signUp(credentials);

    if (error) {
      console.error('Detailed Signup Error: ', {
        message: error.message,
        status: error.status,
        name: error.name,
        details: error,
      });
      throw error;
    }

    //! Log the successful response - for debugging
    // console.log('Signup Response:', {
    //   hasUser: !!data.user,
    //   hasSession: !!data.session,
    //   userMetadata: data.user?.user_metadata,
    // });

    return data;
  } catch (err: any) {
    console.error('Signup process Error:', err);
    throw err;
  }
};

export const signInUser = async (credentials: SignUpCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    console.error('Error signing in: ', error.message);
    throw error;
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
export const getProfileUser = async (
  userId: string,
): Promise<{ role: string }> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (!data) {
    throw new Error('No data Found!');
  }

  if (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Error fetching user profile');
  }

  return data;
};

// Fetching all profile users
export const getAllProfileUsers = async () => {
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*');

  if (profileError) {
    console.error('Error fetching all profile users:', profileError.message);
    throw new Error('Error fetching all profile users');
  }

  return profileData;
};

export const fetchProfile = async (userId: string) => {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('username, avatar_url, created_at')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile: ', error.message);
    throw new Error('Error fetching profile.');
  }

  return profile;
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

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/',
    },
  });

  if (error) {
    console.error('Error signing in with Google', error.message);
    throw new Error('Error signing in with Google');
  }

  // data containing user info - session
  return data;
};

// fetch total users
export const getTotalUsers = async () => {
  const { count, error } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  const { count: profileRole, error: profileError } = await supabase
    .from('profiles')
    .select('role', { count: 'exact' });

  if (profileError) {
    console.error('Error fetching total roles: ', profileError.message);
    throw new Error('Error fetching total roles.');
  }

  if (error) {
    console.error('Error fetching total users: ', error.message);
    throw new Error('Error fetching total users.');
  }

  return { count, profileRole };
};

// Sign Out the Current User
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error Signing Out Current User.', error.message);
    throw new Error('Error Signing Out Current User');
  }
};

/** Delete a user from the User Auth Table - ADMIN FEATURE ONLY */
// This will only work with the Service Role key
export const deleteUser = async (userId: string) => {
  const { data, error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    console.error('Error Deleting User: ', error.message);
    throw error;
  }

  return data;
};

export const deleteUserFromProfile = async (userId: string): Promise<void> => {
  const { error: deleteError } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (deleteError) {
    console.error('Error Deleting User from Profile: ', deleteError.message);
    throw deleteError;
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

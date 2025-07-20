import AuthForm from '../../../components/AuthForm';
import type { Route } from '../../../.react-router/types/app/routes/auth/+types/sign-in';
import {
  signInUser,
  type SignInCredentials,
  getProfileUser,
} from '../../../services/auth-service';
import { redirect, useActionData, useNavigation } from 'react-router';
import { toast } from 'sonner';

export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Basic validation
  if (!email || !password) {
    return {
      error: 'Please enter a valid email and password',
    };
  }

  try {
    const credentials: SignInCredentials = { email, password };

    const { user, session } = await signInUser(credentials);

    if (user && session) {
      const profile = await getProfileUser(user.id);

      // user role check
      if (profile && profile.role === 'admin') {
        toast.success('Signed in as Admin!');
        return redirect('/admin/all-articles');
      } else {
        // IMPORTANT (NOTE TO FUTURE SAM): session is stored in localStorage by Supabase client,
        toast.success('Signed in successfully!');
        return redirect('/');
      }
    } else {
      return {
        error:
          'Sign-in process completed, but no user data returned. Check Supabase settings.',
      };
    }
  } catch (error: any) {
    console.error('Sign-in action error: ', error.message);

    // return to the UI
    return {
      error: error.message || 'An unexpected error occurred during sign-in.',
    };
  }
};

const SignIn = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <AuthForm
      subtitleText="Sign in to your account"
      togglePromptText="Dont have an account?"
      buttonText={isSubmitting ? 'Signing in...' : 'Sign In'}
      toggleLink="/auth/sign-up"
      actionData={actionData}
      isSubmitting={isSubmitting}
    />
  );
};
export default SignIn;

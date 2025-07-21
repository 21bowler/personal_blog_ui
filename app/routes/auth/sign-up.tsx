import { redirect, useActionData, useNavigation } from 'react-router';
import AuthForm from '../../../components/AuthForm';
import { signUp, type SignUpCredentials } from '../../../services/auth-service';
import type { Route } from './+types/sign-up';
import { toast } from 'sonner';

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  //Basic validation
  if (!email || !password) {
    return {
      error: 'Please enter a valid email and password',
    };
  }

  try {
    const credentials: SignUpCredentials = { email, password };

    // call supabase sign-up function
    const { user } = await signUp(credentials);

    if (user) {
      // Needs a toaster here for signing up
      toast.success('Signed up successfully!');
      return redirect('/');
    } else {
      return {
        error:
          'Sign-up process completed, but no user data returned. Check Supabase settings.',
      };
    }
  } catch (error: any) {
    console.error('Sign-up action error: ', error);

    // return to the UI
    return {
      error: error.message || 'An unexpected error occurred during sign-up.',
    };
  }
}

const SignUp = () => {
  const navigation = useNavigation();
  const actionData = useActionData();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <AuthForm
      subtitleText="Create a new account"
      togglePromptText="Already have an account?"
      buttonText={isSubmitting ? 'Signing up...' : 'Sign Up'}
      toggleLink="/auth/sign-in"
      actionData={actionData}
      isSubmitting={isSubmitting}
    />
  );
};
export default SignUp;

import type { UseFormSetError } from 'react-hook-form';
import { useHistory } from 'react-router';

import { CustomForm } from '../components/Form/Form';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { loginUser } from '../store/features/auth/authSlice';
import { selectAuthIsLoading } from '../store/features/auth/selectors';
import { isErrorWithMessage } from '../utils/types';

type SignInFormValues = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const isLoading = useAppSelector(selectAuthIsLoading);

  const handleSubmit = async (values: SignInFormValues, setError: UseFormSetError<SignInFormValues>) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      history.push('/');
    } catch (err: unknown) {
      if (isErrorWithMessage(err)) {
        type ServerErrors = Record<string, string>;
        const serverErrors: ServerErrors = JSON.parse(err.message);

        Object.entries(serverErrors).forEach(([field, message]) => {
          if (field === 'email or password') {
            setError('email', { type: 'server', message: `${field} ${message}` });
            setError('password', { type: 'server', message: `${field} ${message}` });
          }
        });
      }
    }
  };
  return <CustomForm<SignInFormValues> formMode="signIn" onSubmit={handleSubmit} isLoading={isLoading} />;
};

export default SignInPage;

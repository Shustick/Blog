import type { UseFormSetError } from 'react-hook-form';
import { useHistory } from 'react-router';

import { CustomForm } from '../components/Form/Form';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { registerUser } from '../store/features/auth/authSlice';
import { selectAuthIsLoading } from '../store/features/auth/selectors';

type SignUpFormValues = {
  username: string;
  email: string;
  password: string;
};

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const isLoading = useAppSelector(selectAuthIsLoading);

  const handleSubmit = async (values: SignUpFormValues, setError: UseFormSetError<SignUpFormValues>) => {
    try {
      await dispatch(registerUser(values)).unwrap();
      history.push('/');
    } catch (err: any) {
      type ServerErrors = Record<string, string>;
      const serverErrors: ServerErrors = JSON.parse(err.message);

      Object.entries(serverErrors).forEach(([field, message]) => {
        if (field === 'username') {
          message = `"${values.username}" ${message}`;
        }
        if (field === 'email') {
          message = `"${values.email}" ${message}`;
        }
        setError(field as keyof typeof values, {
          type: 'server',
          message,
        });
      });
    }
  };
  return <CustomForm<SignUpFormValues> formMode="signUp" onSubmit={handleSubmit} isLoading={isLoading} />;
};

export default SignUpPage;

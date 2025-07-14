import type { UseFormSetError } from 'react-hook-form';
import { useHistory } from 'react-router';

import { CustomForm } from '../components/Form/Form';
import { formConfigs, type FieldConfig } from '../components/Form/form-configs';
import EditProfileSkeleton from '../components/Skeleton/EditProfileSkeleton/EditProfileSkeleton';
import { useAppSelector } from '../hooks/reduxHooks';
import { useAppDispatch } from '../hooks/reduxHooks';
import { updateUser } from '../store/features/auth/authSlice';
import { selectAuthIsLoading, selectUser } from '../store/features/auth/selectors';

function buildInitialValues<T extends FieldConfig>(fields: T[], userData: Record<string, any>): Record<string, string> {
  return fields.reduce(
    (acc, field) => {
      acc[field.name] = userData[field.name] ?? '';
      return acc;
    },
    {} as Record<string, string>
  );
}

const EditProfilePage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const userData = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectAuthIsLoading);

  const fields = formConfigs['editProfile'].fields;

  if (!userData) {
    return <EditProfileSkeleton />;
  }

  const initialValues = buildInitialValues(fields, userData);

  const handleSubmit = async (values: typeof initialValues, setError: UseFormSetError<typeof initialValues>) => {
    const filteredValues = Object.entries(values).reduce(
      (acc, [key, value]) => {
        const fieldConfig = fields.find((f) => f.name === key);

        const isRequired = fieldConfig?.required ?? false;
        const isEmpty = value === '' || value === null || value === undefined;

        if (isRequired || !isEmpty) {
          acc[key] = value;
        }

        return acc;
      },
      {} as typeof values
    );

    try {
      await dispatch(updateUser(filteredValues)).unwrap();
      history.push('/');
    } catch (err: any) {
      const serverErrors: Record<string, string> = JSON.parse(err.message);

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

  return (
    <CustomForm<typeof initialValues>
      formMode="editProfile"
      onSubmit={handleSubmit}
      initialValues={initialValues}
      isLoading={isLoading}
    />
  );
};

export default EditProfilePage;

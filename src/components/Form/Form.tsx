import { useEffect, type ReactNode } from 'react';
import { useForm, type UseFormSetError, type FieldValues, type DefaultValues } from 'react-hook-form';
import { Link } from 'react-router-dom';

import Input from '../Input';
import SubmitButton from '../SubmitButton';

import { formConfigs, type FieldConfig } from './form-configs';
import styles from './form.module.scss';
export type FormMode = 'signIn' | 'signUp' | 'editProfile';

// interface Props {
//   formMode: FormMode;
//   onSubmit: (values: Record<string, any>) => void;
// }

interface Props<T extends FieldValues> {
  formMode: FormMode;
  onSubmit: (values: T, setError: UseFormSetError<T>) => void;
  initialValues?: T;
  isLoading?: boolean;
}

// export function CustomForm({ formMode, onSubmit }: Props) {
//   const { fields, agreementField } = formConfigs[formMode];
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     setError,
//     clearErrors,
//   } = useForm<Record<string, any>>({
//     mode: 'onChange',
//   });
export function CustomForm<T extends FieldValues>({ formMode, onSubmit, initialValues, isLoading }: Props<T>) {
  const { fields, agreementField } = formConfigs[formMode];
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<T>({ mode: 'onChange', defaultValues: (initialValues ?? {}) as DefaultValues<T> });

  //=== настройки текста в зависимости от FormMode (начало) ===
  const legends: Record<FormMode, string> = {
    signIn: 'Sign In',
    signUp: 'Create New Account',
    editProfile: 'Edit Profile',
  };

  const bottomText: Record<FormMode, ReactNode> = {
    signIn: (
      <p className={styles.form__footer__text}>
        Don’t have an account?&nbsp;
        <Link to="/sign_up" className={styles.form__footer__link}>
          Sign Up
        </Link>
        .
      </p>
    ),
    signUp: (
      <p className={styles.form__footer__text}>
        Already have an account?&nbsp;
        <Link to="/sign_in" className={styles.form__footer__link}>
          Sign In
        </Link>
        .
      </p>
    ),
    editProfile: null,
  };

  const submitBtnText: Record<FormMode, string> = {
    signIn: 'Login',
    signUp: 'Create',
    editProfile: 'Save',
  };
  //=== настройки текста в зависимости от FormMode (конец) ===

  return (
    <form onSubmit={handleSubmit((values) => onSubmit(values, setError))} className={styles.form}>
      <legend className={styles.form__legend}>{legends[formMode]}</legend>
      <fieldset className={styles.form__fieldset}>
        {fields.map((field, index) => {
          const validationRules: Record<string, any> = {};

          if (field.required) {
            validationRules.required = 'Required field';
            validationRules.validate = (value: string) => {
              if (value.trim() === '') {
                return 'Field cannot be empty or contain only spaces';
              }
              if (field.matchField) {
                const compareValue = watch(field.matchField!);
                if (value !== compareValue) {
                  return 'Passwords must match';
                }
              }
              return true;
            };
          } else if (field.matchField) {
            validationRules.validate = (value: string) => {
              const compareValue = watch(field.matchField!);
              return value === compareValue || 'Passwords must match';
            };
          }

          if (field.minLength)
            validationRules.minLength = {
              value: field.minLength,
              message: `Your ${field.name} needs to be at least ${field.minLength} characters.`,
            };
          if (field.maxLength)
            validationRules.maxLength = {
              value: field.maxLength,
              message: `Your ${field.name} cannot be longer than ${field.maxLength} characters.`,
            };
          if (field.pattern) validationRules.pattern = { value: field.pattern, message: 'Invalid format' };

          const fieldRegister = register(field.name, validationRules);
          const error = errors[field.name];
          return (
            <div key={field.name}>
              <label className={styles.form__label} htmlFor={field.name}>
                {field.label}
              </label>
              <Input
                key={field.name}
                id={field.name}
                type={field.type}
                placeholder={field.label}
                autoFocus={index === 0}
                error={!!error}
                errorMessage={error?.message as string}
                {...fieldRegister}
              />
            </div>
          );
        })}
      </fieldset>

      {agreementField && (
        <div className={styles.form__checkbox}>
          <input
            className={styles.form__checkbox__input}
            id="agreement"
            type="checkbox"
            {...register(agreementField.name, {
              required: agreementField.required ? 'You must agree' : false,
            })}
          />
          <label htmlFor="agreement" className={styles.form__checkbox__label}>
            {agreementField.label}
          </label>
          {errors[agreementField.name] && (
            <div className={styles.form__checkbox__error}>{errors[agreementField.name]?.message as string}</div>
          )}
        </div>
      )}
      <div className={styles.form__footer}>
        <SubmitButton isLoading={isLoading} submitText={submitBtnText[formMode]} />
        {bottomText[formMode]}
      </div>
    </form>
  );
}

import { useForm, useFieldArray } from 'react-hook-form';

import Input from '../Input';
import SubmitButton from '../SubmitButton';

import styles from './articleForm.module.scss';

interface ArticleFormValues {
  title: string;
  description: string;
  body: string;
  tagList: { value: string }[];
}

interface ArticleFormProps {
  onSubmit: (values: ArticleFormValues, setError: any) => Promise<void>;
  isLoading: boolean;
  isError: string | null;
  initialValues?: ArticleFormValues;
  formType: 'createArticle' | 'editArticle';
}

export function ArticleForm({ onSubmit, isLoading, isError, initialValues, formType }: ArticleFormProps) {
  const defaultValues: ArticleFormValues = {
    title: initialValues?.title ?? '',
    description: initialValues?.description ?? '',
    body: initialValues?.body ?? '',
    tagList: initialValues?.tagList && initialValues.tagList.length > 0 ? initialValues.tagList : [{ value: '' }],
  };

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ArticleFormValues>({
    mode: 'onChange',
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  return (
    <form onSubmit={handleSubmit((values) => onSubmit(values, setError))} className={styles.form}>
      <legend className={styles.form__legend}>
        {formType === 'createArticle' ? 'Create new article' : 'Edit article'}
      </legend>

      <label htmlFor="title" className={styles.form__label}>
        Title
        <Input
          id="title"
          placeholder="Title"
          {...register('title', { required: 'Title is required' })}
          error={!!errors.title}
          errorMessage={errors.title?.message}
          autoFocus
        />
      </label>

      <label htmlFor="description" className={styles.form__label}>
        Short description
        <Input
          id="description"
          placeholder="Description"
          {...register('description', { required: 'Description is required' })}
          error={!!errors.description}
          errorMessage={errors.description?.message}
        />
      </label>

      <label htmlFor="text" className={styles.form__label}>
        Text
        <Input
          isTextarea
          id="text"
          placeholder="Text"
          {...register('body', { required: 'Text is required' })}
          error={!!errors.body}
          errorMessage={errors.body?.message}
        />
      </label>

      <fieldset className={styles.fieldset}>
        <legend className={styles.form__label}>Tags</legend>

        <div className={styles.fieldset__inputs}>
          {fields.map((field, index) => (
            <div key={field.id} className={styles.fieldset__inputs__input}>
              <Input
                placeholder="Tag"
                {...register(`tagList.${index}.value`, {
                  maxLength: {
                    value: 100,
                    message: 'Maximum length is 100 characters',
                  },
                })}
                error={!!errors.tagList?.[index]?.value}
                errorMessage={errors.tagList?.[index]?.value?.message}
                errorSmallSize
              />
              {fields.length === 1 ? null : (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className={styles.form__button + ' ' + styles['form__button--red']}
                >
                  Delete
                </button>
              )}

              {fields.length - 1 === index ? (
                <button
                  type="button"
                  onClick={() => append({ value: '' })}
                  className={
                    styles.form__button + ' ' + styles['form__button--blue'] + ' ' + styles['fieldset__addTag']
                  }
                >
                  Add tag
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </fieldset>
      <SubmitButton isLoading={isLoading} isError={isError} submitText="Send" className={styles['submit--small']} />
    </form>
  );
}

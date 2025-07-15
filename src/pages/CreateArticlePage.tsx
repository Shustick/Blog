import type { UseFormSetError } from 'react-hook-form';
import { useHistory } from 'react-router';

import ArticleForm from '../components/ArticleForm';
import type { ArticleFormValues } from '../components/ArticleForm/ArticleForm';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { createArticle } from '../store/features/createArticle/createArticleSlice';
import { selectCreateArticleIsError, selectCreateArticleIsLoading } from '../store/features/createArticle/selectors';
import { isErrorWithMessage } from '../utils/types';

const CreateArticlePage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const isLoading = useAppSelector(selectCreateArticleIsLoading);
  const isError = useAppSelector(selectCreateArticleIsError);

  const handleSubmit = async (values: ArticleFormValues, setError: UseFormSetError<ArticleFormValues>) => {
    try {
      const articleData = {
        title: values.title,
        description: values.description,
        body: values.body,
        tagList: values.tagList.map((tag) => tag.value).filter((tag) => tag !== ''),
      };

      await dispatch(createArticle(articleData)).unwrap();
      history.push('/');
    } catch (err: unknown) {
      if (isErrorWithMessage(err)) {
        type ServerErrors = Record<string, string>;
        const serverErrors: ServerErrors = JSON.parse(err.message);

        Object.entries(serverErrors).forEach(([field, message]) => {
          setError(field as keyof typeof values, {
            type: 'server',
            message,
          });
        });
      }
    }
  };

  return <ArticleForm onSubmit={handleSubmit} isLoading={isLoading} isError={isError} formType="createArticle" />;
};

export default CreateArticlePage;

import type { UseFormSetError } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';

import ArticleForm from '../components/ArticleForm';
import type { ArticleFormValues } from '../components/ArticleForm/ArticleForm';
import Skeleton from '../components/Skeleton/ArticleListSkeleton/ArticleListSkeleton';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { selectArticles } from '../store/features/articles/selectors';
import { editArticle } from '../store/features/editArticle/editArticleSlice';
import { selectEditArticleIsError, selectEditArticleIsLoading } from '../store/features/editArticle/selectors';
import { isErrorWithMessage } from '../utils/types';

const EditeArticle = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const isLoading = useAppSelector(selectEditArticleIsLoading);
  const isError = useAppSelector(selectEditArticleIsError);
  const articles = useAppSelector(selectArticles);
  const { slug: slug } = useParams<{ slug: string }>();
  const article = articles.find((article) => article.slug === slug);
  if (!article) {
    return <Skeleton skeletonClass="skeleton__article" />;
  }
  const initialValues = {
    ...article,
    tagList: article.tagList.length > 0 ? article.tagList.map((tag) => ({ value: tag })) : [{ value: '' }],
  };

  const handleSubmit = async (values: ArticleFormValues, setError: UseFormSetError<ArticleFormValues>) => {
    try {
      const articleData = {
        title: values.title,
        description: values.description,
        body: values.body,
        tagList: values.tagList.map((tag) => tag.value).filter((tag) => tag !== ''),
      };

      await dispatch(editArticle({ articleData, slug })).unwrap();
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

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isError={isError}
      initialValues={initialValues}
      formType="editArticle"
    />
  );
};

export default EditeArticle;

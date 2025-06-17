import { useEffect } from 'react';

import ArticlesList from '../components/ArticlesList';
import Pagination from '../components/Pagination';
import Skeleton from '../components/Skeleton';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchArticles } from '../store/features/articles/articlesSlice';
import { selectArticles, selectArticlesError, selectArticlesLoading } from '../store/features/articles/selectors';
import { selectCurrentPage, selectPageSize } from '../store/features/pagination/selectors';

const ArticlesListPage = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector(selectArticles);

  const isLoading = useAppSelector(selectArticlesLoading);
  const error = useAppSelector(selectArticlesError);

  const pageSize = useAppSelector(selectPageSize);
  const currentPage = useAppSelector(selectCurrentPage);

  useEffect(() => {
    dispatch(fetchArticles({ pageSize, currentPage }));
  }, [dispatch, pageSize, currentPage]);

  if (isLoading) return <Skeleton skeletonClass="skeleton__articlesList" />;
  if (error) return <div>Ошибка: {error}</div>;

  console.log(articles);

  return (
    <>
      <ArticlesList articles={articles} />
      <Pagination maxVisiblePages={5} />
    </>
  );
};

export default ArticlesListPage;

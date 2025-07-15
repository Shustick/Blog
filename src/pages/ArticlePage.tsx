import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Article from '../components/Article';
import ArticleSkeleton from '../components/Skeleton/ArticleSkeleton/ArticleSkeleton';
import { fetchArticleBySlug } from '../store/features/articles/articlesApi';
import type { IArticle } from '../store/features/articles/articlesType';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<IArticle | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const res = await fetchArticleBySlug(slug);
        setArticle(res.article);
      } catch (e) {
        setError(`This article has Error. Error: ${e} `);
      }
    };
    loadArticle();
  }, [slug]);

  if (error) return <div>{error}</div>;
  if (!article) return <ArticleSkeleton skeletonClass="skeleton__article" />;
  return (
    <>
      <Article article={article} isFull />
    </>
  );
};

export default ArticlePage;

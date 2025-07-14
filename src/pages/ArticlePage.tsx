import { useParams } from 'react-router-dom';

import Article from '../components/Article';
import { useAppSelector } from '../hooks/reduxHooks';
import { selectArticles } from '../store/features/articles/selectors';

const ArticlePage = () => {
  const articles = useAppSelector(selectArticles);
  const { slug: slug } = useParams<{ slug: string }>();
  const article = articles.find((article) => article.slug === slug);
  if (!article) return <div>This article does not exist.</div>;
  return (
    <>
      <Article article={article} isFull />
    </>
  );
};

export default ArticlePage;

import type { IArticle } from '../../store/features/articles/articlesType';
import Article from '../Article/Article';

import styles from './ArticlesList.module.scss';
type ArticlesListProps = {
  articles: IArticle[];
};

function ArticlesList({ articles }: ArticlesListProps) {
  return (
    <>
      <ul className={styles.articlesList}>
        {articles.map((article: IArticle) => (
          <li key={article.slug}>
            <Article article={article} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ArticlesList;

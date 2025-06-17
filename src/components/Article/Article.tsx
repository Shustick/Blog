import { format } from 'date-fns';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import defaultImage from '../../assets/authorImage.png';
import { Heart } from '../../assets/icons/Heart';
import type { IArticle } from '../../store/features/articles/articlesType';

import styles from './Article.module.scss';

type ArticleProps = {
  article: IArticle;
  isFull?: boolean;
};
// const isLogged = false; //УБРАТЬ!!!
function Article({ article, isFull = false }: ArticleProps) {
  const [imageSrc, setImageSrc] = useState(article.author.image || defaultImage);

  const formatDate = (date: string) => {
    return format(date, 'MMMM d, yyyy');
  };

  const uniqueTags = [...new Set(article.tagList)];

  const tags = uniqueTags.map((tag) =>
    tag ? (
      <li key={article.slug + tag} className={styles.header__mian__tag}>
        {tag}
      </li>
    ) : null
  );

  return (
    <div className={`${isFull ? styles.fullArticle : ''} ${styles.article}`}>
      <div className={styles.article__header}>
        <div className={styles.header__mian}>
          <Link to={`/articles/${article.slug}`} className={styles.header__mian__title}>
            {article.title.trim() ? article.title : 'No Title'}
          </Link>
          {isFull ? (
            <h1 className={styles.header__mian__title}>{article.title.trim() ? article.title : 'No Title'}</h1>
          ) : (
            <Link
              to={`/articles/${article.slug}`}
              className={`${styles.header__mian__title} ${styles.header__mian__titleLink}`}
            >
              {article.title.trim() ? article.title : 'No Title'}
            </Link>
          )}
          <button className={styles.header__mian__favoritesCount}>
            <Heart />
            <span className={styles.favoritesCount__count}>{article.favoritesCount}</span>
          </button>
          <ul className={`${isFull ? styles.fullArticleTags : ''} ${styles.header__mian__tags}`}>{tags}</ul>
          <p className={styles.header__mian__description}>
            {article.description ? article.description : 'No Description'}
          </p>
        </div>
        <div className={styles.header__aside}>
          <span className={styles.header__aside__authorName}>{article.author.username}</span>
          <span className={styles.header__aside__createdDate}>{formatDate(article.createdAt)}</span>
          <span className={styles.header__aside__authorImage}>
            <img
              className={styles.authorImage__icon}
              src={imageSrc}
              alt={article.author.image}
              onError={() => setImageSrc(defaultImage)}
            />
          </span>
        </div>
      </div>
      {isFull ? (
        <div className={styles.article__main}>
          <p>{article.body}</p>
        </div>
      ) : null}
    </div>
  );
}

export default Article;

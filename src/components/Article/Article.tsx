import { format } from 'date-fns';
import { useState } from 'react';
import Markdown from 'react-markdown';
import { Link, useHistory } from 'react-router-dom';

import defaultImage from '../../assets/authorImage.png';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import type { IArticle } from '../../store/features/articles/articlesType';
import { selectUserName } from '../../store/features/auth/selectors';
import { deleteArticle } from '../../store/features/deleteArticle/deleteArticleSlice';
import { selectDeleteArticleIsError, selectDeleteArticleIsLoading } from '../../store/features/deleteArticle/selectors';
import { favoriteApi } from '../../store/features/favorite/favoriteApi';
import { unFavoriteApi } from '../../store/features/favorite/Unfavorite';
import FavoriteButton from '../FavoriteButton';
import PrivateContent from '../PrivateContent';
import Tooltip from '../Tooltip';

import styles from './Article.module.scss';

type ArticleProps = {
  article: IArticle;
  isFull?: boolean;
};

function Article({ article, isFull = false }: ArticleProps) {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const userName = useAppSelector(selectUserName);
  const isLoadingDeleteArticle = useAppSelector(selectDeleteArticleIsLoading);
  const isErrorDeleteArticle = useAppSelector(selectDeleteArticleIsError);
  const [imageSrc, setImageSrc] = useState(article.author.image || defaultImage);
  const [isOpenedTooltip, setIsOpenedTooltip] = useState(false);
  const [isFavorite, setIsFavorite] = useState(article.favorited);
  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount);
  const [isDisabledFavorite, setIsDisabledFavorite] = useState(false);

  const handleOpenTooltip = () => {
    setIsOpenedTooltip((prev) => !prev);
  };

  const handleDeleteArticle = async (slug: string) => {
    const result = await dispatch(deleteArticle(slug));

    if (deleteArticle.fulfilled.match(result)) {
      history.push('/');
    }
  };

  const handleFavorite = async (slug: string) => {
    const optimisticFavorite = !isFavorite;
    const optimisticCount = favoritesCount + (optimisticFavorite ? 1 : -1);

    setIsFavorite(optimisticFavorite);
    setFavoritesCount(optimisticCount);
    setIsDisabledFavorite(true);

    try {
      const res = optimisticFavorite ? await favoriteApi(slug) : await unFavoriteApi(slug);
      setIsFavorite(res.article.favorited);
      setFavoritesCount(res.article.favoritesCount);
      setIsDisabledFavorite(false);
    } catch (e) {
      setIsFavorite(isFavorite);
      setFavoritesCount(favoritesCount);
      console.log(e);
    }
  };

  const formatDate = (date: string) => {
    return format(date, 'MMMM d, yyyy');
  };

  const tags = article.tagList.map((tag) =>
    tag ? (
      <li key={article.slug + tag} className={styles.header__mian__tag}>
        {tag.trim() ? tag : 'No Tag'}
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
          <FavoriteButton
            disabled={!userName || isDisabledFavorite}
            favoritesCount={favoritesCount}
            isFavorite={isFavorite}
            handleFavorite={() => handleFavorite(article.slug)}
          />
          {tags.length ? (
            <ul className={`${isFull ? styles.fullArticleTags : ''} ${styles.header__mian__tags}`}>{tags}</ul>
          ) : null}
          <p className={styles.header__mian__description}>
            {article.description.trim() ? article.description : 'No Description'}
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
          {isFull ? (
            <PrivateContent isForbidden={userName !== article.author.username}>
              <button
                className={styles.header__aside__btn + ' ' + styles['header__aside__btn--red']}
                onClick={handleOpenTooltip}
              >
                Delete
              </button>

              {isOpenedTooltip ? (
                <Tooltip
                  isLoading={isLoadingDeleteArticle}
                  tooltipTextKey={'deleteArticle'}
                  onSubmit={() => handleDeleteArticle(article.slug)}
                  isError={isErrorDeleteArticle}
                  handleOpenTooltip={handleOpenTooltip}
                />
              ) : null}

              <Link
                to={`/articles/${article.slug}/edit`}
                className={styles.header__aside__btn + ' ' + styles['header__aside__btn--green']}
              >
                Edit
              </Link>
            </PrivateContent>
          ) : null}
        </div>
      </div>
      {isFull ? (
        <div className={styles.article__main}>
          <Markdown>{article.body.trim() ? article.body : 'No Text'}</Markdown>
        </div>
      ) : null}
    </div>
  );
}

export default Article;

import { Arrow } from '../../assets/icons/Arrow';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { selectArticlesCount } from '../../store/features/articles/selectors';
import { setCurrentPage } from '../../store/features/pagination/paginationSlice';
import { selectCurrentPage, selectPageSize } from '../../store/features/pagination/selectors';

import style from './pagination.module.scss';

type TPagination = {
  maxVisiblePages: number;
  isDisabledPagination?: boolean;
};

function Pagination({ maxVisiblePages, isDisabledPagination }: TPagination) {
  const dispatch = useAppDispatch();
  const pageSize = useAppSelector(selectPageSize);
  const articlesCount = useAppSelector(selectArticlesCount);
  const currentPage = useAppSelector(selectCurrentPage);

  const onPageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const windowSize = maxVisiblePages;
  const pagesCount = Math.ceil(articlesCount / pageSize);

  const windowIndex = Math.floor((currentPage - 1) / windowSize);
  const windowStart = windowIndex * windowSize;
  const windowEnd = Math.min(windowStart + windowSize, pagesCount);

  const pages = !pagesCount
    ? Array.from({ length: maxVisiblePages }, (_, i) => i + 1)
    : Array.from({ length: windowEnd - windowStart }, (_, i) => windowStart + i + 1);

  return (
    <div className={style.pagination}>
      <button
        className={style.pagination__btn}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1 || isDisabledPagination}
      >
        <Arrow rotation="prev" isDisabled={currentPage === 1} />
      </button>

      {pages.map((page) => (
        <button
          className={`${style.pagination__page} ${page === currentPage ? style.pagination__page__active : ''}`}
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage || isDisabledPagination}
        >
          {page}
        </button>
      ))}

      <button
        className={style.pagination__btn}
        onClick={() => onPageChange(Math.min(pagesCount, currentPage + 1))}
        disabled={currentPage === pagesCount || isDisabledPagination}
      >
        <Arrow rotation="next" isDisabled={currentPage === pagesCount} />
      </button>
    </div>
  );
}

export default Pagination;

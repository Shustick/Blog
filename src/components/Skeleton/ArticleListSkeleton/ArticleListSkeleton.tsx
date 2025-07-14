import Pagination from '../../Pagination';
import ArticleSkeleton from '../ArticleSkeleton/ArticleSkeleton';

import styles from './skeleton.module.scss';

export type SkeletonProps = {
  skeletonClass: 'skeleton__articlesList' | 'skeleton__article';
};

function Skeleton({ skeletonClass }: SkeletonProps) {
  return (
    <>
      {skeletonClass === 'skeleton__articlesList' ? (
        <>
          <div className={styles.skeleton}>
            {Array.from({ length: 5 }).map((_, i) => (
              <ArticleSkeleton key={i} skeletonClass={skeletonClass} />
            ))}
          </div>
          <Pagination maxVisiblePages={5} isDisabledPagination />
        </>
      ) : (
        <div className={styles.skeleton}>
          <ArticleSkeleton skeletonClass={skeletonClass} />
        </div>
      )}
    </>
  );
}

export default Skeleton;

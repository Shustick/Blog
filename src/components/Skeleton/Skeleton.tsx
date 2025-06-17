import ArticleSkeleton from './ArticleSkeleton';
import styles from './skeleton.module.scss';

export type SkeletonProps = {
  skeletonClass: 'skeleton__articlesList' | 'skeleton__article';
};

function Skeleton({ skeletonClass }: SkeletonProps) {
  return (
    <div className={styles.skeleton}>
      {skeletonClass === 'skeleton__articlesList' ? (
        Array.from({ length: 5 }).map((_, i) => <ArticleSkeleton key={i} skeletonClass={skeletonClass} />)
      ) : (
        <ArticleSkeleton skeletonClass={skeletonClass} />
      )}
    </div>
  );
}

export default Skeleton;

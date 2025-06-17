import type { SkeletonProps } from './Skeleton';
import styles from './skeleton.module.scss';

function ArticleSkeleton({ skeletonClass }: SkeletonProps) {
  return (
    <div className={styles[skeletonClass]}>
      <div className={styles.skeleton__title}></div>
      <ul className={styles.skeleton__tags}>
        <li className={styles.skeleton__tags__tag}></li>
        <li className={styles.skeleton__tags__tag}></li>
        <li className={styles.skeleton__tags__tag}></li>
      </ul>
      <div className={styles.skeleton__description}></div>
      <div className={styles.skeleton__author}></div>
    </div>
  );
}
export default ArticleSkeleton;

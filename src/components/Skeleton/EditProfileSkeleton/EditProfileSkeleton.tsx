import styles from './editProfileSkeleton.module.scss';

function EditProfileSkeleton() {
  return (
    <div className={styles.skeleton}>
      <span className={styles.skeleton__title} />
      <ul className={styles.skeleton__inputs}>
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className={styles.skeleton__inputs__input} />
        ))}
      </ul>
      <span className={styles.skeleton__submitBtn} />
    </div>
  );
}
export default EditProfileSkeleton;

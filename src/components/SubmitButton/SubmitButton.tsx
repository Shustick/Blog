import styles from './submitButton.module.scss';

interface SubmitButtonProps {
  isLoading: boolean;
  isError?: string | null;
  submitText: string;
  className?: string;
}

function SubmitButton({ isLoading, submitText, className, isError }: SubmitButtonProps) {
  return (
    <>
      {isError ? <div className={styles.error}>Server Error: {isError}</div> : null}
      <button type="submit" className={styles.submit + ' ' + className}>
        {isLoading ? <span className={styles.submit__text}>Loading</span> : submitText}
      </button>
    </>
  );
}
export default SubmitButton;

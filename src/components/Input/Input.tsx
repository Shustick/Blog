import type { InputHTMLAttributes } from 'react';
import type React from 'react';

import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  errorSmallSize?: boolean;
  isTextarea?: boolean;
}

function Input({ id, error, errorMessage, errorSmallSize, className, isTextarea = false, ...rest }: InputProps) {
  return (
    <div>
      {isTextarea ? (
        <textarea
          spellCheck
          id={id}
          className={`${styles.input} ${styles.textarea} ${error ? styles['input--error'] : ''} ${className ?? ''}`}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={`${styles.input} ${error ? styles['input--error'] : ''} ${className ?? ''}`}
          {...rest}
        />
      )}
      {error && (
        <div className={`${styles.error} ${errorSmallSize ? styles['error--small'] : ''} ${className ?? ''}`}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default Input;

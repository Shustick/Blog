import { Warning } from '../../assets/icons/Warning';

import styles from './tooltip.module.scss';

const tooltipTexts = {
  deleteArticle: 'Are you sure to delete this article?',
  createArticle: 'Are you sure to create this article?',
} as const;

type TooltipTextKey = keyof typeof tooltipTexts;

interface TooltipProps {
  isLoading: boolean;
  isError?: string | null;
  tooltipTextKey: TooltipTextKey;
  onSubmit: () => void;
  handleOpenTooltip: () => void;
}

function Tooltip({ isLoading, isError, tooltipTextKey, onSubmit, handleOpenTooltip }: TooltipProps) {
  return (
    <div className={styles.tooltipContainer}>
      <span className={styles.tooltip__arrow}></span>
      <div className={styles.tooltip}>
        <div className={styles.tooltip__textContainer}>
          <span className={styles.tooltip__textContainer__icon}>
            <Warning />
          </span>
          <p className={styles.tooltip__textContainer__text}>{tooltipTexts[tooltipTextKey]}</p>
        </div>
        {isError ? <div className={styles.tooltip__error}>Server Error: {isError}</div> : null}
        <div className={styles.tooltip__BtnContainer}>
          <button
            className={styles.tooltip__BtnContainer__btn + ' ' + styles['tooltip__BtnContainer__btn--gray']}
            disabled={isLoading}
            onClick={handleOpenTooltip}
          >
            No
          </button>
          <button
            type="submit"
            className={styles.tooltip__BtnContainer__btn + ' ' + styles['tooltip__BtnContainer__btn--blue']}
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? <span className={styles.tooltip__BtnContainer__btn__loader}></span> : 'Yes'}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Tooltip;

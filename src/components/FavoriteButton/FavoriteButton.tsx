import { FilledHeart } from '../../assets/icons/FilledHeart';
import { Heart } from '../../assets/icons/Heart';

import styles from './favoriteButton.module.scss';

interface FavoriteButtonProps {
  favoritesCount: number;
  isFavorite: boolean;
  handleFavorite: () => void;
  disabled: boolean;
}

function FavoriteButton({ favoritesCount, isFavorite, handleFavorite, disabled }: FavoriteButtonProps) {
  return (
    <>
      <button className={styles.button} onClick={handleFavorite} disabled={disabled}>
        <span className={styles.button__icon}>{isFavorite ? <FilledHeart /> : <Heart />}</span>
        <span className={styles.button__count}>{favoritesCount}</span>
      </button>
    </>
  );
}
export default FavoriteButton;

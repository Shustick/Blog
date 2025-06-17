import { Link } from 'react-router-dom';

import defaultImage from '../../assets/authorImage.png';

import styles from './header.module.scss';

function Header() {
  const isLogged = false;
  return (
    <header className={styles.header}>
      <Link to={'/'} className={styles.header__title}>
        Realworld Blog
      </Link>
      <div className={styles.header__nav}>
        {isLogged ? (
          <>
            <button className={`${styles.header__nav__createArticle} greenBtn`}>Create article</button>
            <button className={styles.header__nav__author}>
              <span className={styles.author__name}>John Doe</span>
              <img src={defaultImage} className={styles.author__image}></img>
            </button>
            <button className={styles.header__nav__logOut}>Log Out</button>
          </>
        ) : (
          <>
            <button className={styles.header__nav__signIn}>Sign In</button>
            <button className={`${styles.header__nav__signUp} greenBtn`}>Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

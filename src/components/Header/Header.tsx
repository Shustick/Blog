import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import defaultImage from '../../assets/authorImage.png';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { logout } from '../../store/features/auth/authSlice';
import { selectUser } from '../../store/features/auth/selectors';

import styles from './header.module.scss';

function Header() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const userData = useAppSelector(selectUser);

  const handleLogOut = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.header__title}>
        Realworld Blog
      </Link>
      <div className={styles.header__nav}>
        {userData ? (
          <>
            <Link to="/new-article" className={`${styles.header__nav__createArticle} greenBtn`}>
              Create article
            </Link>
            <Link to="/profile" className={styles.header__nav__author}>
              <span className={styles.author__name}>{userData.username}</span>
              <img src={userData.image ?? defaultImage} className={styles.author__image}></img>
            </Link>
            <button className={styles.header__nav__logOut} onClick={handleLogOut}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/sign_in" className={styles.header__nav__signIn}>
              Sign In
            </Link>
            <Link to="/sign_up" className={`${styles.header__nav__signUp} greenBtn`}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

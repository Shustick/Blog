import { useEffect } from 'react';

import { useAppDispatch } from './hooks/reduxHooks';
import Routes from './routes/routes';
import './styles/global.scss';
import { getCurrentUser } from './store/features/auth/authSlice';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getCurrentUser(token));
    }
  }, [dispatch]);
  return <Routes />;
}

export default App;

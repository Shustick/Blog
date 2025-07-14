import type React from 'react';
import { Route, Redirect, type RouteProps } from 'react-router-dom';

import { useAppSelector } from '../../hooks/reduxHooks';
import { selectUser } from '../../store/features/auth/selectors';
interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const isAuthenticated = useAppSelector(selectUser) || localStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/sign_in',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;

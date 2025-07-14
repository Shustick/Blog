import type React from 'react';

import { useAppSelector } from '../../hooks/reduxHooks';
import { selectUser } from '../../store/features/auth/selectors';

interface ProtectedContentProps {
  isForbidden?: boolean;
  children: React.ReactNode;
}

const PrivateContent = ({ isForbidden, children }: ProtectedContentProps) => {
  const isAuthenticated = useAppSelector(selectUser);

  if (!isAuthenticated || isForbidden) return null;

  return <>{children}</>;
};

export default PrivateContent;

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserRole, isAuthenticated } from './auth';

const PrivateRoute = ({ children, roles }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    alert('로그인이 필요합니다.');
    return <Navigate to="/user-login" state={{ from: location }} />;
  }

  const userRole = getUserRole();
  if (roles && roles.indexOf(userRole) === -1) {
    alert('접근 권한이 없습니다.');
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;

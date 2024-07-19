import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole, isAuthenticated } from './auth';

const PrivateRoute = ({ component: Component, roles }) => {
  return (props) => {
    if (!isAuthenticated()) {
      return <Navigate to="/user-login" state={{ from: props.location }} />;
    }

    const userRole = getUserRole();
    if (roles && roles.indexOf(userRole) === -1) {
      return <Navigate to="/" />;
    }

    return <Component {...props} />;
  };
};

export default PrivateRoute;
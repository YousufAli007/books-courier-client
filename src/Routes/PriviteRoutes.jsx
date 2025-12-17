import React from 'react';
import useAuth from '../Hook/useAuth';
import { Navigate } from 'react-router';

const PriviteRoutes = ({children}) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }
  if(!user){
    return <Navigate to='/login'></Navigate>
  }
  return children;
};

export default PriviteRoutes;
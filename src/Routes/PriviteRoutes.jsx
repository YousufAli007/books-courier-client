import React from 'react';
import useAuth from '../Hook/useAuth';
import { Navigate } from 'react-router';
import LoadingPage from '../Components/LoadingPage';

const PriviteRoutes = ({children}) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoadingPage/> 
  }
  if(!user){
    return <Navigate to='/login'></Navigate>
  }
  return children;
};

export default PriviteRoutes;
import React from 'react';
import useAuth from '../Hook/useAuth';
import { Navigate, useLocation } from 'react-router';
import LoadingPage from '../Components/LoadingPage';
import Loading from '../Components/Loading';

const PriviteRoutes = ({children}) => {
  const { user, loading } = useAuth();
  const location =useLocation()
  // console.log(location)
  if (loading) {
    return <Loading/>
  }
  if(!user){
    return <Navigate state={location.pathname} to='/login'></Navigate>
  }
  return children;
};

export default PriviteRoutes;
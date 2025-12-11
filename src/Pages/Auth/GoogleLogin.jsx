import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hook/useAuth';
import { useNavigate } from 'react-router';

const GoogleLogin = () => {
  const navigate =useNavigate()
   const  {googleLogin}  = useAuth();
  //  console.log(googleLogin)
  const handleGoogleLoding=()=>{
    googleLogin()
    .then(res =>{
      console.log(res)
      navigate('/')
    })
    .catch(erro =>{
      console.log(erro)
    })
  }
  return (
    <button onClick={handleGoogleLoding} className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-gray-600 hover:border-cyan-500 transition-all backdrop-blur-md group">
                <FcGoogle className="text-2xl group-hover:scale-110 transition" />
                <span className="text-white font-medium">Continue with Google</span>
              </button>
  );
};

export default GoogleLogin;
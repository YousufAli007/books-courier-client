import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
 import{createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth"
import { auth } from "../Firebase/firebase.config";

 const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user,setUser]=useState(null)
  const [loading,setLoading]=useState(true)
  // googleLogin
  const googleLogin =()=>{
    return signInWithPopup(auth,googleProvider)
  }
  // CreateUser
  const createUser =(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password) 
  }
  // sign in
  const signInUser = (email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email,password)
  }
  // update user's profile
  const updateUser =(profile)=>{
    setLoading(true)
    return updateProfile(auth.currentUser,profile)
  }
  // current user
  useEffect(()=>{
    const unSubcribe = onAuthStateChanged(auth ,currentUser =>{
      setUser(currentUser)
      setLoading(false)
      
    })
    return ()=>{
      unSubcribe()
    }
  },[])

  // LogOut
  const logOut =()=>{
    return signOut(auth)
  }
  const authInfo = {
    googleLogin,
    createUser,
    signInUser,
    updateUser,
    user,
    loading,
    logOut,
  };

  return (
    <AuthContext value={authInfo}>{children}</AuthContext>
  );
};

export default AuthProvider;

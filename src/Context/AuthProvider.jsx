import React from "react";
import { AuthContext } from "./AuthContext";
 import{createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile} from "firebase/auth"
import { auth } from "../Firebase/firebase.config";

 const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  // googleLogin
  const googleLogin =()=>{
    return signInWithPopup(auth,googleProvider)
  }
  // CreateUser
  const createUser =(email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password) 
  }
  // sign in
  const signInUser = (email,password)=>{
    return signInWithEmailAndPassword(auth, email,password)
  }
  // update user's profile
  const updateUser =(profile)=>{
    return updateProfile(auth.currentUser,profile)
  }
  const authInfo = {
    googleLogin,
    createUser,
    signInUser,
    updateUser,
  };

  return (
    <AuthContext value={authInfo}>{children}</AuthContext>
  );
};

export default AuthProvider;

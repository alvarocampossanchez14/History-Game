import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "./firebase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [usuarioLogueado, setUsuarioLogueado] = useState(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? true : false
  });
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setUsuarioLogueado(true);

      localStorage.setItem('user', JSON.stringify(user))
    } else {
      setUsuarioLogueado(false);
      localStorage.removeItem('user')
    }
  }, [user]);

  return ( 
    <AuthContext.Provider value={usuarioLogueado}>
      {children}
    </AuthContext.Provider>
  );
};
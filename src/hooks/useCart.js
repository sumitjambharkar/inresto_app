import React, { createContext, useContext,useState,useEffect } from "react";
import {  signInWithEmailAndPassword ,onAuthStateChanged,signOut} from "firebase/auth";
import { auth, db } from "../firebase";
const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
   
    const [input, setInput] = useState("")
    const [user,setUser] = useState(null)
    
    const login =(email,password)=>{
        signInWithEmailAndPassword(auth,email,password)
        .then((result) => {
        setUser(result)

      })
      .catch(() => {
        alert('User Wrong')
      });
    }

    const logout = () => {
      return signOut(auth).then((user) => {
        setUser(user)
      });
    };

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
      return unsubscribe;
    }, [user]);
    
    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            input,setInput
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default function useCart() {
    return useContext(AuthContext);
}

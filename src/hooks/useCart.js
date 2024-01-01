import React, { createContext, useContext } from "react";
const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
   
    return (
        <AuthContext.Provider
            value={{
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default function useCart() {
    return useContext(AuthContext);
}

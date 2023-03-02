import React, { createContext, useContext, useReducer } from "react";
import reducer from "./cartReducer";

const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
   
    const initialState = {
        table : [],
        
    }
    
    const [state, dispatch] = useReducer(reducer,initialState)
    
    return (
        <AuthContext.Provider
            value={{
            ...state,dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default function useCart() {
    return useContext(AuthContext);
}

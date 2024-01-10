import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
axios.defaults.withCredentials = true;

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const token = Cookies.get("user");
  const item = token ? decodeToken(token) : null;
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(`${config}/user/${item.id}`, { withCredentials: true });
        setUser(result.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (item && item.id) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [item]);

  const login = async ({ email, password }) => {
    console.log(email, password);
    try {
      const result = await axios.post(`${config}/admin-login`, {
        email: email,
        password: password,
      });
      Cookies.set("user", JSON.stringify(result.data.token));
      Cookies.set("isLoggedIn", true);
      window.location.reload()
    } catch (error) {
      console.log(error);
      // Handle login error (e.g., show error message to the user)
    }
  };

  const logout = () => {
    Cookies.remove("user");
    Cookies.remove("isLoggedIn");
    setUser(null);
    window.location.reload()
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        user,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import useAuth from "./hooks/useAuth";


const LoginScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")


  const adminLogin = async (e) => {
    e.preventDefault();
    login({email,password})
  };

  return (
    <div className="banner">
      <form onSubmit={adminLogin} className="form mx-1 mx-md-4">
        <h3 style={{ color: "#fff", margin: "12px" }}>Welcome</h3>
        <div className="d-flex flex-row align-items-center mb-4">
          <div className="form-outline flex-fill mb-0">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label">Your Email</label>
          </div>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <div className="form-outline flex-fill mb-0">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label">Password</label>
          </div>
        </div>

        <div className="create_button">
          <Button variant="contained" color="success"
            type="submit"
          >
          Create
          </Button>   
          <Button variant="contained" color="success"
            type="submit"
          >
          Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCart from "./hooks/useCart";
import axios from "axios";
import { Button } from "@mui/material";

const LoginScreen = () => {
  const { login } = useCart();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const adminLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3002/admin-login", {
        email: email,
        password: password,
      });
      console.log(result.data.message);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
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

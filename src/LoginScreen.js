import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useCart from './hooks/useCart';

const LoginScreen = () => {

  const { login } = useCart()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  return (

    <div className="banner">
      <form className="form mx-1 mx-md-4">
        <h3 style={{ color: "#fff", margin: "12px" }}>Welcome</h3>
        <div className="d-flex flex-row align-items-center mb-4">
          <div className="form-outline flex-fill mb-0">
            <input type="email" className="form-control" value={email} onChange={(e) => setemail(e.target.value)} />
            <label className="form-label" >Your Email</label>
          </div>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <div className="form-outline flex-fill mb-0">
            <input type="password" className="form-control" value={password} onChange={(e) => setpassword(e.target.value)} />
            <label className="form-label" >Password</label>
          </div>
        </div>

        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
          <button type="button" className="btns btn-primary btn-lg" onClick={() => login(email, password)}>Login</button>
        </div>

      </form>
    </div>

  )
}

export default LoginScreen;
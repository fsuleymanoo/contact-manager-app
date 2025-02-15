import React from 'react'
import { useNavigate } from 'react-router';

function Login() {

const handleOnSubmit = (e) => {

  const navigate = useNavigate(); 
  e.preventDefault();
  navigate('/home')
} 




  return (
    <div className="text-light d-flex justify-content-center align-items-center mt-5">
      <GlassCard>
        <h2 className="text-center my-4">Login to your account</h2>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <input type="password" className="form-control p-4" id="email" placeholder="email" />
          </div>
          <h6 className="text-center mb-3">
            Sign Up
            <div className="text-center"> 
            <Link className="text-decoration-none fs-5 fw-bold" to="/signup">Login</Link>
            </div>
            
          </h6>
          <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          </div>
       
        </form>
      </GlassCard>
    </div>
  );
}

export default Login

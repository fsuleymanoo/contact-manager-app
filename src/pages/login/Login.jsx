import React from 'react';
import GlassCard from '../../components/glassCard/GlassCard';
import '../signup/Signup.css';
import { Link, useNavigate } from 'react-router';

function Login() {
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    navigate('/home')
  };

  return (
    <div className="text-light d-flex justify-content-center align-items-center mt-5">
      <GlassCard>
        <h2 className="text-center my-4">Login to your account</h2>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control p-4"
              id="email"
              placeholder="email..."
            />
          </div>
          <h6 className="text-center">Dont have an account yet?</h6>
          <div className="text-center mb-5">
            <Link className="text-decoration-none fs-5 fw-bold" to="/signup">
              Sign Up
            </Link>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary mb-4">
              Login
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}

export default Login;

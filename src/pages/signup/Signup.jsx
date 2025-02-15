import "./Signup.css";
import GlassCard from "../../components/glassCard/GlassCard";
import { Link } from "react-router";

function Signup() {
  return (
    <div className="text-light d-flex justify-content-center align-items-center mt-5">
      <GlassCard>
        <h2 className="text-center my-4">Register Account</h2>
        <form>
          <div className="mb-3">
            <input
              type="email"
              className="form-control p-4"
              id="fullname"
              aria-describedby="full name"
              placeholder="full name"
            />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control p-4" id="email" placeholder="email" />
          </div>
          <h6 className="text-center mb-3">
            Already a member?
            <div className="text-center"> 
            <Link className="text-decoration-none fs-5 fw-bold" to="/login">Login</Link>
            </div>
            
          </h6>
          <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          </div>
       
        </form>
      </GlassCard>
    </div>
  );
}

export default Signup;

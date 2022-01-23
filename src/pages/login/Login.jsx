import { useState } from "react";
import Header from "../../shared/header/Header";
import "./Login.scss";
export default function Login() {
  const [credential, setCredential] = useState({ email: "", password: "" });

  const onInputChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    const { name, value } = e.target;
    setCredential((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  };
  const handleLoginClick = () => {
    console.log(credential);
  };
  return (
    <div className="portal-login-wrapper ">
      <Header show={false} />
      <div className="portal-login">
        <div className="card">
          <div className="login-text">Login</div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              value={credential.email}
              onChange={onInputChange}
              placeholder="Enter Your email"
            />
          </div>
          <div className="form-group">
            <div className="d-flex justify-content-between">
              <label htmlFor="passwordInput">Password</label>
              <div className="btn btn-link">Forgot Your Password?</div>
            </div>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              name="password"
              value={credential.password}
              onChange={onInputChange}
              placeholder="Enter Your Password"
            />
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-primary text-white"
              onClick={handleLoginClick}
            >
              Login
            </button>
          </div>
          <div className="form-group d-flex justify-content-center mt-4">
            <span>
              New to MyJobs?
              <div className="btn btn-link ">Create an account</div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

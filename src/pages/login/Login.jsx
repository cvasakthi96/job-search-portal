import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { PAGE_URLS } from "../../constants/pagurl.constants";
import { userLoginService } from "../../services/login/login.service";
import Header from "../../shared/header/Header";
import commonActions from "../../store/actions/common.action";
import userActions from "../../store/actions/user.action";
import ResetPassword from "./forget-credential/ResetPassword";
import "./Login.scss";
export default function Login() {
  const [credential, setCredential] = useState({ email: "", password: "" });
  const [hasError, setHasError] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const onInputChange = (e) => {
    removeErrMsg();
    const { name, value } = e.target;
    setCredential((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  };
  const removeErrMsg = () => {
    setHasError(false);
    setIsPasswordEmpty(false);
    setIsEmailEmpty(false);
  };
  const handleLoginClick = () => {
    console.log(credential);
    if (!credential.email) {
      setIsEmailEmpty(true);
      return;
    }
    if (!credential.password) {
      setIsPasswordEmpty(true);
      return;
    }
    if (credential.email && credential.password) {
      dispatch(commonActions.showLoaderOverlay());
      userLoginService(credential)
        .then((res) => {
          const { data, code, success } = res.data;
          //   console.log(res.data);
          localStorage.setItem("portal-token", JSON.stringify(data?.token));
          dispatch(userActions.updateUser(data));
          dispatch(commonActions.hideLoaderOverlay());
          if (success && code === 200) {
            history.push(PAGE_URLS.DashBoard.path);
          }
        })
        .catch((err) => {
          const { success, code } = err.response.data;
          if (!success && code) {
            localStorage.removeItem("portal-token");
            dispatch(commonActions.hideLoaderOverlay());
            setHasError(true);
          }
        });
    }
  };

  const handleCreateAccount = () => {
    history.push(PAGE_URLS.SignupPage.path);
  };
  return (
    <>
      <div className="portal-login-wrapper ">
        <Header show={false} />
        {showResetPassword ? (
          <ResetPassword />
        ) : (
          <div className="portal-login">
            <div className="card py-2">
              <div className="login-text">Login</div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  name="email"
                  {...(hasError || isEmailEmpty
                    ? { className: "form-control is-invalid" }
                    : { className: "form-control " })}
                  id="email"
                  value={credential.email}
                  onChange={onInputChange}
                  placeholder="Enter Your email"
                />
                <div className="invalid-feedback text-right">
                  {isEmailEmpty && "The field is mandatory. "}
                </div>
              </div>
              <div className="form-group">
                <div className="d-flex justify-content-between">
                  <label htmlFor="passwordInput">Password</label>
                  <div
                    className="btn btn-link"
                    onClick={() => setShowResetPassword(true)}
                  >
                    Forgot Your Password?
                  </div>
                </div>
                <input
                  {...(hasError || isPasswordEmpty
                    ? { className: "form-control is-invalid" }
                    : { className: "form-control " })}
                  type="password"
                  id="passwordInput"
                  name="password"
                  value={credential.password}
                  onChange={onInputChange}
                  placeholder="Enter Your Password"
                />
                <div className="invalid-feedback text-right">
                  {hasError && "Incorrect email address or password"}
                  {isPasswordEmpty && "The field is mandatory. "}
                </div>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <button
                  className="btn btn-primary text-white"
                  onClick={handleLoginClick}
                >
                  Login
                </button>
              </div>
              <div className="form-group d-flex justify-content-center mb-3">
                <span>
                  New to MyJobs?
                  <div className="btn btn-link " onClick={handleCreateAccount}>
                    Create an account
                  </div>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

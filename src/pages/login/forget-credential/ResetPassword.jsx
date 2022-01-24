import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { PAGE_URLS } from "../../../constants/pagurl.constants";
import {
  changePasswordService,
  getResetPasswordService,
  verifyPasswordTokenService,
} from "../../../services/login/login.service";
import commonActions from "../../../store/actions/common.action";
import userActions from "../../../store/actions/user.action";
import "./ResetPassword.scss";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [tempToken, setTempToken] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(false);
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);

  const validateTempToken = useCallback(() => {
    if (tempToken) {
      dispatch(commonActions.showLoaderOverlay());
      //getting token for password reset
      verifyPasswordTokenService(tempToken)
        .then((res) => {
          const { code, success } = res.data;
          dispatch(commonActions.hideLoaderOverlay());
          if (success && code === 200) {
            setShowResetForm(true);
          }
        })
        .catch((err) => {
          const { success, code } = err.response.data;
          if (!success && code) {
            dispatch(commonActions.hideLoaderOverlay());
            history.push(PAGE_URLS.LoginPage.path);
          }
        });
    }
  }, [tempToken, history, dispatch]);
  useEffect(() => {
    if (tempToken) {
      //validating temp token for next step
      validateTempToken();
    }
  }, [tempToken, validateTempToken]);

  const onInputChange = (e) => {
    setIsEmailEmpty(false);
    const { value } = e.target;
    setEmail(value);
  };
  const handleSubmit = () => {
    if (!email) {
      setIsEmailEmpty(true);
      return;
    }
    if (email) {
      dispatch(commonActions.showLoaderOverlay());
      //getting token for password reset
      getResetPasswordService(email)
        .then((res) => {
          const { data, success } = res.data;
          dispatch(commonActions.hideLoaderOverlay());
          if (success) {
            setTempToken(data?.token);
          }
        })
        .catch((err) => {
          const { success, code, message } = err.response.data;
          alert(message);
          if (!success && code) {
            dispatch(commonActions.hideLoaderOverlay());
          }
        });
    }
  };

  const handleReset = () => {
    if (!password) {
      setIsPasswordEmpty(true);
    }
    if (!ConfirmPassword) {
      setIsConfirmPasswordEmpty(true);
    }
    if (password === ConfirmPassword) {
      changePasswordService({
        password: password,
        confirmPassword: ConfirmPassword,
        token: tempToken,
      })
        .then((res) => {
          const { data, success } = res.data;
          dispatch(commonActions.hideLoaderOverlay());
          if (success) {
            localStorage.setItem("portal-token", data?.token);
            dispatch(userActions.updateUser(data));
            alert("password change successfully...");
            history.push(PAGE_URLS.DashBoard.path);
          } else {
            alert("Failed to change password....");
            history.push(PAGE_URLS.homePage.path);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          const { success, message } = err.response.data;
          if (!success) {
            alert(message);
            history.push(PAGE_URLS.LoginPage.path);
          } else {
            history.push(PAGE_URLS.homePage.path);
          }
          // if (!success && code) {
          //   dispatch(commonActions.hideLoaderOverlay());
          // }
        });
    } else {
      setIsPasswordMismatch(true);
    }
  };
  const onResetFormInputChange = (e) => {
    if (isPasswordEmpty) setIsPasswordEmpty(false);
    if (isConfirmPasswordEmpty) setIsConfirmPasswordEmpty(false);

    const { value, name } = e.target;
    if (name === "password") {
      setPassword(value.trim());
    } else {
      setConfirmPassword(value.trim());
    }
  };

  return (
    <div className="portal-reset">
      <div className="card py-2">
        {showResetForm ? (
          <>
            <div className="forget-text">Reset Your Password</div>
            <div className="forget-description">
              Enter your new password below.
            </div>
            <div className="form-group">
              <label htmlFor="newpassword">New password</label>
              <input
                {...(isPasswordEmpty
                  ? { className: "form-control is-invalid" }
                  : { className: "form-control " })}
                type="password"
                id="passwordInput"
                name="password"
                value={password}
                onChange={onResetFormInputChange}
                placeholder="Enter Your Password"
              />
              <div className="invalid-feedback text-right">
                {isPasswordEmpty && "The field is mandatory. "}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="ConfirmNewpassword">Confirm New password</label>
              <input
                {...(isConfirmPasswordEmpty
                  ? { className: "form-control is-invalid" }
                  : { className: "form-control " })}
                type="password"
                id="confirmPasswordInput"
                name="confirmPassword"
                value={ConfirmPassword}
                onChange={onResetFormInputChange}
                placeholder="Enter Your Password"
              />
              <div className="invalid-feedback text-right">
                {isConfirmPasswordEmpty && "The field is mandatory. "}
                {isPasswordMismatch && "Password doesn't match"}
              </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-primary text-white"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="forget-text">Forgot your password?</div>
            <div className="forget-description">
              Enter the email associated with your account and we’ll send you
              instructions to reset your password.
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                name="email"
                {...(isEmailEmpty
                  ? { className: "form-control is-invalid" }
                  : { className: "form-control " })}
                id="email"
                value={email}
                onChange={onInputChange}
                placeholder="Enter Your email"
              />
              <div className="invalid-feedback text-right">
                {isEmailEmpty && "The field is mandatory. "}
              </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-primary text-white"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

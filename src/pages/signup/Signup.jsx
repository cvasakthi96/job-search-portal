import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { PAGE_URLS } from "../../constants/pagurl.constants";
import {
  createAccountService,
  userLoginService,
} from "../../services/login/login.service";
import Header from "../../shared/header/Header";
import commonActions from "../../store/actions/common.action";
import userActions from "../../store/actions/user.action";
import "./Signup.scss";
export default function Signup() {
  const [userData, setUserData] = useState({
    userRole: 0,
    email: "",
    password: "",
    confirmPassword: "",
    skills: "",
    name: "",
  });
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(false);
  const [isSkillsEmpty, setIsSkillsEmpty] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onInputChange = (e) => {
    removeErrMsg();
    const { name, value } = e.target;
    setUserData((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  };
  const removeErrMsg = () => {
    setIsPasswordEmpty(false);
    setIsEmailEmpty(false);
    setIsSkillsEmpty(false);
    setIsConfirmPasswordEmpty(false);
    setIsNameEmpty(false);
  };
  const handleSingup = () => {
    const { email, confirmPassword, name, password, skills, userRole } =
      userData;
    if (!email) {
      setIsEmailEmpty(true);
    }
    if (!name) {
      setIsNameEmpty(true);
    }
    if (!password) {
      setIsPasswordEmpty(true);
    }
    if (!confirmPassword) {
      setIsConfirmPasswordEmpty(true);
    }
    if (!skills) {
      setIsSkillsEmpty(true);
    }
    if (password !== confirmPassword) {
      alert("confirm password not matched...");
      return;
    }
    if (email && password && confirmPassword && name && skills) {
      dispatch(commonActions.showLoaderOverlay());
      createAccountService(userData)
        .then((res) => {
          const { data, code, success } = res.data;
          localStorage.setItem("portal-token", JSON.stringify(data?.token));
          dispatch(userActions.updateUser(data));
          dispatch(commonActions.hideLoaderOverlay());
          if (success) {
            history.push(PAGE_URLS.DashBoard.path);
          }
        })
        .catch((err) => {
          const { success, code } = err.response.data;
          if (!success && code) {
            localStorage.removeItem("portal-token");
            dispatch(commonActions.hideLoaderOverlay());
          }
        });
    }
  };

  const handleLoginBtn = () => {
    history.push(PAGE_URLS.LoginPage.path);
  };
  return (
    <>
      <div className="portal-signup-wrapper ">
        <Header show={false} />
        <div className="portal-signup">
          <div className="card py-2">
            <div className="signup-text">Signup</div>
            <div className="user-role-wrapper">
              <div className="form-group">
                <label htmlFor="role">I’m a*</label>
                <div className="d-flex">
                  <div
                    {...(userData.userRole === 0
                      ? {
                          className:
                            "btn btn-lg btn-primary selected-role mr-3",
                        }
                      : {
                          className: "btn btn-lg not-selected-role mr-3",
                        })}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setUserData((prev) => {
                        prev["userRole"] = 0;
                        return { ...prev };
                      });
                    }}
                  >
                    <span className="p-1 mx-2">
                      <i className="fa fa-user"></i>
                    </span>
                    <span className="mx-2">Recruiter</span>
                  </div>
                  <div
                    {...(userData.userRole === 1
                      ? {
                          className: "btn btn-lg btn-primary selected-role",
                        }
                      : {
                          className: "btn btn-lg not-selected-role",
                        })}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setUserData((prev) => {
                        prev["userRole"] = 1;
                        return { ...prev };
                      });
                    }}
                  >
                    <span className="p-1 mx-2">
                      <i className="fa fa-users"></i>
                    </span>
                    <span>Candidate</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">Full Name*</label>
              <input
                type="text"
                name="name"
                {...(isNameEmpty
                  ? { className: "form-control is-invalid" }
                  : { className: "form-control " })}
                id="name"
                value={userData.name}
                onChange={onInputChange}
                placeholder="Enter Your full name"
              />
              <div className="invalid-feedback text-right">
                {isNameEmpty && "The field is mandatory. "}
              </div>
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
                value={userData.email}
                onChange={onInputChange}
                placeholder="Enter Your email"
              />
              <div className="invalid-feedback text-right">
                {isEmailEmpty && "The field is mandatory. "}
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-6 ">
                <div className="form-group">
                  <label htmlFor="passwordInput">Create Password</label>
                  <input
                    {...(isPasswordEmpty
                      ? { className: "form-control is-invalid" }
                      : { className: "form-control " })}
                    type="password"
                    id="passwordInput"
                    name="password"
                    value={userData.password}
                    onChange={onInputChange}
                    placeholder="Enter Your Password"
                  />
                  <div className="invalid-feedback text-right">
                    {isPasswordEmpty && "The field is mandatory. "}
                  </div>
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="form-group">
                  <label htmlFor="confirmPasswordInput">
                    Confirm Password*
                  </label>
                  <input
                    {...(isConfirmPasswordEmpty
                      ? { className: "form-control is-invalid" }
                      : { className: "form-control " })}
                    type="password"
                    id="confirmPasswordInput"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={onInputChange}
                    placeholder="Enter Your Password"
                  />
                  <div className="invalid-feedback text-right">
                    {isConfirmPasswordEmpty && "The field is mandatory. "}
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="skills">Skills</label>
              <input
                type="text"
                name="skills"
                {...(isSkillsEmpty
                  ? { className: "form-control is-invalid" }
                  : { className: "form-control " })}
                id="skills"
                value={userData.skills}
                onChange={onInputChange}
                placeholder="Enter comma separated skills"
              />
              <div className="invalid-feedback text-right">
                {isSkillsEmpty && "The field is mandatory. "}
              </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-primary text-white"
                onClick={handleSingup}
              >
                Signup
              </button>
            </div>
            <div className="form-group d-flex justify-content-center mb-3">
              <span>
                Have an account? Login
                <div className="btn btn-link " onClick={handleLoginBtn}>
                  Login
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

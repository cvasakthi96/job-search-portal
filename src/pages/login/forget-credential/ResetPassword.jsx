import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import "./ResetPassword.scss";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const onInputChange = (e) => {
    setIsEmailEmpty(false);
    const { value } = e.target;
    setEmail(value);
  };
  const handleSubmit = () => {
    if (!email) {
      setIsEmailEmpty(true);
    }
  };
  return (
    <div className="portal-reset">
      <div className="card py-2">
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
          <button className="btn btn-primary text-white" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

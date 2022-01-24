import { useHistory } from "react-router";
import { PAGE_URLS } from "../../../constants/pagurl.constants";

export default function GetStarted() {
  const history = useHistory();
  const handleGetStartedBtn = () => {
    history.push(PAGE_URLS.SignupPage.path);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6  welcome-text-wrapper  mt-sm-3">
          <div className="welcome-text">
            <div className="welcome-info font-weight-bold">
              <span className="text-white d-md-block">Welcom to </span>
              <span>
                <span className="text-white">My</span>
                <span className="text-primary">Jobs</span>
              </span>
            </div>
            <div className="my-3 d-flex justify-content-md-start justify-content-center">
              <button
                className="btn btn-sm btn-primary  text-white"
                onClick={handleGetStartedBtn}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 image-banner-wrapper mt-md-0 mt-3  d-flex justify-content-center">
          <div className="image-banner mt-md-5 mr-md-5 mx-2">
            <img src="assets/images/banner.png" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

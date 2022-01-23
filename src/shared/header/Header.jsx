import { useHistory } from "react-router";
import { PAGE_URLS } from "../../constants/pagurl.constants";
import "./Header.scss";
export default function Header({ show = true }) {
  const history = useHistory();
  const handleloginBtn = () => {
    history.push(PAGE_URLS.LoginPage.path);
  };
  const handleLogoClick = () => {
    history.push(PAGE_URLS.homePage.path);
  };
  return (
    <div className=" header-wrapper mx-4">
      <div className="d-flex justify-content-between  align-items-center w-100 py-2 portal-header">
        <div
          className=" d-flex align-items-center logo"
          onClick={handleLogoClick}
          style={{ userSelect: "none", cursor: "pointer" }}
        >
          <span className="text-white">My</span>
          <span className="text-primary">Jobs</span>
        </div>

        {show && (
          <div className="action-btn ">
            <button
              className="btn btn-sm btn-secondary text-white"
              onClick={handleloginBtn}
            >
              Login/Signup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

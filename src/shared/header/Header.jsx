import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Popover, PopoverBody } from "reactstrap";
import { PAGE_URLS } from "../../constants/pagurl.constants";
import userActions from "../../store/actions/user.action";
import "./Header.scss";
export default function Header({
  show = true,
  showProfile = false,
  handlePostJob,
}) {
  const { user } = useSelector((state) => state.user);
  const [showPopover, setShowPopover] = useState(false);
  const { name } = user;
  const dispatch = useDispatch();
  const history = useHistory();
  const handleloginBtn = () => {
    history.push(PAGE_URLS.LoginPage.path);
  };
  const handleLogoClick = () => {
    history.push(PAGE_URLS.homePage.path);
  };
  const togglePopover = () => {
    setShowPopover((prev) => !prev);
  };
  const handleLogout = () => {
    localStorage.removeItem("portal-token");
    dispatch(userActions.updateUser(""));
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
        {showProfile && (
          <div className="d-flex align-items-center">
            <div
              className="text-white mx-3"
              style={{ cursor: "pointer" }}
              onClick={handlePostJob}
            >
              Post a Job
            </div>
            <div
              className="profile"
              id="Popover1"
              onClick={() => togglePopover()}
            >
              {name ? name[0] : <i className="fa fa-user" />}
            </div>
            <Popover
              placement="bottom"
              isOpen={showPopover}
              target="Popover1"
              className="profile-popover"
              style={{ left: "-30px", top: "10px" }}
            >
              <PopoverBody>
                <div
                  classname="tip"
                  style={{
                    position: "absolute",
                    height: "15px",
                    width: "15px",
                    background: "white",
                    top: "-8px",
                    right: "30px",
                    transform: "translateY(-9px)",
                    transform: "rotate(44deg)",
                  }}
                />
                <div
                  className="btn"
                  style={{ width: "112px", height: "47" }}
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </PopoverBody>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
}

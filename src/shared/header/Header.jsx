import "./Header.scss";
export default function Header() {
  return (
    <div className=" header-wrapper mx-4">
      <div className="d-flex justify-content-between  align-items-center w-100 py-2 portal-header">
        <div className=" d-flex align-items-center logo">
          <span className="text-white">My</span>
          <span className="text-primary">Jobs</span>
        </div>

        <div className="action-btn ">
          <button className="btn btn-sm btn-secondary text-white">
            Login/Signup
          </button>
        </div>
      </div>
    </div>
  );
}

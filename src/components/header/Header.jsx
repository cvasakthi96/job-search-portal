import "./Header.scss";
export default function Header() {
  return (
    <div className="d-flex justify-content-between  align-items-center w-100 py-4 portal-header">
      <div className="d-flex mx-2">
        <p className="text-white">My</p>
        <span className="text-primary">Jobs</span>
      </div>
      <div className="action-btn mx-2">
        <button className="btn btn-sm btn-secondary">Login/Signup</button>
      </div>
    </div>
  );
}

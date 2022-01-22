import banner from "../../assets/banner.png";
export default function LandingPage() {
  return (
    <div className="container">
      <div className="d-flex" style={{ height: "200px" }}>
        <div className="flex-fill d-flex">
          <div className=" d-flex align-items-center logo">
            <span>Welcom to</span>
            <span>
              <span className="text-white">My</span>
              <span className="text-primary">Jobs</span>
            </span>
          </div>
        </div>
        <div className="flex-fill d-flex">
          <div className="image-banner">
            <img src={banner} alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

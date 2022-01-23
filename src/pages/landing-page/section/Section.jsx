import "./Section.scss";
export default function Section({ children }) {
  return (
    <div className="portal-section">
      <h5 className="why-us-text font-weight-bold">Why Us</h5>
      <div className=" my-1 d-flex flex-column flex-md-row portal-section-item">
        {children}
      </div>
    </div>
  );
}

import "./Loader.scss";
export default function Loader({ showLoader }) {
  return (
    <>
      {showLoader && (
        <div className="d-flex portal-loader justify-content-center align-items-center h-100 w-100">
          <div className="spinner-border text-primary">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

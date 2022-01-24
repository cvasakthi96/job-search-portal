import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { PAGE_URLS } from "../../constants/pagurl.constants";
import { createJobPostService } from "../../services/post/post.service";
import commonActions from "../../store/actions/common.action";
import "./JobPost.scss";
export default function JobPost({ toggleShowPost }) {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
  });
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const onInputChange = (e) => {
    if (hasError) setHasError(false);
    const { name, value } = e.target;
    setJobData((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  };

  const handleClick = () => {
    console.log(jobData);
    const { description, location, title } = jobData;
    if (!title || !description || !location) {
      setHasError(true);
    }
    if (title && description && location) {
      dispatch(commonActions.showLoaderOverlay());
      createJobPostService(jobData)
        .then((res) => {
          const { data, code, success } = res.data;
          console.log(data);
          dispatch(commonActions.hideLoaderOverlay());
          if (success && code) {
            toggleShowPost();
            alert("Post created successfully...");
          }
        })
        .catch((err) => {
          const { success, code } = err.response.data;
          if (!success && code) {
            dispatch(commonActions.hideLoaderOverlay());
            alert("Something went wrong..");
            history.push(PAGE_URLS.homePage.path);
          }
        });
    }
  };
  return (
    <>
      <div className="portal-job-post-wrapper ">
        <div className="portal-job-post">
          <div className="card py-2">
            <div className="job-post-text">Post a Job</div>
            <div className="form-group">
              <label htmlFor="title">Job title*</label>
              <input
                type="text"
                name="title"
                {...(hasError
                  ? { className: "form-control is-invalid" }
                  : { className: "form-control " })}
                id="title"
                value={jobData.title}
                onChange={onInputChange}
                placeholder="Enter Job title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description*</label>
              <textarea
                type="text"
                name="description"
                {...(hasError
                  ? { className: "form-control is-invalid" }
                  : { className: "form-control " })}
                id="description"
                value={jobData.description}
                onChange={onInputChange}
                rows={4}
                placeholder="Enter Job description*"
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location*</label>
              <input
                {...(hasError
                  ? { className: "form-control is-invalid" }
                  : { className: "form-control " })}
                type="text"
                id="location"
                name="location"
                value={jobData.location}
                onChange={onInputChange}
                placeholder="Enter Your location"
              />
              <div className="invalid-feedback text-right">
                {hasError && "All fields are mandatory."}
              </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-primary text-white"
                onClick={handleClick}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useCallback, useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { useHistory } from "react-router";

import Header from "../../shared/header/Header";
import JobPost from "../job-post/JobPost";
import "./Dashboard.scss";
import { PAGE_URLS } from "../../constants/pagurl.constants";
import { getPostedJobs } from "../../services/post/post.service";
export default function Dashboard() {
  const [JobsList, setJobsList] = useState([]);
  const [showPost, setShowPost] = useState(false);
  const history = useHistory();
  const toggleShowPost = () => {
    setShowPost((prev) => !prev);
  };
  const postedJobs = useCallback(() => {
    getPostedJobs()
      .then((res) => {
        const { data: jobs, success, code, message } = res.data;
        console.log(res.data);
        if (success && message) {
          alert(message);
        }
        setJobsList(jobs.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    postedJobs();
  }, [postedJobs]);

  return (
    <div className="dashboard-container">
      <Header show={false} showAction={true} />
      <div className="main-content">
        <Breadcrumb>
          <BreadcrumbItem>
            <span>
              <i className="fa fa-home" /> Home
            </span>
          </BreadcrumbItem>
          {showPost && (
            <BreadcrumbItem>
              <span>Post a Job</span>
            </BreadcrumbItem>
          )}
        </Breadcrumb>

        {showPost ? (
          <JobPost toggleShowPost={toggleShowPost} />
        ) : (
          <MainContent history={history} toggleShowPost={toggleShowPost} />
        )}
        <Switch>
          <Route path="/dashboard/job-post" component={JobPost} />
          <Route path="/">
            <Redirect to="/dashboard" exact />
          </Route>
        </Switch>
      </div>
    </div>
  );

  function MainContent({ history, toggleShowPost }) {
    return (
      <>
        <div className="posted-text">Jobs posted by you</div>
        <div className="jobs-list-wrapper">
          {JobsList.length === 0 ? (
            <div className="no-jobs">
              <i className="fa fa-edit" />
              <div className="no-jobs-text">
                Your posted jobs will show here!
              </div>
              <button
                className="btn btn-lg btn-primary text-white"
                onClick={toggleShowPost}
              >
                Post a Job
              </button>
            </div>
          ) : (
            JobsList.map((job, index) => {
              return <div key={index}> {job.description}</div>;
            })
          )}
        </div>
      </>
    );
  }
}

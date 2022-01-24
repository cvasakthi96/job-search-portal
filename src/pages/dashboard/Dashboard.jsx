import { useCallback, useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { useHistory } from "react-router";

import Header from "../../shared/header/Header";
import JobPost from "../job-post/JobPost";
import "./Dashboard.scss";
import { getPostedJobs } from "../../services/post/post.service";
import JobCard from "../../components/job-card/JobCard";
import Applicants from "../../components/applicants-view/Applicants";
export default function Dashboard() {
  const [JobsList, setJobsList] = useState([]);
  const [showPost, setShowPost] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState();
  const history = useHistory();
  const toggleShowPost = () => {
    setShowPost((prev) => !prev);
  };
  const postedJobs = useCallback(() => {
    getPostedJobs()
      .then((res) => {
        const { data: jobs, success, message } = res.data;
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

  const handleClick = (job) => {
    console.log({ job });
    setSelectedJob(job);
    toggleModal();
  };

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };
  return (
    <>
      {openModal && (
        <Applicants
          isOpen={openModal}
          selectedJob={selectedJob}
          onToggle={toggleModal}
        />
      )}
      <div className="dashboard-container">
        <Header
          show={false}
          showProfile={true}
          handlePostJob={toggleShowPost}
        />
        <div className="main-content">
          <Breadcrumb>
            <BreadcrumbItem>
              <span
                onClick={() => {
                  if (showPost) {
                    toggleShowPost();
                  }
                }}
                style={{ cursor: "pointer" }}
              >
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
    </>
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
            <>
              <div className="job-list-container mt-5">
                {JobsList.map((job, index) => {
                  return (
                    <JobCard key={job.id} job={job} handleClick={handleClick} />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

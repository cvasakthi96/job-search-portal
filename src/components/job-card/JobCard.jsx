import React from "react";
import "./JobsCard.scss";
export default function JobCard({ job, handleClick }) {
  return (
    <div className="card job-card">
      <div className="job-title">{job.title}</div>
      <div className="job-description ">{job.description}</div>
      <div className="job-location  d-flex justify-content-between p-2 mx-2 my-2 align-content-center align-items-center">
        <span className="d-inline-block">
          <i className="fa fa-map-marker" />
          <span className="location-text"> {job.location}</span>
        </span>
        <button
          className="btn btn-sm"
          onClick={() => {
            handleClick(job);
          }}
        >
          View Applications
        </button>
      </div>
    </div>
  );
}

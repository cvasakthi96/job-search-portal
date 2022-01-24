import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { getJobsCandidate } from "../../services/post/post.service";
import "./Applicants.scss";
export default function Applicants({ isOpen, onToggle, selectedJob }) {
  const [applicants, setApplicants] = useState([]);
  useEffect(() => {
    if (selectedJob) {
      getJobsCandidate({ id: selectedJob.id })
        .then((res) => {
          const { data, message } = res.data;
          console.log(message);
          setApplicants(data || []);
        })
        .catch((err) => {
          console.log(err);
          const { success } = err.response.data;
          if (!success) {
            alert("something went wrong");
            onToggle();
          }
        });
    }
  }, [selectedJob,onToggle]);
  return (
    <Modal isOpen={isOpen} className="applicants-modal" centered>
      <ModalHeader toggle={onToggle}>Applicants for this job</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label className="font-weight-bold">
            {`${applicants?.length > 0 ? "Total" : ""} ${
              applicants?.length
            } applications`}
          </label>
        </div>

        {applicants?.length !== 0 ? (
          <div className="content">
            <div className="applicants-list">
              {applicants.length > 0 &&
                applicants.map((item) => ApplicantItem(item))}
            </div>
          </div>
        ) : (
          <div className="content no-data d-flex justify-content-center align-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <i className="fa fa-edit" />
              <span className="my-2">No applications available!</span>
            </div>
          </div>
        )}
      </ModalBody>
    </Modal>
  );

  function ApplicantItem(data) {
    return (
      <div key={data.id} className="card content-item">
        <div className="header d-flex justify-content-start ">
          <div className="initial">{data.name[0]}</div>
          <div className="name-email px-3 mx-3">
            <div className="name text-left">{data.name}</div>
            <div className="email text-left" title={data.email}>
              {data.email}
            </div>
          </div>
        </div>
        <div className="skill px-3 mb-3">
          <div className="skill-text">Skills</div>
          <div className="skills">{data.skills}</div>
        </div>
      </div>
    );
  }
}

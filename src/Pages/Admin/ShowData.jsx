import React from "react";
import { useNavigate } from "react-router-dom";

function ShowData() {
  const navigate = useNavigate();

  const options = [
    {
      title: "Faculty Data",
      icon: "person-workspace",
      description: "View and manage faculty information",
      path: "/facultydata",
      color: "primary",
    },
    {
      title: "Student Data",
      icon: "mortarboard",
      description: "Access student records and information",
      path: "/studentdata",
      color: "success",
    },
  ];

  return (
    <div className="container-fluid min-vh-100 homepage-wrapper">
      <div className="card shadow-sm mb-4 mt-5">
        <div className="card-body text-center p-4">
          <i className="bi bi-database-fill fs-1 text-primary mb-2"></i>
          <h1 className="h3 mb-1">Data Management</h1>
          <p className="text-muted mb-0">Select a category to view data</p>
        </div>
      </div>

      <div className="row g-3">
        {options.map((option, index) => (
          <div className="col-12" key={index}>
            <div
              className={`card shadow-sm border-${option.color} h-100 hover-shadow`}
              onClick={() => navigate(option.path)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div
                    className={`rounded-circle bg-${option.color} bg-opacity-10 p-3 me-3`}
                  >
                    <i
                      className={`bi bi-${option.icon} fs-2 text-${option.color}`}
                    ></i>
                  </div>
                  <div className="flex-grow-1">
                    <h3 className="h5 mb-1">{option.title}</h3>
                    <p className="text-muted small mb-0">
                      {option.description}
                    </p>
                  </div>
                  <i className="bi bi-chevron-right text-muted"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          .hover-shadow {
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          }
          .hover-shadow:active {
            transform: scale(0.98);
          }
          @media (hover: hover) {
            .hover-shadow:hover {
              transform: translateY(-2px);
              box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
            }
          }
          .card {
            border-width: 2px;
          }
        `}
      </style>
    </div>
  );
}

export default ShowData;

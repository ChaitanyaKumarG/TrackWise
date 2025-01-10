import React from "react";
import { useNavigate } from "react-router-dom";

function FHomePage() {
  const navigate = useNavigate();

  const options = [
    {
      title: "Post Attendance",
      icon: "calendar-check",
      description: "Record and manage student attendance",
      path: "/postattendance",
      color: "info",
    },
    {
      title: "Post Marks",
      icon: "journal-check",
      description: "Enter and update student marks",
      path: "/postmarks",
      color: "warning",
    }
  ];

  const groupedOptions = {
    "Post Data": options.slice(0, 2),

  };

  return (
    <div className="container-fluid min-vh-100 homepage-wrapper">
      <div className="card shadow-sm mb-4 mt-5">
        <div className="card-body text-center p-4">
          <i className="bi bi-database-fill fs-1 text-primary mb-2"></i>
          <h1 className="h3 mb-1">Faculty Dashboard</h1>
        </div>
      </div>

      {Object.entries(groupedOptions).map(([groupTitle, groupOptions]) => (
        <div key={groupTitle} className="mb-4">
          <h2 className="h5 mb-3">{groupTitle}</h2>
          <div className="row g-3">
            {groupOptions.map((option, index) => (
              <div className="col-12 col-md-6" key={index}>
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
        </div>
      ))}

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

export default FHomePage;
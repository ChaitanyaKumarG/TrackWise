import React from "react";
import { useNavigate } from "react-router-dom";

const AHomePage = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Release Marks",
      icon: "mortarboard",
      path: "/releasemarks",
      color: "primary",
      description: "Publish student examination results",
    },
    {
      title: "Post News",
      icon: "newspaper",
      path: "/postnews",
      color: "success",
      description: "Share updates and announcements",
    },
    {
      title: "Create ID",
      icon: "person-plus",
      path: "/createdata",
      color: "info",
      description: "Register new user accounts",
    },
    {
      title: "Show Data",
      icon: "database",
      path: "/showdata",
      color: "warning",
      description: "View and manage database records",
    },
  ];

  return (
    <div className="homepage-wrapper min-vh-100 px-3 px-md-4 px-lg-5 py-lg-4 mt-lg-5">
      <div className="card shadow-sm mb-4">
        <div className="card-body text-center p-4">
          <i className="bi bi-shield-lock fs-1 text-primary mb-2"></i>
          <h1 className="h3 mb-0">Admin Dashboard</h1>
        </div>
      </div>

      <div className="row g-3 g-lg-4">
        {menuItems.map((item, index) => (
          <div className="col-12 col-md-6 col-lg-3" key={index}>
            <div
              className={`card shadow-sm border-${item.color} h-100 hover-shadow`}
              onClick={() => navigate(item.path)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div
                    className={`rounded-circle bg-${item.color} bg-opacity-10 p-3 me-3`}
                  >
                    <i
                      className={`bi bi-${item.icon} fs-2 text-${item.color}`}
                    ></i>
                  </div>
                  <div className="flex-grow-1">
                    <h3 className="h5 mb-1">{item.title}</h3>
                    <p className="text-muted small mb-0">{item.description}</p>
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
          @media (min-width: 992px) {
            .homepage-wrapper {
              margin: 0 auto;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AHomePage;

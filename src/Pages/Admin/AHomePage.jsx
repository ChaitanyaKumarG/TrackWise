import React from "react";
import { useNavigate } from "react-router-dom";


const AHomePage = () => {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      <div className="row g-4">
        <div className="col-12 col-sm-6">
          <a type="submit" href="/releasemarks"
            className="btn btn-outline-primary w-100 p-4 d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "150px" }}
          >
            <i className="bi bi-mortarboard fs-1 mb-2"></i>
            <span className="fs-5">Release Marks</span>
          </a>
        </div>

        <div className="col-12 col-sm-6">
          <a href="/postnews"
            className="btn btn-outline-primary w-100 p-4 d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "150px" }}
          >
            <i className="bi bi-newspaper fs-1 mb-2"></i>
            <span className="fs-5">Post News</span>
          </a>
        </div>

        <div className="col-12 col-sm-6">
          <a href="/createdata"
            className="btn btn-outline-primary w-100 p-4 d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "150px" }}
          >
            <i className="bi bi-person-plus fs-1 mb-2"></i>
            <span className="fs-5">Create ID</span>
          </a>
        </div>

        <div className="col-12 col-sm-6">
          <a href="/showdata"
            className="btn btn-outline-primary w-100 p-4 d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "150px" }}
          >
            <i className="bi bi-database fs-1 mb-2"></i>
            <span className="fs-5">Show Data</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AHomePage;

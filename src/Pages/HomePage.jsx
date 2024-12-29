import React from "react";

const Homepage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand" href="#">
            <img
              src="/api/placeholder/40/40"
              alt="School Logo"
              className="rounded"
              style={{ width: "40px", height: "40px" }}
            />
          </a>

          {/* Center Title - Visible on mobile */}
          <span className="navbar-brand mx-auto d-lg-none">SMS</span>

          {/* Center Title - Hidden on mobile */}
          <span className="navbar-brand mx-auto d-none d-lg-block">
            School Management System
          </span>

          {/* Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="nav-link btn btn-outline-secondary me-2">
                  <i className="bi bi-person-badge me-2"></i>Faculty Login
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-outline-secondary">
                  <i className="bi bi-person-circle me-2"></i>Admin Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-5">
        {/* Welcome Section */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-4">Welcome to Our School</h1>
          <p className="lead text-muted mb-5">
            Access our comprehensive school management system to stay connected
            with your child's education journey.
          </p>
          <button className="btn btn-primary btn-lg px-5 py-3">
            <i className="bi bi-person-check me-2"></i>Parent Login
          </button>
        </div>

        {/* Features Grid */}
        <div className="row g-4 mt-4">
          {/* Track Progress Card */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center p-4">
                <i className="bi bi-graph-up text-primary display-5 mb-3"></i>
                <h3 className="card-title h4">Track Progress</h3>
                <p className="card-text text-muted">
                  Monitor your child's academic performance and attendance in
                  real-time.
                </p>
              </div>
            </div>
          </div>

          {/* Communication Card */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center p-4">
                <i className="bi bi-chat-dots text-primary display-5 mb-3"></i>
                <h3 className="card-title h4">Communication</h3>
                <p className="card-text text-muted">
                  Stay connected with teachers and school administrators
                  effortlessly.
                </p>
              </div>
            </div>
          </div>

          {/* Updates Card */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center p-4">
                <i className="bi bi-bell text-primary display-5 mb-3"></i>
                <h3 className="card-title h4">Updates</h3>
                <p className="card-text text-muted">
                  Receive important announcements and updates about school
                  activities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

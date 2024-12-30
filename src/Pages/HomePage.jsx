import React, { useEffect, useState } from "react";

const Homepage = () => {
  // State for news data
  const [news, setNews] = useState([]);

  // Get the current hour to determine the greeting
  const currentHour = new Date().getHours();
  let greeting = "Good Morning";
  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else if (currentHour >= 18) {
    greeting = "Good Evening";
  }

  // Fetch news data from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://127.0.0.1:1321/news");
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };
    fetchNews();
  }, []);

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

          {/* Center Title */}
          <span className="navbar-brand mx-auto">TrackWise</span>

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
              {/* Dropdown for mobile */}
              <li className="nav-item dropdown d-lg-none">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Login Options
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="bi bi-person-badge me-2"></i> Faculty Login
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="bi bi-person-circle me-2"></i> Admin Login
                    </a>
                  </li>
                </ul>
              </li>
              {/* Normal Links for larger screens */}
              <li className="nav-item d-none d-lg-block">
                <button className="nav-link btn btn-outline-secondary me-2">
                  <i className="bi bi-person-badge me-2"></i> Faculty Login
                </button>
              </li>
              <li className="nav-item d-none d-lg-block">
                <button className="nav-link btn btn-outline-secondary">
                  <i className="bi bi-person-circle me-2"></i> Admin Login
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
          <h1 className="display-4 fw-bold mb-4 animated-greeting">
            {greeting}
          </h1>
        </div>

        {/* Features Grid - News Section */}
        <div className="row g-4 mt-4">
          {news.length > 0 ? (
            news.map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center p-4">
                    <h3 className="card-title h4">{item.title}</h3>
                    <p className="card-text text-muted">{item.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p className="text-muted">Loading news...</p>
            </div>
          )}
        </div>
      </div>

      {/* Parent Login Button */}
      <div
        className="position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: "1050" }}
      >
        <button className="btn btn-primary btn-lg">
          <i className="bi bi-person-check me-2"></i> Parent Login
        </button>
      </div>
    </div>
  );
};

export default Homepage;

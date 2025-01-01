import React, { useEffect, useState } from "react";
import newsService from "../Services/Admin/newsService";

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
        const response = await newsService.getNews()
        setNews(response);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div>

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
                    <h3 className="card-title h4">{item.Title}</h3>
                    <p className="card-text text-muted">{item.Description}</p>
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
        <a href="/parentlogin" className="btn btn-primary btn-lg">

          <i className="bi bi-person-check me-2"></i> Parent Login
        </a>
      </div>
    </div>
  );
};

export default Homepage;

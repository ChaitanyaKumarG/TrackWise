import React, { useEffect, useState } from "react";
import newsService from "../Services/Admin/newsService";

const Homepage = () => {
  const [news, setNews] = useState([]);
  const [displayText, setDisplayText] = useState("");
  const [loading, setLoading] = useState(true);

  const currentHour = new Date().getHours();
  let greeting = "Good Morning..";
  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon..";
  } else if (currentHour >= 18) {
    greeting = "Good Evening..";
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (displayText.length < greeting.length) {
        setDisplayText(greeting.substring(0, displayText.length + 1));
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [displayText, greeting]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsService.getNews();
        setNews([...response].reverse());
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="homepage-wrapper min-vh-100">
      <div className="container py-4 main-content">
        <div className="greeting-section mb-4">
          <h1 className="display-5 fw-bold greeting-text">
            {displayText}
            <span className="cursor"></span>
          </h1>
        </div>

        <div className="news-container">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : news.length > 0 ? (
            <div className="news-grid">
              {news.map((item, index) => (
                <div className="news-card" key={index}>
                  <div className="card h-100 border-0 shadow-sm hover-card">
                    <div className="card-body p-3 d-flex gap-3">
                      <div className="news-icon">
                        <div className="icon-circle">
                          <i className="bi bi-megaphone-fill"></i>
                        </div>
                      </div>
                      <div className="news-content">
                        <h5 className="card-title mb-2">{item.Title}</h5>
                        <p className="card-text text-muted mb-0">
                          {item.Description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-inbox-fill display-4 text-muted mb-3"></i>
              <p className="text-muted">No news available at the moment</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .homepage-wrapper {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding-top: 60px;
          padding-bottom: 70px;
        }

        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          margin-bottom: 70px;
        }

        .greeting-section {
          padding: 1rem 0;
        }

        .greeting-text {
          font-family: "Segoe UI", -apple-system, system-ui, sans-serif;
          color: #2c3e50;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
          animation: fadeIn 0.5s ease-out;
          font-size: 3rem;
        }

        .news-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        }

        .news-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .news-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }

        .cursor {
          display: inline-block;
          width: 4px;
          height: 1.2em;
          background-color: #2c3e50;
          margin-left: 6px;
          animation: blink 1s infinite;
          vertical-align: middle;
        }

        .icon-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          box-shadow: 0 6px 10px rgba(0, 123, 255, 0.2);
          transition: transform 0.3s ease;
        }

        .news-card:hover .icon-circle {
          transform: scale(1.05);
        }

        .card-body {
          padding: 1.5rem;
        }

        @media (max-width: 768px) {
          .greeting-text {
            font-size: 2rem;
          }

          .news-grid {
            grid-template-columns: 1fr;
          }

          .card-body {
            padding: 1rem;
          }

          .icon-circle {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Homepage;

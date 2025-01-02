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
      <div className="container py-4">
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

      <div
        className="position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: "1050" }}
      >
        <a
          href="/parentlogin"
          className="btn btn-primary btn-lg shadow-lg hover-button"
        >
          <i className="bi bi-person-check me-2"></i> Parent Login
        </a>
      </div>

      <style jsx>{`
        .homepage-wrapper {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .greeting-section {
          padding: 1rem 0;
        }

        .greeting-text {
          font-family: "Segoe UI", -apple-system, system-ui, sans-serif;
          color: #2c3e50;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
          animation: fadeIn 0.5s ease-out;
        }

        .cursor {
          display: inline-block;
          width: 3px;
          height: 1em;
          background-color: #2c3e50;
          margin-left: 4px;
          animation: blink 1s infinite;
          vertical-align: middle;
        }

        .news-grid {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }

        .news-card {
          animation: slideUp 0.3s ease-out forwards;
          opacity: 0;
        }

        .news-card:nth-child(n) {
          animation-delay: calc(n * 0.1s);
        }

        .hover-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border-radius: 12px;
        }

        .hover-card:active {
          transform: scale(0.98);
        }

        .icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.25rem;
          box-shadow: 0 4px 6px rgba(0, 123, 255, 0.1);
        }

        .hover-button {
          transition: transform 0.2s ease;
          border-radius: 12px;
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
          border: none;
        }

        .hover-button:active {
          transform: scale(0.95);
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

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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
      `}</style>
    </div>
  );
};

export default Homepage;

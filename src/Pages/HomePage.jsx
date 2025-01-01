import React, { useEffect, useState } from "react";
import newsService from "../Services/Admin/newsService";

const Homepage = () => {
  const [news, setNews] = useState([]);
  const [displayText, setDisplayText] = useState("");

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
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="bg-primary bg-opacity-25">
      <div className="container py-5">
        <div className="text-start mb-5">
          <h1 className="display-4 fw-bold mb-4 typing-animation greeting-text">
            {displayText}
            <span className="cursor"></span>
          </h1>
        </div>

        <div className="row g-4 mt-4">
          {news.length > 0 ? (
            news.map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="card border-0 shadow-sm rounded-3 h-100">
                  <div className="card-body d-flex align-items-center">
                    <div className="me-3">
                      <div
                        className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center"
                        style={{ width: "50px", height: "50px" }}
                      >
                        <i className="bi bi-check-circle text-primary fs-4"></i>
                      </div>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1 text-black">
                        {item.Title}
                      </h5>
                      <p className="text-muted mb-0">{item.Description}</p>
                    </div>
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

      <div
        className="position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: "1050" }}
      >
        <a href="/parentlogin" className="btn btn-primary btn-lg">
          <i className="bi bi-person-check me-2"></i> Parent Login
        </a>
      </div>

      <style jsx>{`
        .greeting-text {
          font-family: "Consolas", monospace;
        }

        .typing-animation {
          position: relative;
        }

        .cursor {
          display: inline-block;
          width: 3px;
          height: 1em;
          background-color: #000;
          margin-left: 2px;
          animation: blink 1s infinite;
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

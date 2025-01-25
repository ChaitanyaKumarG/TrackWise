import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="school-logo">TW</div>
          </div>

          <h1 className="school-name">TrackWise</h1>

          {!isMobile && (
            <div className="desktop-login-buttons">
              <Link to="/login" className="btn btn-primary">
                <i className="bi bi-person-badge me-1"></i>login
              </Link>
            </div>
          )}
        </div>
      </header>

      <style jsx>{`
        .app-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          height: 60px;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1rem;
          height: 100%;
          position: relative;
        }

        .logo-section {
          display: flex;
          align-items: center;
        }

        .school-logo {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 1.25rem;
        }

        .school-name {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
          color: #2c3e50;
        }

        .desktop-login-buttons {
          display: flex;
          align-items: center;
        }

        .desktop-login-buttons .btn {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default Header;

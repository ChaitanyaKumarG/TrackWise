import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="school-logo">TW</div>
            <h1 className="school-name">TrackWise</h1>
          </div>
          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              id="dropdown-basic"
              className="border-0 dropdown-toggle-custom"
            >
              <i className=""></i>
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" className="dropdown-menu-custom">
              <Dropdown.Item as={Link} to="/adminlogin" className="py-2">
                <i className="bi bi-person-gear me-2"></i>
                Admin Login
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/facultylogin" className="py-2">
                <i className="bi bi-person-workspace me-2"></i>
                Faculty Login
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
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
          transition: all 0.3s ease;
        }

        .school-name {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
          color: #2c3e50;
        }

        /* Override Bootstrap dropdown styles */
        :global(.dropdown-toggle-custom) {
          color: #2c3e50 !important;
          padding: 0.5rem !important;
        }

        :global(.dropdown-toggle-custom::after) {
          display: none !important;
        }

        :global(.dropdown-menu-custom) {
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
        }

        /* Mobile Dark Theme */
        @media (max-width: 768px) {
          .app-header {
            background: #1a1a1a;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          }

          .school-logo {
            background: linear-gradient(135deg, #8a2be2 0%, #4a148c 100%);
            box-shadow: 0 2px 4px rgba(138, 43, 226, 0.2);
          }

          .school-name {
            color: #ffffff;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }

          :global(.dropdown-toggle-custom) {
            color: #ffffff !important;
          }

          :global(.dropdown-menu-custom) {
            background: #1e1e1e;
            border: 1px solid #333;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
          }

          :global(.dropdown-item) {
            color: #ffffff !important;
          }

          :global(.dropdown-item:hover) {
            background-color: #2d2d2d !important;
            color: #8a2be2 !important;
          }

          :global(.dropdown-item i) {
            color: #8a2be2;
          }
        }

        /* Extra small devices */
        @media (max-width: 360px) {
          .school-name {
            font-size: 1.1rem;
          }

          .school-logo {
            width: 36px;
            height: 36px;
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  );
};

export default Header;

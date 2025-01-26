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
              variant="light"
              id="dropdown-basic"
              className="border-0"
            >
              {/* <i className="bi bi-three -dots-vertical"></i> */}
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" className="shadow-sm">
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
        }

        .school-name {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
          color: #2c3e50;
        }

        .menu-button {
          background: none;
          border: none;
          padding: 0.5rem;
          font-size: 1.25rem;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Header;

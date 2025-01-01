import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

const TaskBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => setShowDropdown(true);
  const handleMouseLeave = () => setShowDropdown(false);

  return (
    <Navbar bg="light" expand="lg" className="py-2 shadow-sm">
      <Container>
        {/* Desktop View */}
        <div className="d-none d-lg-flex justify-content-between align-items-center w-100">
          <Navbar.Brand href="/">
            <img
              src="/api/placeholder/142/30"
              width="142"
              height="30"
              alt="Logo"
              title="Logo"
              className="img-fluid"
            />
          </Navbar.Brand>

          <h1 className="mb-0 fs-4 text-primary">Track Wise</h1>

          <Nav className="align-items-center">
            <NavDropdown
              title="Login"
              id="login-dropdown"
              className="custom-dropdown"
              show={showDropdown}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <NavDropdown.Item
                href="/admin-login"
                className="custom-dropdown-item"
              >
                Admin Login
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="/faculty-login"
                className="custom-dropdown-item"
              >
                Faculty Login
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </div>

        {/* Mobile View */}
        <div className="d-flex d-lg-none justify-content-between align-items-center w-100">
          <Navbar.Brand href="/" className="mobile-brand">
            <img
              src="/api/placeholder/100/25"
              width="100"
              height="25"
              alt="Logo"
              title="Logo"
              className="img-fluid"
            />
          </Navbar.Brand>

          <h1 className="mb-0 mobile-title text-primary">TrackWise</h1>

          <NavDropdown
            title={<i className="bi bi-list fs-4"></i>}
            id="mobile-dropdown"
            align="end"
            className="mobile-menu"
          >
            <NavDropdown.Item href="/admin-login" className="py-2">
              Admin Login
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/faculty-login" className="py-2">
              Faculty Login
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </Container>

      <style jsx>{`
        .custom-dropdown .dropdown-menu,
        .mobile-menu .dropdown-menu {
          background: #ffffff;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          min-width: 200px;
        }
        .custom-dropdown-item:hover,
        .dropdown-item:hover {
          background-color: #0097b2;
          color: white;
        }
        @media (max-width: 991px) {
          .mobile-brand img {
            width: 80px;
            height: auto;
          }
          .mobile-title {
            font-size: 1rem;
            margin: 0 10px;
            white-space: nowrap;
          }
          .mobile-menu {
            margin-left: 10px;
          }
          .mobile-menu .dropdown-toggle::after {
            display: none;
          }
          .mobile-menu .dropdown-menu {
            right: 0;
            left: auto;
            margin-top: 10px;
          }
        }
        @media (max-width: 400px) {
          .mobile-title {
            font-size: 0.9rem;
          }
          .mobile-brand img {
            width: 60px;
          }
        }
      `}</style>
    </Navbar>
  );
};

export default TaskBar;

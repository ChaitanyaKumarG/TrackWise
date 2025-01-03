import React, { useState, useEffect } from "react";
import { Navbar, Container, Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const TaskBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      sticky="top"
      bg="white"
      className="transition-all duration-300 navbar-light"
      style={{
        padding: scrolled ? "0.5rem 0" : "0.75rem 0",
        boxShadow: scrolled ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
        top: 0,
        marginTop: 0,
      }}
    >
      <Container fluid className="px-3">
        <div className="d-flex align-items-center justify-content-between w-100">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img
              src="/logo.png"
              alt="TrackWise"
              style={{
                height: scrolled ? "35px" : "40px",
                width: "auto",
                transition: "height 0.3s ease",
              }}
            />
          </Link>

          <div className="d-flex align-items-center">
            <h1
              className="mb-0 fw-bold text-primary"
              style={{
                fontSize: scrolled ? "1.1rem" : "1.2rem",
                letterSpacing: "0.5px",
                transition: "font-size 0.3s ease",
              }}
            >
              TrackWise
            </h1>
          </div>

          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              className="border-0"
            >
              <span className="navbar-toggler-icon"></span>
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
      </Container>

      <style jsx>{`
        .dropdown-toggle::after {
          display: none;
        }

        .dropdown-menu {
          min-width: 200px;
          margin-top: 0.5rem;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .dropdown-item {
          color: #333;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .dropdown-item:hover {
          color: var(--bs-primary);
          background-color: rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </Navbar>
  );
};

export default TaskBar;

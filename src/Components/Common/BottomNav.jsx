import React from "react";
import { Link } from "react-router-dom";

const BottomNav = () => {
  return (
    <>
      <nav className="bottom-nav">
        <Link to="/" className="nav-item">
          <i className="bi bi-house-fill"></i>
          <span>Home</span>
        </Link>
        <Link to="/timetable" className="nav-item">
          <i className="bi bi-calendar-week"></i>
          <span>Time Table</span>
        </Link>
        <Link to="/quiz" className="nav-item">
          <i className="bi bi-award-fill"></i>
          <span>Quizzes</span>
        </Link>
        <Link to="/parentlogin" className="nav-item">
          <i className="bi bi-person-fill"></i>
          <span>Parent Login</span>
        </Link>
      </nav>

      <style jsx>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          display: flex;
          justify-content: space-around;
          padding: 0.5rem 0;
          box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }

        @media (min-width: 768px) {
          .bottom-nav {
            display: none;
          }
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #6c757d;
          text-decoration: none;
          font-size: 0.875rem;
          padding: 0.5rem;
        }

        .nav-item i {
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
        }

        .nav-item.active {
          color: #007bff;
        }

        .nav-item span {
          font-size: 0.75rem;
        }
      `}</style>
    </>
  );
};

export default BottomNav;

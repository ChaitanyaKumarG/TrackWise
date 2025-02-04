import React from "react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  return (
    <>
      <nav className="bottom-nav">
        <Link
          to="/"
          className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
        >
          <i className="bi bi-house-fill"></i>
          <span>Home</span>
        </Link>
        <Link
          to="/timetable"
          className={`nav-item ${
            location.pathname === "/timetable" ? "active" : ""
          }`}
        >
          <i className="bi bi-calendar-week"></i>
          <span>Time Table</span>
        </Link>
        <Link
          to="/quiz"
          className={`nav-item ${
            location.pathname === "/quiz" ? "active" : ""
          }`}
        >
          <i className="bi bi-award-fill"></i>
          <span>Quizzes</span>
        </Link>
        <Link
          to="/parentlogin"
          className={`nav-item ${
            location.pathname === "/parentlogin" ? "active" : ""
          }`}
        >
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

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #6c757d;
          text-decoration: none;
          font-size: 0.875rem;
          padding: 0.5rem;
          transition: color 0.2s ease;
        }

        .nav-item i {
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
        }

        .nav-item span {
          font-size: 0.75rem;
        }

        .nav-item.active {
          color: #007bff;
        }

        /* Mobile Dark Theme */
        @media (max-width: 768px) {
          .bottom-nav {
            background: #1a1a1a;
            padding: 0.75rem 0;
            box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
            border-top: 1px solid #333;
          }

          .nav-item {
            color: #808080;
            min-width: 64px;
            position: relative;
          }

          .nav-item i {
            font-size: 1.35rem;
            margin-bottom: 0.35rem;
            transition: transform 0.2s ease;
          }

          .nav-item span {
            font-weight: 500;
          }

          .nav-item.active {
            color: #8a2be2;
          }

          .nav-item.active i {
            transform: translateY(-2px);
          }

          .nav-item:active {
            transform: scale(0.95);
          }

          /* Active item indicator for mobile */
          .nav-item.active::after {
            content: "";
            position: absolute;
            bottom: -0.75rem;
            left: 50%;
            transform: translateX(-50%);
            width: 4px;
            height: 4px;
            background-color: #8a2be2;
            border-radius: 50%;
          }
        }

        /* Extra small mobile devices */
        @media (max-width: 360px) {
          .nav-item {
            min-width: 56px;
            padding: 0.4rem;
          }

          .nav-item i {
            font-size: 1.25rem;
          }

          .nav-item span {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </>
  );
};

export default BottomNav;

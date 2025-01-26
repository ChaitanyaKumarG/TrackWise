import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import desktopBackground from "../Assets/Images/2.jpg";
import mobileBackground from "../Assets/Images/2.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const updateBackgroundImage = () => {
      const width = window.innerWidth;
      setBackgroundImage(width <= 768 ? mobileBackground : desktopBackground);
    };

    updateBackgroundImage();
    window.addEventListener("resize", updateBackgroundImage);
    return () => window.removeEventListener("resize", updateBackgroundImage);
  }, []);

  

  return (
    <div
      className="login-container bg-light min-vh-100 homepage-wrapper"
      //   style={{
      //     backgroundImage: `url(${backgroundImage})`,
      //     backgroundSize: "cover",
      //     backgroundPosition: "center",
      //   }}
    >
      <style>{`
        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          position: fixed;
          top: 0;
          left: 0;
          margin: 0;
          padding: 0;
        }

        .login-card {
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 15px;
          padding: 30px;
          width: 90%;
          max-width: 500px;
        }

        .login-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          padding: 15px;
          margin-bottom: px;
        }

        @media (max-width: 576px) {
          .login-card {
            width: 85%;
            padding: 15px;
          }

          .login-btn {
            font-size: 0.9rem;
            padding: 13px;
          }
        }
      `}</style>

      <div className="login-card text-center shadow-sm ">
        <i
          className="bi bi-lock-fill text-primary m-0"
          style={{ fontSize: "2rem" }}
        ></i>
        <h2 className="mb-3">Login</h2>
        <div className="row g-3">
          <div className="col-12 col-sm-6">
            <button
              className="btn btn-primary w-100 login-btn"
              onClick={() => navigate("/adminlogin")}
            >
              <i className="bi bi-shield-lock me-2"></i>
              Admin Login
            </button>
          </div>
          <div className="col-12 col-sm-6">
            <button
              className="btn btn-primary w-100 login-btn"
              onClick={() => navigate("/facultylogin")}
            >
              <i className="bi bi-person-badge me-2"></i>
              Faculty Login
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <small className="text-muted">
            Need help? Contact administrator
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;

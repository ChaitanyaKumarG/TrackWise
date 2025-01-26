import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllFaculty } from "../../Services/Faculty/facultyService";

const FLoginPage = () => {
  const [penNo, setPenNo] = useState("");
  const [parentNo, setParentNo] = useState("");
  const [faculty, setFaculty] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const data = await fetchAllFaculty();
        setFaculty(data);
        console.log(data);
      } catch (err) {
        setError("Failed to fetch faculty details");
      }
    };
    fetchFaculty();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const matchedfaculty = faculty.find(
      (faculty) => faculty.FacultyKey === penNo && faculty.Password === parentNo
    );

    setTimeout(() => {
      setIsLoading(false);
      if (matchedfaculty) {
        console.log(faculty);
        navigate(`/facultyhomepage`);
      } else {
        setError("Invalid Faculty Key or Password.");
      }
    }, 800);
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-light min-vh-100 homepage-wrapper">
      <div className="container px-4 px-md-0">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                {/* Logo/Icon Section */}
                <div className="text-center mb-4">
                  <i
                    className="bi bi-person-workspace text-primary"
                    style={{ fontSize: "3.5rem" }}
                  ></i>
                  <h4 className="mt-3 mb-4 fw-bold">Faculty Portal</h4>
                </div>

                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-key-fill"></i>
                      </span>
                      <input
                        type="text"
                        id="penNo"
                        className="form-control border-start-0 ps-0"
                        placeholder="Enter Faculty Key"
                        value={penNo}
                        onChange={(e) => setPenNo(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-lock-fill"></i>
                      </span>
                      <input
                        type="password"
                        id="parentNo"
                        className="form-control border-start-0 ps-0"
                        placeholder="Enter Password"
                        value={parentNo}
                        onChange={(e) => setParentNo(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>

                  {error && (
                    <div
                      className="alert alert-danger d-flex align-items-center"
                      role="alert"
                    >
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      <div>{error}</div>
                    </div>
                  )}
                </form>

                <div className="text-center mt-4">
                  <small className="text-muted">
                    Forgot password? Contact your administrator
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FLoginPage;

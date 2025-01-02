import React, { useEffect, useState } from "react";
import { fetchAllFaculty } from "../../Services/Faculty/facultyService";

function FacultyData() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const response = await fetchAllFaculty();
        setFaculty(response);
      } catch (err) {
        setError("Failed to fetch faculty data.");
      } finally {
        setLoading(false);
      }
    };
    fetchFacultyData();
  }, []);

  const filteredFaculty = faculty.filter(
    (fac) =>
      fac.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fac.Email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading faculty data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <div>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 px-3">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0">
          <i className="bi bi-people-fill me-2"></i>
          Faculty Directory
        </h2>
        <span className="badge bg-primary rounded-pill">
          Total: {faculty.length}
        </span>
      </div>

      {/* Search Box */}
      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text bg-light border-end-0">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control border-start-0 ps-0"
            placeholder="Search faculty by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Faculty Cards */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {filteredFaculty.map((fac) => (
          <div key={fac.FacultyID} className="col">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                    <i className="bi bi-person-workspace text-primary"></i>
                  </div>
                  <div>
                    <h5 className="card-title mb-1">{fac.Name}</h5>
                    <small className="text-muted">ID: {fac.FacultyID}</small>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-envelope me-2 text-muted"></i>
                  <a
                    href={`mailto:${fac.Email}`}
                    className="text-decoration-none"
                  >
                    {fac.Email}
                  </a>
                </div>
                {fac.Department && (
                  <div className="d-flex align-items-center">
                    <i className="bi bi-building me-2 text-muted"></i>
                    <span>{fac.Department}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredFaculty.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-search display-1 text-muted"></i>
          <p className="mt-3 text-muted">
            No faculty members found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}

export default FacultyData;

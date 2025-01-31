import React, { useEffect, useState } from "react";
import {
  fetchAllFaculty,
  deleteFaculty,
  updateFaculty,
} from "../../Services/Faculty/facultyService";

function FacultyData() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [updatedFaculty, setUpdatedFaculty] = useState({
    Name: "",
    Email: "",
    FacultyKey: "",
    Password: "",
  });

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this faculty?")) {
      try {
        await deleteFaculty(id);
        setFaculty(faculty.filter((fac) => fac.FacultyID !== id));
      } catch (err) {
        alert("Failed to delete faculty.");
      }
    }
  };

  const handleEdit = (fac) => {
    setEditingFaculty(fac.FacultyID);
    setUpdatedFaculty({
      Name: fac.Name,
      Email: fac.Email,
      FacultyKey: fac.FacultyKey,
      Password: fac.Password,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateFaculty(editingFaculty, updatedFaculty);
      setFaculty(
        faculty.map((fac) =>
          fac.FacultyID === editingFaculty ? { ...fac, ...updatedFaculty } : fac
        )
      );
      setEditingFaculty(null);
    } catch (err) {
      alert("Failed to update faculty.");
    }
  };

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
    <div className="container-fluid min-vh-100 homepage-wrapper">
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <h2 className="h4 mb-0">
          <i className="bi bi-people-fill me-2"></i>
          Faculty Directory
        </h2>
        <span className="badge bg-primary rounded-pill">
          Total: {faculty.length}
        </span>
      </div>

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

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 border">
        {filteredFaculty.map((fac) => (
          <div key={fac.FacultyID} className="col">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                {editingFaculty === fac.FacultyID ? (
                  <>
                    <input
                      type="text"
                      value={updatedFaculty.Name}
                      onChange={(e) =>
                        setUpdatedFaculty({
                          ...updatedFaculty,
                          Name: e.target.value,
                        })
                      }
                      className="form-control mb-2"
                    />
                    <input
                      type="email"
                      value={updatedFaculty.Email}
                      onChange={(e) =>
                        setUpdatedFaculty({
                          ...updatedFaculty,
                          Email: e.target.value,
                        })
                      }
                      className="form-control mb-2"
                    />
                    <button
                      className="btn btn-success me-2"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setEditingFaculty(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h5 className="card-title mb-1">{fac.Name}</h5>
                    <small className="text-muted">ID: {fac.FacultyKey}</small>
                    <small className="text-muted ms-3">
                      Password: {fac.Password}
                    </small>
                    <p>{fac.Email}</p>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleEdit(fac)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(fac.FacultyID)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacultyData;

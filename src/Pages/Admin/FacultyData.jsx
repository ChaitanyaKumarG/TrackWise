import React, { useEffect, useState } from "react";
import axios from "axios";

function FacultyData() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:1321/faculty");
        setFaculty(response.data);
      } catch (err) {
        setError("Failed to fetch faculty data.");
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  if (loading) {
    return <p>Loading faculty data...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Faculty List</h2>
      <ul className="list-group">
        {faculty.map((fac) => (
          <li key={fac.FacultyID} className="list-group-item">
            {fac.Name} - {fac.Email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FacultyData;

import React, { useState } from "react";
import axios from "axios";

function PostNews() {
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:1321/news", formData);
      setSuccess("News posted successfully!");
      setError("");
      setFormData({
        Title: "",
        Description: "",
      });
    } catch (err) {
      console.error("Error posting news:", err);
      setError("Failed to post news. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Post News</h2>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Title" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="Title"
            id="Title"
            value={formData.Title}
            className="form-control"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Description" className="form-label">
            Description
          </label>
          <textarea
            name="Description"
            id="Description"
            value={formData.Description}
            className="form-control"
            rows="4"
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Post News
        </button>
      </form>
    </div>
  );
}

export default PostNews;

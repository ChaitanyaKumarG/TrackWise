import React, { useState } from "react";
import newsService from "../../Services/Admin/newsService";

function PostNews() {
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await newsService.postNews(formData);
      setSuccess("News posted successfully!");
      setError("");
      setFormData({
        Title: "",
        Description: "",
      });
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error posting news:", err);
      setError("Failed to post news. Please try again.");
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid px-3 py-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            <i className="bi bi-newspaper me-2"></i>
            Post News
          </h5>
        </div>
        <div className="card-body">
          {success && (
            <div
              className="alert alert-success d-flex align-items-center"
              role="alert"
            >
              <i className="bi bi-check-circle-fill me-2"></i>
              {success}
            </div>
          )}
          {error && (
            <div
              className="alert alert-danger d-flex align-items-center"
              role="alert"
            >
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">
                <i className="bi bi-type-h1 me-2"></i>Title
              </label>
              <input
                type="text"
                name="Title"
                id="Title"
                value={formData.Title}
                className="form-control form-control-lg"
                onChange={handleInputChange}
                placeholder="Enter news title"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="Description" className="form-label">
                <i className="bi bi-text-paragraph me-2"></i>Description
              </label>
              <textarea
                name="Description"
                id="Description"
                value={formData.Description}
                className="form-control"
                rows="6"
                onChange={handleInputChange}
                placeholder="Enter news description"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 btn-lg d-flex align-items-center justify-content-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Posting...
                </>
              ) : (
                <>
                  <i className="bi bi-send-fill me-2"></i>
                  Post News
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostNews;

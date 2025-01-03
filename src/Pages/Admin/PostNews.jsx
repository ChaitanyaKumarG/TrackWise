import React, { useState } from "react";
import newsService from "../../Services/Admin/newsService";

const SuccessModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body text-center p-5">
            <div className="mb-4">
              <i
                className="bi bi-check-circle-fill text-success"
                style={{ fontSize: "4rem" }}
              ></i>
            </div>
            <h4 className="mb-3">News Posted Successfully!</h4>
            <button className="btn btn-primary btn-lg w-100" onClick={onClose}>
              <i className="bi bi-arrow-right-circle me-2"></i>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function PostNews() {
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
  });
  const [showModal, setShowModal] = useState(false);
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
      setShowModal(true);
      setError("");
      setFormData({
        Title: "",
        Description: "",
      });
    } catch (err) {
      console.error("Error posting news:", err);
      setError("Failed to post news. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    window.location.reload();
  };

  return (
    <div className="container-fluid min-vh-100 homepage-wrapper">
      <div className="card mt-5 shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            <i className="bi bi-newspaper me-2"></i>
            Post News
          </h5>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger d-flex align-items-center">
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
      <SuccessModal show={showModal} onClose={handleModalClose} />
    </div>
  );
}

export default PostNews;

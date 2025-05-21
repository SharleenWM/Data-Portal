import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateDepartment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Department name is required";
    if (!formData.slug) newErrors.slug = "Slug is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    try {
      const res = await fetch(`${API_URL}/departments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create department");
      }

      navigate("/departments");
    } catch (err) {
      console.error("Create error:", err);
      setServerError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="create-department-container">
      <div className="create-department-card">
        <h2>Create Department</h2>
        {serverError && <p className="error">{serverError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Department Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="e.g. cybersecurity"
            />
            {errors.slug && <p className="error">{errors.slug}</p>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/departments")}
            >
              Cancel
            </button>
            <button type="submit" className="save-button">
              Create Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDepartment;

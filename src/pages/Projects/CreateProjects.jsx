import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    department: null,
    status: "Pending",
    progress: 0,
    milestones: [],
    personnel: "",
    budget: "",
    time: "",
    risks: [],
    timelineStart: "",
    timelineEnd: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("resources.")) {
      const resourceField = name.split(".")[1];
      setFormData({
        ...formData,
        [resourceField]: value,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post("http://localhost:8080/api/projects", {
          ...formData,
          department: { id: formData.department },
          milestones: [
            "Data Mapping",
            "API Integration",
            "Testing",
            "Deployment",
          ], // Example
          risks: ["Data Compatibility Issues", "Timeline Delay"], // Example
        });
        navigate("/dashboard");
      } catch (error) {
        console.error("Error creating project:", error);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Project name is required";
    if (!formData.author) newErrors.author = "Author is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.personnel) newErrors.personnel = "Personnel is required";
    if (!formData.budget) newErrors.budget = "Budget is required";
    if (!formData.time) newErrors.time = "Time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
            {errors.author && <p className="error">{errors.author}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="1">Finance</option>
              <option value="2">Compliance</option>
              <option value="3">IT</option>
            </select>
            {errors.department && <p className="error">{errors.department}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="timelineStart">Start Date</label>
            <input
              type="date"
              id="timelineStart"
              name="timelineStart"
              value={formData.timelineStart}
              onChange={handleChange}
              required
            />
            {errors.startDate && <p className="error">{errors.startDate}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="timelineEnd">End Date</label>
            <input
              type="date"
              id="timelineEnd"
              name="timelineEnd"
              value={formData.timelineEnd}
              onChange={handleChange}
              required
            />
            {errors.endDate && <p className="error">{errors.endDate}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="personnel">Personnel</label>
            <input
              type="text"
              id="personnel"
              name="personnel"
              value={formData.personnel}
              onChange={handleChange}
              required
            />
            {errors.personnel && <p className="error">{errors.personnel}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="budget">Budget</label>
            <input
              type="text"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
            />
            {errors.budget && <p className="error">{errors.budget}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="time">Time Estimate</label>
            <input
              type="text"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
            {errors.time && <p className="error">{errors.time}</p>}
          </div>
          <button type="submit">Create</button>
        </form>
        <p className="toggle-link">
          <button type="button" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </p>
      </div>
    </div>
  );
};

export default CreateProject;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateDepartment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    manager: "",
    description: "",
    riskLevel: "Medium", // Default risk level
    totalProjects: 0,
    projects: [], // Will be implemented if needed
  });

  const [errors, setErrors] = useState({});
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectData, setProjectData] = useState({
    name: "",
    services: "",
    status: "Pending",
    kpi: "",
    resourceUtilization: "",
    assignedProjects: "0",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProjectChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const addProject = () => {
    if (validateProjectForm()) {
      // Convert services string to array
      const projectWithServicesArray = {
        ...projectData,
        services: projectData.services
          .split(",")
          .map((service) => service.trim()),
      };

      setFormData({
        ...formData,
        projects: [...formData.projects, projectWithServicesArray],
        totalProjects: formData.totalProjects + 1,
      });

      // Reset project form
      setProjectData({
        name: "",
        services: "",
        status: "Pending",
        kpi: "",
        resourceUtilization: "",
        assignedProjects: "0",
      });

      setShowProjectForm(false);
    }
  };

  const removeProject = (index) => {
    const updatedProjects = [...formData.projects];
    updatedProjects.splice(index, 1);

    setFormData({
      ...formData,
      projects: updatedProjects,
      totalProjects: formData.totalProjects - 1,
    });
  };

  const validateProjectForm = () => {
    const projectErrors = {};
    if (!projectData.name)
      projectErrors.projectName = "Project name is required";
    if (!projectData.services) projectErrors.services = "Services are required";

    if (Object.keys(projectErrors).length > 0) {
      setErrors({ ...errors, ...projectErrors });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("New Department:", formData);
      // Simulate saving to backend and redirect
      navigate("/departments");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Department name is required";
    if (!formData.manager) newErrors.manager = "Manager name is required";
    if (!formData.description)
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper function to get risk level color class
  const getRiskLevelClass = (riskLevel) => {
    switch (riskLevel.toLowerCase()) {
      case "high":
        return "risk-high";
      case "medium":
        return "risk-medium";
      case "low":
        return "risk-low";
      default:
        return "risk-unknown";
    }
  };

  return (
    <div className="create-department-container">
      <div className="create-department-card">
        <h2>Create Department</h2>

        <form onSubmit={handleSubmit}>
          <div className="department-form-section">
            <h3>Department Details</h3>

            <div className="form-group">
              <label htmlFor="name">Department Name</label>
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
              <label htmlFor="manager">Department Manager</label>
              <input
                type="text"
                id="manager"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                required
              />
              {errors.manager && <p className="error">{errors.manager}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
              />
              {errors.description && (
                <p className="error">{errors.description}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="riskLevel">Risk Level</label>
              <select
                id="riskLevel"
                name="riskLevel"
                value={formData.riskLevel}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <div className="risk-preview">
                <span
                  className={`risk-badge ${getRiskLevelClass(
                    formData.riskLevel
                  )}`}
                >
                  {formData.riskLevel}
                </span>
              </div>
            </div>
          </div>

          <div className="department-form-section">
            <div className="projects-header">
              <h3>Projects ({formData.totalProjects})</h3>
              <button
                type="button"
                className="add-project-button"
                onClick={() => setShowProjectForm(true)}
              >
                Add Project
              </button>
            </div>

            {/* Project List */}
            <div className="projects-list">
              {formData.projects.map((project, index) => (
                <div key={index} className="project-item-preview">
                  <div className="project-preview-header">
                    <h4>{project.name}</h4>
                    <span
                      className={`status-badge ${project.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {project.status}
                    </span>
                    <button
                      type="button"
                      className="remove-project-button"
                      onClick={() => removeProject(index)}
                    >
                      ✕
                    </button>
                  </div>
                  <p>
                    <strong>Services:</strong> {project.services.join(", ")}
                  </p>
                  <p>
                    <strong>KPI:</strong> {project.kpi}
                  </p>
                  <p>
                    <strong>Resource Utilization:</strong>{" "}
                    {project.resourceUtilization}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Project Form Modal */}
          {showProjectForm && (
            <div className="project-form-modal">
              <div className="project-form-content">
                <div className="project-form-header">
                  <h3>Add New Project</h3>
                  <button
                    type="button"
                    className="close-button"
                    onClick={() => setShowProjectForm(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="form-group">
                  <label htmlFor="projectName">Project Name</label>
                  <input
                    type="text"
                    id="projectName"
                    name="name"
                    value={projectData.name}
                    onChange={handleProjectChange}
                  />
                  {errors.projectName && (
                    <p className="error">{errors.projectName}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="services">Services (comma separated)</label>
                  <input
                    type="text"
                    id="services"
                    name="services"
                    value={projectData.services}
                    onChange={handleProjectChange}
                    placeholder="e.g. UI Design, Backend Development"
                  />
                  {errors.services && (
                    <p className="error">{errors.services}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={projectData.status}
                    onChange={handleProjectChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="kpi">KPI</label>
                  <input
                    type="text"
                    id="kpi"
                    name="kpi"
                    value={projectData.kpi}
                    onChange={handleProjectChange}
                    placeholder="e.g. 95% customer satisfaction"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="resourceUtilization">
                    Resource Utilization
                  </label>
                  <input
                    type="text"
                    id="resourceUtilization"
                    name="resourceUtilization"
                    value={projectData.resourceUtilization}
                    onChange={handleProjectChange}
                    placeholder="e.g. 75%"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="assignedProjects">Assigned Projects</label>
                  <input
                    type="text"
                    id="assignedProjects"
                    name="assignedProjects"
                    value={projectData.assignedProjects}
                    onChange={handleProjectChange}
                  />
                </div>

                <div className="project-form-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowProjectForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="add-button"
                    onClick={addProject}
                  >
                    Add Project
                  </button>
                </div>
              </div>
            </div>
          )}

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

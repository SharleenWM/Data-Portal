import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectDashboard = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Website Redesign",
      author: "Alex Johnson",
      department: { id: 1, name: "Engineering" },
      status: "In Progress",
      progress: 65,
      timelineStart: "2025-01-15",
      timelineEnd: "2025-07-30",
      milestones: [
        "Requirements Gathering",
        "Design Phase",
        "Development",
        "Testing",
        "Deployment",
      ],
      personnel: "5 developers, 2 designers",
      budget: "ksh120,000",
      time: "6 months",
      risks: [
        "Technical debt accumulation",
        "Resource allocation conflicts",
        "Scope creep",
      ],
    },
    {
      id: 2,
      name: "Mobile App Development",
      author: "Sarah Miller",
      department: { id: 1, name: "Engineering" },
      status: "On Hold",
      progress: 30,
      timelineStart: "2025-02-10",
      timelineEnd: "2025-10-15",
      milestones: [
        "Market Research",
        "UX/UI Design",
        "Backend Development",
        "Frontend Development",
        "Beta Testing",
        "Release",
      ],
      personnel: "3 developers, 1 designer, 1 QA specialist",
      budget: "Ksh95,000",
      time: "8 months",
      risks: [
        "Platform compatibility issues",
        "User adoption barriers",
        "Integration challenges with existing systems",
      ],
    },
    {
      id: 3,
      name: "Annual Marketing Campaign",
      author: "Michael Chen",
      department: { id: 2, name: "Marketing" },
      status: "Completed",
      progress: 100,
      timelineStart: "2024-11-01",
      timelineEnd: "2025-04-15",
      milestones: [
        "Market Analysis",
        "Strategy Development",
        "Content Creation",
        "Campaign Launch",
        "Performance Review",
      ],
      personnel: "2 marketing specialists, 1 graphic designer",
      budget: "Ksh75,000",
      time: "5 months",
      risks: [
        "Market reception uncertainty",
        "Competitor response",
        "Budget constraints",
      ],
    },
    {
      id: 4,
      name: "Financial Reporting System",
      author: "Emily Rodriguez",
      department: { id: 3, name: "Finance" },
      status: "Pending",
      progress: 10,
      timelineStart: "2025-05-01",
      timelineEnd: "2025-11-30",
      milestones: [
        "Requirements Analysis",
        "System Design",
        "Development Phase",
        "Data Migration",
        "User Training",
        "System Launch",
      ],
      personnel: "2 developers, 1 financial analyst, 1 project manager",
      budget: "Ksh130,000",
      time: "7 months",
      risks: [
        "Data security concerns",
        "Regulatory compliance issues",
        "Integration with legacy systems",
        "User adoption challenges",
      ],
    },
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const handleCreateProject = () => {
    navigate("/create-project");
  };

  const addNewProject = (newProject) => {
    setProjects([...projects, { ...newProject, id: projects.length + 1 }]);
  };

  const ProgressBar = ({ progress }) => (
    <div className="progress-bar-container">
      <div
        className="progress-bar-fill"
        style={{ width: `${progress}%` }}
      ></div>
      <span className="progress-text">{progress}%</span>
    </div>
  );

  const getRiskLevelClass = (level) => {
    switch (level.toLowerCase()) {
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
    <div className="projects-dashboard">
      <div className="projects-header">
        <h2>Projects</h2>
        <button className="create-project-button" onClick={handleCreateProject}>
          Create Project
        </button>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h3>{project.name}</h3>
              <span
                className={`status-badge ${
                  project.status?.toLowerCase().replace(" ", "-") || "pending"
                }`}
              >
                {project.status || "Pending"}
              </span>
            </div>

            <div className="project-info">
              <div className="info-row">
                <span className="info-label">Author:</span>
                <span className="info-value">{project.author}</span>
              </div>

              <div className="info-row">
                <span className="info-label">Department:</span>
                <span className="info-value">
                  {project.department?.name || "N/A"}
                </span>
              </div>

              <div className="info-row">
                <span className="info-label">Progress:</span>
                <div className="info-value progress-container">
                  <ProgressBar progress={project.progress} />
                </div>
              </div>

              <div className="info-row">
                <span className="info-label">Timeline:</span>
                <span className="info-value">
                  {formatDate(project.timelineStart)} -{" "}
                  {formatDate(project.timelineEnd)}
                </span>
              </div>
            </div>

            <div className="project-milestones">
              <h4>Milestones</h4>
              <ul className="milestone-list">
                {project.milestones.map((milestone, index) => {
                  const total = project.milestones.length;
                  const isCompleted = index < (project.progress / 100) * total;
                  const milestoneDate = new Date(
                    new Date(project.timelineStart).getTime() +
                      ((index + 1) *
                        (new Date(project.timelineEnd).getTime() -
                          new Date(project.timelineStart).getTime())) /
                        (total + 1)
                  );
                  return (
                    <li
                      key={index}
                      className={`milestone-item ${
                        isCompleted ? "completed" : "pending"
                      }`}
                    >
                      <div className="milestone-content">
                        <span className="milestone-name">{milestone}</span>
                        <span className="milestone-date">
                          {formatDate(milestoneDate.toISOString())}
                        </span>
                        <span
                          className={`milestone-status ${
                            isCompleted ? "completed" : "pending"
                          }`}
                        >
                          {isCompleted ? "Completed" : "Pending"}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="project-details-grid">
              <div className="resource-allocation">
                <h4>Resource Allocation</h4>
                <div className="resource-item">
                  <span className="resource-label">Personnel:</span>
                  <span className="resource-value">{project.personnel}</span>
                </div>
                <div className="resource-item">
                  <span className="resource-label">Budget:</span>
                  <span className="resource-value">{project.budget}</span>
                </div>
                <div className="resource-item">
                  <span className="resource-label">Time:</span>
                  <span className="resource-value">{project.time}</span>
                </div>
              </div>

              <div className="risk-indicators">
                <h4>Risk Indicators</h4>
                <ul className="risk-list">
                  {project.risks.map((risk, index) => (
                    <li key={index} className="risk-item">
                      <div className="risk-content">
                        <span className="risk-text">{risk}</span>
                        <span
                          className={`risk-badge ${getRiskLevelClass(
                            index % 3 === 0
                              ? "high"
                              : index % 3 === 1
                              ? "medium"
                              : "low"
                          )}`}
                        >
                          {index % 3 === 0
                            ? "High"
                            : index % 3 === 1
                            ? "Medium"
                            : "Low"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDashboard;

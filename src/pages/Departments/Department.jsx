import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Department = () => {
  const navigate = useNavigate();

  // Hard-coded departments data with additional requested fields
  const [departments] = useState([
    {
      id: 1,
      name: "Risk Management",
      manager: "Emily Carter",
      description:
        "Oversees risk assessment and mitigation strategies for financial operations",
      totalProjects: 3,
      riskLevel: "High",
      projects: [
        {
          name: "Fraud Detection System",
          process: ["Data Analysis", "Machine Learning", "Monitoring"],
          status: "In Progress",
          kpi: "95% detection accuracy",
          resourceUtilization: "80%",
          assignedProjects: "2",
        },
        {
          name: "Regulatory Risk Audit",
          process: ["Compliance Review", "Reporting"],
          status: "Pending",
          kpi: "100% audit compliance",
          resourceUtilization: "65%",
          assignedProjects: "1",
        },
      ],
    },
    {
      id: 2,
      name: "Marketing",
      manager: "Sarah Johnson",
      description: "Handles brand promotion and market research",
      totalProjects: 5,
      riskLevel: "Low",
      projects: [
        {
          name: "Q3 Social Media Campaign",
          process: ["Content Creation", "Analytics", "Advertising"],
          status: "Completed",
          kpi: "15% engagement increase",
          resourceUtilization: "90%",
          assignedProjects: "1",
        },
        {
          name: "Customer Satisfaction Survey",
          process: ["Market Research", "Data Analysis"],
          status: "In Progress",
          kpi: "500 responses",
          resourceUtilization: "45%",
          assignedProjects: "2",
        },
      ],
    },
    {
      id: 3,
      name: "Finance",
      manager: "Michael Chen",
      description: "Manages company budget and financial operations",
      totalProjects: 3,
      riskLevel: "High",
      projects: [
        {
          name: "Annual Budget Planning",
          process: ["Financial Analysis", "Forecasting"],
          status: "In Progress",
          kpi: "Budget approval by Q4",
          resourceUtilization: "85%",
          assignedProjects: "2",
        },
        {
          name: "Cost Reduction Initiative",
          process: ["Expense Analysis", "Process Optimization"],
          status: "On Hold",
          kpi: "10% cost reduction",
          resourceUtilization: "30%",
          assignedProjects: "1",
        },
      ],
    },
  ]);

  const handleCreateDepartment = () => {
    navigate("/create-department");
  };

  // Helper function to get risk level badge class
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
    <div className="departments-container">
      <div className="departments-header">
        <h2>Departments</h2>
        <button
          className="create-department-button"
          onClick={handleCreateDepartment}
        >
          Create Department
        </button>
      </div>

      <div className="departments-grid">
        {departments.map((dept) => (
          <div key={dept.id} className="department-card">
            <div className="department-header">
              <h3>{dept.name}</h3>
              <span
                className={`risk-badge ${getRiskLevelClass(dept.riskLevel)}`}
              >
                {dept.riskLevel}
              </span>
            </div>

            <div className="department-info">
              <p>
                <strong>Manager:</strong> {dept.manager}
              </p>
              <p>
                <strong>Description:</strong> {dept.description}
              </p>
              <p>
                <strong>Total Projects:</strong> {dept.totalProjects}
              </p>
            </div>

            <div className="department-projects">
              <h4>Projects</h4>
              {dept.projects &&
                dept.projects.map((project, index) => (
                  <div key={index} className="project-item">
                    <div className="project-header">
                      <h5>{project.name}</h5>
                      <span
                        className={`status-badge ${
                          project.status?.toLowerCase().replace(" ", "-") ||
                          "pending"
                        }`}
                      >
                        {project.status || "Pending"}
                      </span>
                    </div>

                    <div className="project-details">
                      <p>
                        <strong>Process:</strong>{" "}
                        {project.process?.join(", ") || "N/A"}
                      </p>
                      <p>
                        <strong>KPI:</strong> {project.kpi || "N/A"}
                      </p>
                      <p>
                        <strong>Resource Utilization:</strong>{" "}
                        {project.resourceUtilization || "N/A"}
                      </p>
                      <p>
                        <strong>Assigned Projects:</strong>{" "}
                        {project.assignedProjects || "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Department;

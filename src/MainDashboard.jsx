import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MainDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    activeProjectsCount: 0,
    departmentActivity: [
      { name: "Finance", activityLevel: "High" },
      { name: "IT", activityLevel: "Medium" },
      { name: "Compliance", activityLevel: "Low" },
    ],
    recentReports: [],
    keyMetrics: { totalUsers: 0, dataProcessed: "0TB", uptime: "0%" },
    complianceStatus: "",
    complianceDeadlines: [],
    complianceGaps: [
      "Missing DPA audit documentation",
      "Incomplete staff training records",
    ],
    complianceScore: 0,
    riskItems: [],
    riskSeverityDistribution: [],
    riskTrend: [
      { date: "2025-04-01", riskLevel: 5 },
      { date: "2025-04-15", riskLevel: 6 },
      { date: "2025-05-01", riskLevel: 4 },
      { date: "2025-05-19", riskLevel: 3 },
    ],
    recentActivity: [
      "User admin created Risk 'Data Breach' at 2025-05-18 14:30 EAT",
      "Report 'Compliance Report - 2025-05-19' generated at 03:00 EAT",
      "Project 'Budget 2025' updated by admin at 2025-05-18 10:15 EAT",
    ],
    teamPerformance: {
      activeMembers: 0,
      tasksCompleted: 0,
      avgCompletionTime: "0 days",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, teamsRes, reportsRes, risksRes] = await Promise.all(
          [
            axios.get("http://localhost:8080/api/projects"),
            axios.get("http://localhost:8080/api/teams"),
            axios.get("http://localhost:8080/api/reports"),
            axios.get("http://localhost:8080/api/risks"),
          ]
        );

        setData((prevData) => ({
          ...prevData,
          activeProjectsCount: projectsRes.data.length,
          departmentActivity: prevData.departmentActivity, // Keep hardcoded
          recentReports: reportsRes.data
            .slice(0, 5)
            .map((report) => `${report.name} - ${report.generatedDate}`),
          keyMetrics: {
            totalUsers: 150,
            dataProcessed: "2.5TB",
            uptime: "99.9%",
          },
          complianceStatus: "Compliant",
          complianceDeadlines: ["DPA Audit - 2025-06-01"],
          complianceGaps: prevData.complianceGaps, // Keep hardcoded
          complianceScore: 88,
          riskItems: risksRes.data.map((risk) => ({
            name: risk.name,
            severity: risk.severity,
          })),
          riskSeverityDistribution: risksRes.data.reduce((acc, risk) => {
            const existing = acc.find(
              (item) => item.severity === risk.severity
            );
            if (existing) existing.value += 1;
            else acc.push({ severity: risk.severity, value: 1 });
            return acc;
          }, []),
          riskTrend: prevData.riskTrend, // Keep hardcoded
          recentActivity: prevData.recentActivity, // Keep hardcoded
          teamPerformance: {
            activeMembers: teamsRes.data?.activeMembers || 25,
            tasksCompleted: teamsRes.data?.tasksCompleted || 120,
            avgCompletionTime: teamsRes.data?.avgCompletionTime || "2.3 days",
          },
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const drawPieChart = (canvasId, data) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 10;
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let startAngle = 0;

    const colors = {
      High: "#e53e3e",
      Medium: "#f6ad55",
      Low: "#48bb78",
    };

    data.forEach((slice) => {
      const sliceAngle = (slice.value / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.fillStyle = colors[slice.severity];
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();
      startAngle += sliceAngle;
    });
  };

  useEffect(() => {
    drawPieChart("risk-severity", data.riskSeverityDistribution);
  }, [data]);

  const handleCreateProject = () => {
    navigate("/create-project");
  };

  const handleViewRisks = () => {
    navigate("/create-risk");
  };

  const handleViewDepartments = () => {
    navigate("/departments");
  };

  return (
    <div className="main-dashboard">
      <h3>Main Dashboard</h3>
      <div className="dashboard-grid">
        <div className="dashboard-card active-projects">
          <h4>Active Projects</h4>
          <p className="metric-value">{data.activeProjectsCount}</p>
          <div className="card-actions">
            <button onClick={handleCreateProject} className="action-button">
              Create New Project
            </button>
          </div>
        </div>

        <div className="dashboard-card team-performance">
          <h4>Team Performance</h4>
          <div className="metrics-container">
            <div className="metric">
              <span className="metric-label">Active Members</span>
              <span className="metric-value">
                {data.teamPerformance.activeMembers}
              </span>
            </div>
            <div className="metric">
              <span className="metric-label">Tasks Completed</span>
              <span className="metric-value">
                {data.teamPerformance.tasksCompleted}
              </span>
            </div>
            <div className="metric">
              <span className="metric-label">Avg. Completion Time</span>
              <span className="metric-value">
                {data.teamPerformance.avgCompletionTime}
              </span>
            </div>
          </div>
          <div className="card-actions">
            {/* <button
              onClick={() => navigate("/teams")}
              className="action-button"
            >
              View Team Details
            </button> */}
          </div>
        </div>

        <div className="dashboard-card department-activity">
          <h4>Department Activity</h4>
          <table className="department-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Activity Level</th>
              </tr>
            </thead>
            <tbody>
              {data.departmentActivity.map((dept, index) => (
                <tr key={index}>
                  <td>{dept.name}</td>
                  <td>
                    <span
                      className={`activity-level ${dept.activityLevel.toLowerCase()}`}
                    >
                      {dept.activityLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="card-actions">
            <button onClick={handleViewDepartments} className="action-button">
              View All Departments
            </button>
          </div>
        </div>

        <div className="dashboard-card recent-reports">
          <h4>Recent Reports</h4>
          {data.recentReports.length > 0 ? (
            <ul className="reports-list">
              {data.recentReports.slice(0, 3).map((report, index) => (
                <li key={index}>{report}</li>
              ))}
            </ul>
          ) : (
            <p className="no-data">No recent reports available</p>
          )}
          <div className="card-actions">
            <button className="action-button">Generate New Report</button>
          </div>
        </div>

        <div className="dashboard-card key-metrics">
          <h4>Key Performance Metrics</h4>
          <div className="metrics-container">
            <div className="metric">
              <span className="metric-label">Users</span>
              <span className="metric-value">{data.keyMetrics.totalUsers}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Data</span>
              <span className="metric-value">
                {data.keyMetrics.dataProcessed}
              </span>
            </div>
            <div className="metric">
              <span className="metric-label">Uptime</span>
              <span className="metric-value">{data.keyMetrics.uptime}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card compliance">
          <h4>Regulatory Compliance</h4>
          <div className="compliance-info">
            <div className="compliance-header">
              <span className="compliance-status">
                Status: {data.complianceStatus}
              </span>
              <span className="compliance-score">
                Score: {data.complianceScore}%
              </span>
            </div>
            <h5>Upcoming Deadlines</h5>
            <ul className="deadlines-list">
              {data.complianceDeadlines.map((deadline, index) => (
                <li key={index}>{deadline}</li>
              ))}
            </ul>
            <h5>Critical Gaps</h5>
            <ul className="gaps-list">
              {data.complianceGaps.length > 0 ? (
                data.complianceGaps.map((gap, index) => (
                  <li key={index}>{gap}</li>
                ))
              ) : (
                <li>No critical gaps</li>
              )}
            </ul>
          </div>
        </div>

        <div className="dashboard-card risks">
          <h4>Risk Indicators</h4>
          <div className="risks-container">
            <div className="risks-left">
              <h5>Top Risks</h5>
              <ul className="risks-list">
                {data.riskItems.slice(0, 3).map((risk, index) => (
                  <li key={index}>
                    {risk.name}
                    <span
                      className={`status-badge ${risk.severity.toLowerCase()}`}
                    >
                      {risk.severity}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="card-actions">
                <button onClick={handleViewRisks} className="action-button">
                  Manage Risks
                </button>
              </div>
            </div>
            <div className="risks-right">
              <h5>Risk Severity</h5>
              <canvas id="risk-severity" width="120" height="120"></canvas>
            </div>
          </div>
        </div>

        <div className="dashboard-card recent-activity">
          <h4>Recent Activity</h4>
          <ul className="activity-list">
            {data.recentActivity.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;

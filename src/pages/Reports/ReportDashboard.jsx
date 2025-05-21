import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateReport from "./CreateReports.jsx";

// Hardcoded sample data for reports
const sampleReports = [
  {
    id: "rep-001",
    name: "Q1 2025 Compliance Overview",
    reportType: "Compliance Report",
    generatedDate: "2025-04-01",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    status: "completed",
  },
  {
    id: "rep-002",
    name: "Q1 2025 Performance Summary",
    reportType: "Performance Metrics",
    generatedDate: "2025-04-02",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    status: "completed",
  },
  {
    id: "rep-003",
    name: "March 2025 Compliance Audit",
    reportType: "Compliance Report",
    generatedDate: "2025-04-05",
    startDate: "2025-03-01",
    endDate: "2025-03-31",
    status: "completed",
  },
];

const ReportDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/reports");
        setReports(response.data);
      } catch (error) {
        setReports(sampleReports);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleGenerateReport = (newReport) => {
    setReports([newReport, ...reports]);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="report-dashboard">
      <h2>Reports Dashboard</h2>
      <CreateReport onGenerateReport={handleGenerateReport} />
      <div className="report-list">
        <h3>Available Reports</h3>
        {loading ? (
          <div className="loading">Loading reports...</div>
        ) : reports.length === 0 ? (
          <p className="no-reports">
            No reports available. Generate your first report above.
          </p>
        ) : (
          <div className="reports-grid">
            {reports.map((report) => (
              <div key={report.id} className="report-card">
                <div className="report-header">
                  <h4>{report.name}</h4>
                  <span className={`report-status ${report.status}`}>
                    {report.status}
                  </span>
                </div>
                <div className="report-details">
                  <p>
                    <strong>Type:</strong> {report.reportType}
                  </p>
                  <p>
                    <strong>Generated:</strong>{" "}
                    {formatDate(report.generatedDate)}
                  </p>
                  <p>
                    <strong>Date Range:</strong> {formatDate(report.startDate)}{" "}
                    to {formatDate(report.endDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDashboard;

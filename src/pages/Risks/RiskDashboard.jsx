import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Sample hard-coded risk data
const sampleRisks = [
  {
    id: 1,
    name: "Unauthorized Data Access",
    category: "Security",
    severity: "High",
    description:
      "Risk of unauthorized access to sensitive customer data due to insufficient access controls",
    impact:
      "Potential data breach, regulatory fines, reputation damage, and loss of customer trust",
    likelihood: "Medium",
    mitigation:
      "Implement role-based access control, multi-factor authentication, and regular access reviews",
    responsibleDepartment: "IT Security",
    identified: "2025-01-15",
    expectedResolution: "2025-06-30",
    resolved: false,
  },
  {
    id: 2,
    name: "Data Retention Compliance",
    category: "Compliance",
    severity: "Medium",
    description:
      "Failure to implement automated data deletion after retention period expiration",
    impact:
      "Regulatory non-compliance, potential fines, and excessive data storage costs",
    likelihood: "High",
    mitigation:
      "Implement automated data lifecycle management with scheduled deletion processes",
    responsibleDepartment: "Legal & Compliance",
    identified: "2025-02-10",
    expectedResolution: "2025-04-15",
    resolved: true,
  },
  {
    id: 3,
    name: "Vendor Data Processing Agreement",
    category: "Legal",
    severity: "Medium",
    description:
      "Missing or inadequate Data Processing Agreements with third-party vendors",
    impact: "Non-compliance with GDPR and other data protection regulations",
    likelihood: "Medium",
    mitigation:
      "Review and update all vendor contracts to include comprehensive DPAs",
    responsibleDepartment: "Procurement",
    identified: "2025-01-05",
    expectedResolution: "2025-03-30",
    resolved: false,
  },
  {
    id: 4,
    name: "Data Subject Rights Response",
    category: "Compliance",
    severity: "Low",
    description:
      "Insufficient process for responding to data subject access requests within required timeframes",
    impact:
      "Regulatory non-compliance and potential complaints to supervisory authorities",
    likelihood: "Low",
    mitigation:
      "Implement automated workflow for handling data subject requests with SLA tracking",
    responsibleDepartment: "Data Protection",
    identified: "2025-03-01",
    expectedResolution: "2025-04-30",
    resolved: false,
  },
  {
    id: 5,
    name: "Cross-Border Data Transfer",
    category: "Compliance",
    severity: "High",
    description:
      "Inadequate safeguards for international data transfers following recent regulatory changes",
    impact: "Potential regulatory action, fines, and service disruption",
    likelihood: "High",
    mitigation:
      "Implement Standard Contractual Clauses and conduct transfer impact assessments",
    responsibleDepartment: "Legal & Compliance",
    identified: "2024-12-10",
    expectedResolution: "2025-02-28",
    resolved: true,
  },
];

const RiskDashboard = () => {
  const navigate = useNavigate();
  const [risks, setRisks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchRisks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/risks", {
          timeout: 5000, // 5 second timeout
        });
        setRisks(response.data);
        setError(null);
      } catch (error) {
        // If API call fails, use sample data without warning
        setRisks(sampleRisks);

        // Only set error if it's a server error, not just that the API isn't available
        if (error.response && error.response.status >= 500) {
          setError("Server error occurred. Using local data.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRisks();

    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchRisks, 300000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Calculate metrics
  const severityCounts = risks.reduce(
    (acc, risk) => {
      acc[risk.severity.toLowerCase()] += 1;
      return acc;
    },
    { high: 0, medium: 0, low: 0 }
  );

  const resolutionRate =
    risks.length > 0
      ? Math.round(
          (risks.filter((risk) => risk.resolved).length / risks.length) * 100
        )
      : 0;

  const handleCreateRisk = () => {
    navigate("/create-risk");
  };

  const handleEditRisk = () => {
    navigate("/create-risk");
  };

  const handleResolveRisk = async (riskId) => {
    try {
      // Attempt API call first
      await axios.patch(`http://localhost:8080/api/risks/${riskId}`, {
        resolved: true,
      });

      // Update local state
      setRisks(
        risks.map((risk) =>
          risk.id === riskId ? { ...risk, resolved: true } : risk
        )
      );
    } catch (error) {
      // If API fails, just update local state
      setRisks(
        risks.map((risk) =>
          risk.id === riskId ? { ...risk, resolved: true } : risk
        )
      );
    }
  };

  const handleDeleteRisk = async (riskId) => {
    if (window.confirm("Are you sure you want to delete this risk?")) {
      try {
        // Try API call first
        await axios.delete(`http://localhost:8080/api/risks/${riskId}`);

        // Update local state
        setRisks(risks.filter((risk) => risk.id !== riskId));
      } catch (error) {
        // If API fails, just update local state
        setRisks(risks.filter((risk) => risk.id !== riskId));
      }
    }
  };

  const refreshRisks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/risks");
      setRisks(response.data);
      setError(null);
    } catch (error) {
      // Silently fall back to existing data
      setError("Failed to refresh data.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRisks =
    activeFilter === "all"
      ? risks
      : activeFilter === "resolved"
      ? risks.filter((risk) => risk.resolved)
      : risks.filter((risk) => !risk.resolved);

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLikelihoodColor = (likelihood) => {
    switch (likelihood.toLowerCase()) {
      case "high":
        return "bg-purple-100 text-purple-800";
      case "medium":
        return "bg-blue-100 text-blue-800";
      case "low":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="risk-dashboard p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Risk Register</h1>
        <div className="flex gap-3">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={handleCreateRisk}
          >
            Create Risk
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
            onClick={refreshRisks}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Refresh"}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500 mb-1">High Severity Risks</div>
          <div className="text-2xl font-bold flex items-end">
            {severityCounts.high}
            <span className="text-sm text-gray-500 ml-2">
              of {risks.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full mt-2">
            <div
              className="h-2 bg-red-500 rounded-full"
              style={{
                width: `${
                  risks.length > 0
                    ? (severityCounts.high / risks.length) * 100
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500 mb-1">
            Medium Severity Risks
          </div>
          <div className="text-2xl font-bold flex items-end">
            {severityCounts.medium}
            <span className="text-sm text-gray-500 ml-2">
              of {risks.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full mt-2">
            <div
              className="h-2 bg-yellow-500 rounded-full"
              style={{
                width: `${
                  risks.length > 0
                    ? (severityCounts.medium / risks.length) * 100
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500 mb-1">Low Severity Risks</div>
          <div className="text-2xl font-bold flex items-end">
            {severityCounts.low}
            <span className="text-sm text-gray-500 ml-2">
              of {risks.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full mt-2">
            <div
              className="h-2 bg-green-500 rounded-full"
              style={{
                width: `${
                  risks.length > 0
                    ? (severityCounts.low / risks.length) * 100
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500 mb-1">Resolution Rate</div>
          <div className="text-2xl font-bold">{resolutionRate}%</div>
          <div className="h-2 bg-gray-200 rounded-full mt-2">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{ width: `${resolutionRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex space-x-2 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              activeFilter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveFilter("all")}
          >
            All Risks
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeFilter === "open"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveFilter("open")}
          >
            Open Risks
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeFilter === "resolved"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveFilter("resolved")}
          >
            Resolved Risks
          </button>
        </div>
      </div>

      {isLoading && risks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">Loading risk data...</p>
        </div>
      ) : filteredRisks.length === 0 ? (
        <div className="text-center py-8 border rounded bg-gray-50">
          <p className="text-lg text-gray-600">
            No {activeFilter === "all" ? "" : activeFilter} risks found.
          </p>
          <p className="text-gray-500 mt-2">
            Create a new risk to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredRisks.map((risk) => (
            <div
              key={risk.id}
              className={`risk-card border rounded-lg overflow-hidden shadow-md bg-white ${
                risk.resolved ? "border-green-500" : ""
              }`}
            >
              <div className="bg-gray-100 px-4 py-3 border-b flex justify-between items-center">
                <h3 className="font-bold text-lg">{risk.name}</h3>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                      risk.severity
                    )}`}
                  >
                    {risk.severity}
                  </span>
                  {risk.resolved && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Resolved
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="mb-2">
                      <span className="font-medium">Category:</span>{" "}
                      {risk.category}
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Likelihood:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getLikelihoodColor(
                          risk.likelihood
                        )}`}
                      >
                        {risk.likelihood}
                      </span>
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Department:</span>{" "}
                      {risk.responsibleDepartment}
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">
                      <span className="font-medium">Description:</span>{" "}
                      {risk.description}
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Impact:</span> {risk.impact}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Mitigation Strategy</h4>
                  <p className="pl-2 border-l-2 border-blue-200">
                    {risk.mitigation}
                  </p>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  {!risk.resolved && (
                    <button
                      className="bg-green-50 hover:bg-green-100 text-green-600 px-3 py-1 rounded text-sm"
                      onClick={() => handleResolveRisk(risk.id)}
                    >
                      Mark Resolved
                    </button>
                  )}
                  <button
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm"
                    onClick={handleEditRisk}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded text-sm"
                    onClick={() => handleDeleteRisk(risk.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiskDashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Sample hard-coded data for processes
const sampleProcesses = [
  {
    id: 1,
    name: "Customer Data Collection",
    description:
      "Process for collecting and managing customer data from web forms",
    dataFlow: {
      source: "Web application forms",
      collectionMethod: "Direct user input through secure forms",
      storageLocation: "AWS RDS Database (EU Region)",
      storageDuration: "3 years from last interaction",
      processingExtent: "Contact management, service delivery, and marketing",
      transferDestination: "Internal CRM and marketing automation systems",
      affectedIndividuals: "Website users and customers",
    },
    compliancePrinciples: {
      lawfulness:
        "Processing based on legitimate interest and contract performance",
      fairness: "Clear information provided to users about data usage",
      transparency: "Privacy notice provided at collection point",
      purposeLimitation: "Data used only for specified business purposes",
      dataMinimisation: "Only necessary data fields collected",
      dataAccuracy: "Regular data validation performed",
      storageLimitation: "Automated deletion after retention period",
      integrityConfidentiality: "Encryption at rest and in transit",
      accountability: "Process documented and reviewed annually",
    },
    necessityProportionality: {
      assessment: "Processing is necessary for business operations",
      lawfulBasis: "Legitimate interest, contract performance",
      consent: "Obtained through opt-in checkbox",
      achievesPurpose: "Yes, effective for customer management",
      alternativeMethods: "No viable alternatives identified",
      dataQualityMinimisation: "Only essential fields collected",
      informationToIndividuals: "Privacy notice and data usage explanations",
      supportRights: "Access and deletion requests handled within 30 days",
      complianceMeasures: "Regular audits and staff training",
      partiesInvolved: "Internal teams and cloud service provider",
      safeguards: "Access controls, encryption, audit logs",
      internationalTransfers: "None",
    },
    monitoring: {
      efficiency: "97% completion rate for forms",
      bottlenecks: "Manual verification occasionally required",
      errorRate: "Less than 2% data validation errors",
      qualityMetric: "Customer data accuracy rating: 4.8/5",
    },
  },
  {
    id: 2,
    name: "Employee Onboarding",
    description: "Process for collecting and storing new employee information",
    dataFlow: {
      source: "HR recruitment system and manual entry",
      collectionMethod: "Application forms and direct collection",
      storageLocation: "Internal HR database",
      storageDuration: "Duration of employment + 7 years",
      processingExtent:
        "Payroll, benefits administration, performance management",
      transferDestination: "Payroll provider, benefits administrators",
      affectedIndividuals: "New and current employees",
    },
    compliancePrinciples: {
      lawfulness:
        "Processing based on employment contract and legal obligation",
      fairness: "Transparent data collection with employee handbook",
      transparency: "Detailed employment privacy notice provided",
      purposeLimitation: "Data used only for employment administration",
      dataMinimisation: "Only required employment data collected",
      dataAccuracy: "Annual data verification with employees",
      storageLimitation: "Retention policy enforced through automated system",
      integrityConfidentiality: "Role-based access control and encryption",
      accountability: "HR compliance officer responsible for oversight",
    },
    necessityProportionality: {
      assessment: "Processing necessary for employment relationship",
      lawfulBasis: "Contract performance, legal obligation",
      consent: "Not relied upon - other legal bases apply",
      achievesPurpose: "Yes, enables effective employment administration",
      alternativeMethods: "No viable alternatives for employment data",
      dataQualityMinimisation:
        "Regular reviews of data collection requirements",
      informationToIndividuals: "Employment privacy notice and handbook",
      supportRights: "Employee data rights procedure documented",
      complianceMeasures: "Annual compliance reviews and training",
      partiesInvolved: "HR, IT, and authorized third parties",
      safeguards: "Data protection policy and secure systems",
      internationalTransfers: "Limited transfers with SCCs in place",
    },
    monitoring: {
      efficiency: "Average onboarding completion: 3 business days",
      bottlenecks: "Background check processing times",
      errorRate: "4% requiring manual correction",
      qualityMetric: "Employee satisfaction with process: 4.5/5",
    },
  },
];

const ProcessDashboard = () => {
  const navigate = useNavigate();
  const [processes, setProcesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcesses = async () => {
      setIsLoading(true);
      try {
        // Try to fetch from API first
        const response = await axios.get(
          "http://localhost:8080/api/processes",
          {
            timeout: 5000, // 5 second timeout
          }
        );
        setProcesses(response.data);
        console.log("Processes loaded from API:", response.data);
      } catch (error) {
        // If API call fails, use sample data
        console.warn("Error fetching from API, using sample data:", error);
        setProcesses(sampleProcesses);

        // Only set error if it's not just that the API isn't available
        if (error.message !== "Network Error") {
          setError(`Failed to load processes: ${error.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProcesses();

    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchProcesses, 300000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleCreateProcess = () => {
    navigate("/create-process");
  };

  const handleEditProcess = (processId) => {
    navigate(`/edit-process/${processId}`);
  };

  const handleDeleteProcess = async (processId) => {
    if (window.confirm("Are you sure you want to delete this process?")) {
      try {
        await axios.delete(`http://localhost:8080/api/processes/${processId}`);
        setProcesses(processes.filter((process) => process.id !== processId));
      } catch (error) {
        console.error("Error deleting process:", error);
        alert("Failed to delete process. Please try again.");
      }
    }
  };

  const refreshProcesses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/processes");
      setProcesses(response.data);
      setError(null);
    } catch (error) {
      console.error("Error refreshing processes:", error);
      setError("Failed to refresh processes. Using cached data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="process-dashboard p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Processing Registry</h1>
        <div className="flex gap-3">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={handleCreateProcess}
          >
            Create Process
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
            onClick={refreshProcesses}
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

      {isLoading && processes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">Loading process data...</p>
        </div>
      ) : processes.length === 0 ? (
        <div className="text-center py-8 border rounded bg-gray-50">
          <p className="text-lg text-gray-600">No processes found.</p>
          <p className="text-gray-500 mt-2">
            Create a new process to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processes.map((process) => (
            <div
              key={process.id}
              className="process-card border rounded-lg overflow-hidden shadow-md bg-white"
            >
              <div className="bg-gray-100 px-4 py-3 border-b">
                <h3 className="font-bold text-lg">{process.name}</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-700 mb-4">{process.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Data Flow
                  </h4>
                  <div className="pl-2 border-l-2 border-blue-200">
                    <p className="mb-1">
                      <span className="font-medium">Source:</span>{" "}
                      {process.dataFlow?.source || "N/A"}
                    </p>
                    <p className="mb-1">
                      <span className="font-medium">Collection Method:</span>{" "}
                      {process.dataFlow?.collectionMethod || "N/A"}
                    </p>
                    <p className="mb-1">
                      <span className="font-medium">Storage Location:</span>{" "}
                      {process.dataFlow?.storageLocation || "N/A"}
                    </p>
                    <p className="mb-1">
                      <span className="font-medium">Storage Duration:</span>{" "}
                      {process.dataFlow?.storageDuration || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Monitoring
                  </h4>
                  <div className="pl-2 border-l-2 border-green-200">
                    <p className="mb-1">
                      <span className="font-medium">Efficiency:</span>{" "}
                      {process.monitoring?.efficiency || "N/A"}
                    </p>
                    <p className="mb-1">
                      <span className="font-medium">Error Rate:</span>{" "}
                      {process.monitoring?.errorRate || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm"
                    onClick={() => handleEditProcess(process.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded text-sm"
                    onClick={() => handleDeleteProcess(process.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {processes.length > 0 && (
        <div className="mt-8">
          <details className="bg-gray-50 border rounded p-4">
            <summary className="font-medium cursor-pointer">
              Process Details
            </summary>
            <div className="mt-4 space-y-8">
              {processes.map((process) => (
                <div key={`detail-${process.id}`} className="border-b pb-6">
                  <h3 className="text-xl font-bold mb-3">{process.name}</h3>
                  <p className="mb-4">{process.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Data Flow</h4>
                      <div className="space-y-1">
                        <p>
                          <span className="font-medium">Source:</span>{" "}
                          {process.dataFlow?.source || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">
                            Collection Method:
                          </span>{" "}
                          {process.dataFlow?.collectionMethod || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Storage Location:</span>{" "}
                          {process.dataFlow?.storageLocation || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Storage Duration:</span>{" "}
                          {process.dataFlow?.storageDuration || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">
                            Processing Extent:
                          </span>{" "}
                          {process.dataFlow?.processingExtent || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">
                            Transfer Destination:
                          </span>{" "}
                          {process.dataFlow?.transferDestination || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">
                            Affected Individuals:
                          </span>{" "}
                          {process.dataFlow?.affectedIndividuals || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-2">
                        Compliance with Data Protection Principles
                      </h4>
                      <div className="space-y-1">
                        <p>
                          <span className="font-medium">Lawfulness:</span>{" "}
                          {process.compliancePrinciples?.lawfulness || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Fairness:</span>{" "}
                          {process.compliancePrinciples?.fairness || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Transparency:</span>{" "}
                          {process.compliancePrinciples?.transparency || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">
                            Purpose Limitation:
                          </span>{" "}
                          {process.compliancePrinciples?.purposeLimitation ||
                            "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">
                            Data Minimisation:
                          </span>{" "}
                          {process.compliancePrinciples?.dataMinimisation ||
                            "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Data Accuracy:</span>{" "}
                          {process.compliancePrinciples?.dataAccuracy || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">
                            Storage Limitation:
                          </span>{" "}
                          {process.compliancePrinciples?.storageLimitation ||
                            "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold text-lg mb-2">
                      Necessity and Proportionality
                    </h4>
                    <p>
                      <span className="font-medium">Assessment:</span>{" "}
                      {process.necessityProportionality?.assessment || "N/A"}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <p>
                          <span className="font-medium">Lawful Basis:</span>{" "}
                          {process.necessityProportionality?.lawfulBasis ||
                            "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Consent:</span>{" "}
                          {process.necessityProportionality?.consent || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Achieves Purpose:</span>{" "}
                          {process.necessityProportionality?.achievesPurpose ||
                            "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">
                            Alternative Methods:
                          </span>{" "}
                          {process.necessityProportionality
                            ?.alternativeMethods || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className="font-medium">
                            Information to Individuals:
                          </span>{" "}
                          {process.necessityProportionality
                            ?.informationToIndividuals || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Support Rights:</span>{" "}
                          {process.necessityProportionality?.supportRights ||
                            "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Safeguards:</span>{" "}
                          {process.necessityProportionality?.safeguards ||
                            "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">
                            International Transfers:
                          </span>{" "}
                          {process.necessityProportionality
                            ?.internationalTransfers || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold text-lg mb-2">
                      Process Monitoring
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p>
                          <span className="font-medium">Efficiency:</span>{" "}
                          {process.monitoring?.efficiency || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Bottlenecks:</span>{" "}
                          {process.monitoring?.bottlenecks || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className="font-medium">Error Rate:</span>{" "}
                          {process.monitoring?.errorRate || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Quality Metric:</span>{" "}
                          {process.monitoring?.qualityMetric || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </div>
  );
};

export default ProcessDashboard;

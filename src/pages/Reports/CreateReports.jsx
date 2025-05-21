import React, { useState } from "react";
import jsPDF from "jspdf";

const CreateReport = ({ onGenerateReport }) => {
  const [formData, setFormData] = useState({
    reportType: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState({});
  const [generating, setGenerating] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.reportType) newErrors.reportType = "Report type is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (
      formData.startDate &&
      formData.endDate &&
      formData.startDate > formData.endDate
    ) {
      newErrors.endDate = "End date must be after start date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleGenerateReport = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setGenerating(true);

      // Generate report data
      const reportName = `${formData.reportType} (${formData.startDate} to ${formData.endDate})`;
      const newReport = {
        id: `rep-${Math.floor(1000 + Math.random() * 9000)}`,
        name: reportName,
        reportType: formData.reportType,
        generatedDate: new Date().toISOString().split("T")[0],
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: "completed",
      };

      // Generate PDF
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Data Guardian Report", 20, 20);
      doc.setFontSize(12);
      doc.text(`Report Name: ${newReport.name}`, 20, 40);
      doc.text(`Type: ${newReport.reportType}`, 20, 50);
      doc.text(`Generated: ${formatDate(newReport.generatedDate)}`, 20, 60);
      doc.text(
        `Period: ${formatDate(newReport.startDate)} to ${formatDate(
          newReport.endDate
        )}`,
        20,
        70
      );
      doc.text(
        "Summary: This is a generated report for the specified period.",
        20,
        90
      );

      // Auto-download PDF
      doc.save(`report_${newReport.id}.pdf`);

      // Pass new report to parent component
      onGenerateReport(newReport);

      // Reset form
      setFormData({ reportType: "", startDate: "", endDate: "" });
      setErrors({});
      setGenerating(false);
    }
  };

  return (
    <div className="report-generator">
      <h3>Generate New Report</h3>
      <form onSubmit={handleGenerateReport}>
        <div className="form-group">
          <label htmlFor="reportType">Report Type</label>
          <select
            id="reportType"
            name="reportType"
            value={formData.reportType}
            onChange={handleChange}
            className={errors.reportType ? "input-error" : ""}
          >
            <option value="">Select Report Type</option>
            <option value="Compliance Report">Compliance Report</option>
            <option value="Performance Metrics">Performance Metrics</option>
            <option value="Financial Summary">Financial Summary</option>
            <option value="Operational Overview">Operational Overview</option>
          </select>
          {errors.reportType && (
            <p className="error-message">{errors.reportType}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={errors.startDate ? "input-error" : ""}
          />
          {errors.startDate && (
            <p className="error-message">{errors.startDate}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={errors.endDate ? "input-error" : ""}
          />
          {errors.endDate && <p className="error-message">{errors.endDate}</p>}
        </div>
        <button
          type="submit"
          className="generate-report-button"
          disabled={generating}
        >
          {generating ? "Generating..." : "Generate Report"}
        </button>
      </form>
    </div>
  );
};

export default CreateReport;

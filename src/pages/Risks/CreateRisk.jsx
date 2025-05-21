import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateRisk = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    severity: "",
    description: "",
    impact: "",
    likelihood: "",
    mitigation: "",
    responsibleDepartment: "",
    identified: "",
    expectedResolution: "",
    resolved: false,
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Risk name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.severity) newErrors.severity = "Severity is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.impact) newErrors.impact = "Impact is required";
    if (!formData.likelihood) newErrors.likelihood = "Likelihood is required";
    if (!formData.mitigation)
      newErrors.mitigation = "Mitigation strategy is required";
    if (!formData.responsibleDepartment)
      newErrors.responsibleDepartment = "Responsible department is required";
    if (!formData.identified)
      newErrors.identified = "Identified date is required";
    if (!formData.expectedResolution)
      newErrors.expectedResolution = "Expected resolution date is required";
    if (
      formData.identified &&
      formData.expectedResolution &&
      new Date(formData.expectedResolution) <= new Date(formData.identified)
    ) {
      newErrors.expectedResolution =
        "Expected resolution date must be after identified date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          "http://localhost:8080/api/risks",
          formData,
          { timeout: 5000 }
        );
        if (response.status === 201 || response.status === 200) {
          setMessage("Risk created successfully!");
          setFormData({
            name: "",
            category: "",
            severity: "",
            description: "",
            impact: "",
            likelihood: "",
            mitigation: "",
            responsibleDepartment: "",
            identified: "",
            expectedResolution: "",
            resolved: false,
          });
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        } else {
          setMessage("Unexpected response from server. Please try again.");
        }
      } catch (error) {
        console.error("Error creating risk:", error);
        if (error.code === "ECONNABORTED") {
          setMessage(
            "Request timed out. Please check your network and try again."
          );
        } else if (error.response) {
          setMessage(
            `Server error: ${error.response.status}. Please try again later.`
          );
        } else {
          setMessage("Failed to create risk. Please try again.");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="create-risk-container max-w-2xl mx-auto p-4">
      <div className="create-risk-card bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6">
          <h3
            className="text-2xl font-bold mb-6 text-center"
            style={{
              background:
                "linear-gradient(90deg, var(--primary-color), var(--secondary-color))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Create New Risk
          </h3>
          {message && (
            <div
              className={`mb-4 p-3 rounded text-sm ${
                message.includes("successfully")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
              role="alert"
            >
              {message}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0"
          >
            <div className="form-group">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Risk Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:border-primary-color focus:ring focus:ring-primary-color focus:ring-opacity-25"
                aria-describedby={errors.name ? "name-error" : undefined}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p id="name-error" className="error text-sm text-red-600 mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-600"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:border-primary-color focus:ring focus:ring-primary-color focus:ring-opacity-25"
                aria-describedby={
                  errors.category ? "category-error" : undefined
                }
                disabled={isSubmitting}
              >
                <option value="">Select Category</option>
                <option value="Operational">Operational</option>
                <option value="Financial">Financial</option>
                <option value="Compliance">Compliance</option>
                <option value="Technical">Technical</option>
              </select>
              {errors.category && (
                <p
                  id="category-error"
                  className="error text-sm text-red-600 mt-1"
                >
                  {errors.category}
                </p>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="severity"
                className="block text-sm font-medium text-gray-600"
              >
                Severity
              </label>
              <select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:border-primary-color focus:ring focus:ring-primary-color focus:ring-opacity-25"
                aria-describedby={
                  errors.severity ? "severity-error" : undefined
                }
                disabled={isSubmitting}
              >
                <option value="">Select Severity</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
              {errors.severity && (
                <p
                  id="severity-error"
                  className="error text-sm text-red-600 mt-1"
                >
                  {errors.severity}
                </p>
              )}
            </div>

            <div className="form-group md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-600"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-2 border rounded-md focus:border-primary-color focus:ring focus:ring-primary-color focus:ring-opacity-25"
                aria-describedby={
                  errors.description ? "description-error" : undefined
                }
                disabled={isSubmitting}
              />
              {errors.description && (
                <p
                  id="description-error"
                  className="error text-sm text-red-600 mt-1"
                >
                  {errors.description}
                </p>
              )}
            </div>

            <div className="form-group md:col-span-2">
              <label
                htmlFor="impact"
                className="block text-sm font-medium text-gray-600"
              >
                Impact
              </label>
              <textarea
                id="impact"
                name="impact"
                value={formData.impact}
                onChange={handleChange}
                rows="3"
                className="w-full p-2 border rounded-md focus:border-primary-color focus:ring focus:ring-primary-color focus:ring-opacity-25"
                aria-describedby={errors.impact ? "impact-error" : undefined}
                disabled={isSubmitting}
              />
              {errors.impact && (
                <p
                  id="impact-error"
                  className="error text-sm text-red-600 mt-1"
                >
                  {errors.impact}
                </p>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="likelihood"
                className="block text-sm font-medium text-gray-600"
              >
                Likelihood
              </label>
              <select
                id="likelihood"
                name="likelihood"
                value={formData.likelihood}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:border-primary-color focus:ring focus:ring-primary-color focus:ring-opacity-25"
                aria-describedby={
                  errors.likelihood ? "likelihood-error" : undefined
                }
                disabled={isSubmitting}
              >
                <option value="">Select Likelihood</option>
                <option value="Rare">Rare</option>
                <option value="Unlikely">Unlikely</option>
                <option value="Possible">Possible</option>
                <option value="Likely">Likely</option>
                <option value="Almost Certain">Almost Certain</option>
              </select>
              {errors.likelihood && (
                <p
                  id="likelihood-error"
                  className="error text-sm text-red-600 mt-1"
                >
                  {errors.likelihood}
                </p>
              )}
            </div>

            <div className="form-group md:col-span-2">
              <label
                htmlFor="mitigation"
                className="block text-sm font-medium text-gray-600"
              >
                Mitigation Strategy
              </label>
              <textarea
                id="mitigation"
                name="mitigation"
                value={formData.mitigation}
                onChange={handleChange}
                rows="3"
                className="w-full p-2 border rounded-md focus:border-primary-color focus:ring focus:ring-primary-color focus:ring-opacity-25"
                aria-describedby={
                  errors.mitigation ? "mitigation-error" : undefined
                }
                disabled={isSubmitting}
              />
              {errors.mitigation && (
                <p
                  id="mitigation-error"
                  className="error text-sm text-red-600 mt-1"
                >
                  {errors.mitigation}
                </p>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="responsibleDepartment"
                className="block text-sm font-medium text-gray-600"
              >
                Responsible Department
              </label>
              <input
                type="text"
                id="responsibleDepartment"
                name="responsibleDepartment"
                value={formData.responsibleDepartment}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:border-primary-color focus:ring focus:ring-primary-color focus:ring-opacity-25"
                aria-describedby={
                  errors.responsibleDepartment
                    ? "responsibleDepartment-error"
                    : undefined
                }
                disabled={isSubmitting}
              />
              {errors.responsibleDepartment && (
                <p
                  id="responsibleDepartment-error"
                  className="error text-sm text-red-600 mt-1"
                >
                  {errors.responsibleDepartment}
                </p>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="identified"
                className="block text-sm font-medium text-gray-600"
              >
                Identified Date
              </label>
              <input
                type="date"
                id="identified"
                name="identified"
                value={formData.identified}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className="w-full p-2 border rounded-md focus:border-primary-color focus:ring focus:ring-primary-color focus:ring-opacity-25"
                aria-describedby={
                  errors.identified ? "identified-error" : undefined
                }
                disabled={isSubmitting}
              />
              {errors.identified && (
                <p
                  id="identified-error"
                  className="error text-sm text-red-600 mt-1"
                >
                  {errors.identified}
                </p>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="expectedResolution"
                className="block text-sm font-medium text-gray-600"
              >
                Expected Resolution Date
              </label>
              <input
                type="date"
                id="expectedResolution"
                name="expectedResolution"
                value={formData.expectedResolution}
                onChange={handleChange}
                min={
                  formData.identified || new Date().toISOString().split("T")[0]
                }
                className="w-full p-2 border rounded-md focus:border-primary-color focus:ring focus:ring-primary-color focus:ring-opacity-25"
                aria-describedby={
                  errors.expectedResolution
                    ? "expectedResolution-error"
                    : undefined
                }
                disabled={isSubmitting}
              />
              {errors.expectedResolution && (
                <p
                  id="expectedResolution-error"
                  className="error text-sm text-red-600 mt-1"
                >
                  {errors.expectedResolution}
                </p>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="resolved"
                className="flex items-center text-sm font-medium text-gray-600"
              >
                <input
                  type="checkbox"
                  id="resolved"
                  name="resolved"
                  checked={formData.resolved}
                  onChange={handleChange}
                  className="mr-2"
                  disabled={isSubmitting}
                />
                Resolved
              </label>
            </div>

            <div className="flex justify-end gap-4 md:col-span-2">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md disabled:opacity-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] hover:from-[var(--primary-dark)] hover:to-[var(--secondary-color)] transition-all duration-300 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Risk"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRisk;

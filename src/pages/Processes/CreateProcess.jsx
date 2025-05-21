import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateProcess = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dataFlow: {
      source: "",
      collectionMethod: "",
      storageLocation: "",
      storageDuration: "",
      processingExtent: "",
      transferDestination: "",
      affectedIndividuals: "",
    },
    compliancePrinciples: {
      lawfulness: "",
      fairness: "",
      transparency: "",
      purposeLimitation: "",
      dataMinimisation: "",
      dataAccuracy: "",
      storageLimitation: "",
      integrityConfidentiality: "",
      accountability: "",
    },
    necessityProportionality: {
      assessment: "",
      lawfulBasis: "",
      consent: "",
      achievesPurpose: "",
      alternativeMethods: "",
      dataQualityMinimisation: "",
      informationToIndividuals: "",
      supportRights: "",
      complianceMeasures: "",
      partiesInvolved: "",
      safeguards: "",
      internationalTransfers: "",
    },
    monitoring: {
      efficiency: "",
      bottlenecks: "",
      errorRate: "",
      qualityMetric: "",
    },
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("dataFlow.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        dataFlow: { ...formData.dataFlow, [field]: value },
      });
    } else if (name.startsWith("compliancePrinciples.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        compliancePrinciples: {
          ...formData.compliancePrinciples,
          [field]: value,
        },
      });
    } else if (name.startsWith("necessityProportionality.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        necessityProportionality: {
          ...formData.necessityProportionality,
          [field]: value,
        },
      });
    } else if (name.startsWith("monitoring.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        monitoring: { ...formData.monitoring, [field]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post("http://localhost:8080/api/processes", formData);
        navigate("/dashboard");
      } catch (error) {
        console.error("Error creating process:", error);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Process name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.dataFlow.source) newErrors.source = "Data source is required";
    if (!formData.dataFlow.collectionMethod)
      newErrors.collectionMethod = "Collection method is required";
    if (!formData.dataFlow.storageLocation)
      newErrors.storageLocation = "Storage location is required";
    if (!formData.dataFlow.storageDuration)
      newErrors.storageDuration = "Storage duration is required";
    if (!formData.dataFlow.processingExtent)
      newErrors.processingExtent = "Processing extent is required";
    if (!formData.dataFlow.transferDestination)
      newErrors.transferDestination = "Transfer destination is required";
    if (!formData.dataFlow.affectedIndividuals)
      newErrors.affectedIndividuals = "Affected individuals is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Process</h2>
        <form onSubmit={handleSubmit}>
          <h3>Specific Data Section</h3>
          <div className="form-group">
            <label htmlFor="name">Process Name</label>
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
            <label htmlFor="description">Process Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>
          <h4>Describe the Information Flow</h4>
          <div className="form-group">
            <label htmlFor="dataFlow.source">
              Where are you getting the data from?
            </label>
            <input
              type="text"
              id="dataFlow.source"
              name="dataFlow.source"
              value={formData.dataFlow.source}
              onChange={handleChange}
              required
            />
            {errors.source && <p className="error">{errors.source}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="dataFlow.collectionMethod">
              How is the data being collected?
            </label>
            <input
              type="text"
              id="dataFlow.collectionMethod"
              name="dataFlow.collectionMethod"
              value={formData.dataFlow.collectionMethod}
              onChange={handleChange}
              required
            />
            {errors.collectionMethod && (
              <p className="error">{errors.collectionMethod}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="dataFlow.storageLocation">
              Where will the data be stored?
            </label>
            <input
              type="text"
              id="dataFlow.storageLocation"
              name="dataFlow.storageLocation"
              value={formData.dataFlow.storageLocation}
              onChange={handleChange}
              required
            />
            {errors.storageLocation && (
              <p className="error">{errors.storageLocation}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="dataFlow.storageDuration">
              How long will the data be stored?
            </label>
            <input
              type="text"
              id="dataFlow.storageDuration"
              name="dataFlow.storageDuration"
              value={formData.dataFlow.storageDuration}
              onChange={handleChange}
              required
            />
            {errors.storageDuration && (
              <p className="error">{errors.storageDuration}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="dataFlow.processingExtent">
              To what extent is the data being processed?
            </label>
            <input
              type="text"
              id="dataFlow.processingExtent"
              name="dataFlow.processingExtent"
              value={formData.dataFlow.processingExtent}
              onChange={handleChange}
              required
            />
            {errors.processingExtent && (
              <p className="error">{errors.processingExtent}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="dataFlow.transferDestination">
              Where will the data be transferred to?
            </label>
            <input
              type="text"
              id="dataFlow.transferDestination"
              name="dataFlow.transferDestination"
              value={formData.dataFlow.transferDestination}
              onChange={handleChange}
              required
            />
            {errors.transferDestination && (
              <p className="error">{errors.transferDestination}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="dataFlow.affectedIndividuals">
              How many individuals are likely to be affected?
            </label>
            <input
              type="number"
              id="dataFlow.affectedIndividuals"
              name="dataFlow.affectedIndividuals"
              value={formData.dataFlow.affectedIndividuals}
              onChange={handleChange}
              required
            />
            {errors.affectedIndividuals && (
              <p className="error">{errors.affectedIndividuals}</p>
            )}
          </div>
          <h4>
            Describe how the data processing flow complies with the seven data
            protection principles:
          </h4>
          <div className="form-group">
            <label htmlFor="compliancePrinciples.lawfulness">Lawfulness</label>
            <textarea
              id="compliancePrinciples.lawfulness"
              name="compliancePrinciples.lawfulness"
              value={formData.compliancePrinciples.lawfulness}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="compliancePrinciples.fairness">Fairness</label>
            <textarea
              id="compliancePrinciples.fairness"
              name="compliancePrinciples.fairness"
              value={formData.compliancePrinciples.fairness}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="compliancePrinciples.transparency">
              Transparency
            </label>
            <textarea
              id="compliancePrinciples.transparency"
              name="compliancePrinciples.transparency"
              value={formData.compliancePrinciples.transparency}
              onChange={handleChange}
            />
          </div>
          <h4>
            Describe how/if the data shall only be used for the purpose for
            which it is being collected:
          </h4>
          <div className="form-group">
            <label htmlFor="compliancePrinciples.purposeLimitation">
              Purpose Limitation
            </label>
            <textarea
              id="compliancePrinciples.purposeLimitation"
              name="compliancePrinciples.purposeLimitation"
              value={formData.compliancePrinciples.purposeLimitation}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="compliancePrinciples.dataMinimisation">
              Data Minimisation
            </label>
            <textarea
              id="compliancePrinciples.dataMinimisation"
              name="compliancePrinciples.dataMinimisation"
              value={formData.compliancePrinciples.dataMinimisation}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="compliancePrinciples.dataAccuracy">
              Data Accuracy
            </label>
            <textarea
              id="compliancePrinciples.dataAccuracy"
              name="compliancePrinciples.dataAccuracy"
              value={formData.compliancePrinciples.dataAccuracy}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="compliancePrinciples.storageLimitation">
              Storage Limitation
            </label>
            <textarea
              id="compliancePrinciples.storageLimitation"
              name="compliancePrinciples.storageLimitation"
              value={formData.compliancePrinciples.storageLimitation}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="compliancePrinciples.integrityConfidentiality">
              Integrity and Confidentiality
            </label>
            <textarea
              id="compliancePrinciples.integrityConfidentiality"
              name="compliancePrinciples.integrityConfidentiality"
              value={formData.compliancePrinciples.integrityConfidentiality}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="compliancePrinciples.accountability">
              Accountability
            </label>
            <textarea
              id="compliancePrinciples.accountability"
              name="compliancePrinciples.accountability"
              value={formData.compliancePrinciples.accountability}
              onChange={handleChange}
            />
          </div>
          <h3>Part 2</h3>
          <div className="form-group">
            <label htmlFor="necessityProportionality.assessment">
              Assessment of necessity and proportionality
            </label>
            <textarea
              id="necessityProportionality.assessment"
              name="necessityProportionality.assessment"
              value={formData.necessityProportionality.assessment}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="necessityProportionality.lawfulBasis">
              What is your lawful basis for processing?
            </label>
            <textarea
              id="necessityProportionality.lawfulBasis"
              name="necessityProportionality.lawfulBasis"
              value={formData.necessityProportionality.lawfulBasis}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="necessityProportionality.consent">
              How is consent to be obtained, if at all?
            </label>
            <textarea
              id="necessityProportionality.consent"
              name="necessityProportionality.consent"
              value={formData.necessityProportionality.consent}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="necessityProportionality.achievesPurpose">
              Does the processing actually achieve your purpose?
            </label>
            <textarea
              id="necessityProportionality.achievesPurpose"
              name="necessityProportionality.achievesPurpose"
              value={formData.necessityProportionality.achievesPurpose}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="necessityProportionality.alternativeMethods">
              Is there another way to achieve the same outcome?
            </label>
            <textarea
              id="necessityProportionality.alternativeMethods"
              name="necessityProportionality.alternativeMethods"
              value={formData.necessityProportionality.alternativeMethods}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="necessityProportionality.dataQualityMinimisation">
              How will you ensure data quality and data minimization?
            </label>
            <textarea
              id="necessityProportionality.dataQualityMinimisation"
              name="necessityProportionality.dataQualityMinimisation"
              value={formData.necessityProportionality.dataQualityMinimisation}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="necessityProportionality.informationToIndividuals">
              What information will you give individuals?
            </label>
            <textarea
              id="necessityProportionality.informationToIndividuals"
              name="necessityProportionality.informationToIndividuals"
              value={formData.necessityProportionality.informationToIndividuals}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="necessityProportionality.supportRights">
              How will you help to support their rights?
            </label>
            <textarea
              id="necessityProportionality.supportRights"
              name="necessityProportionality.supportRights"
              value={formData.necessityProportionality.supportRights}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="necessityProportionality.complianceMeasures">
              What measures do you take to ensure compliance by the data
              controller or data processor?
            </label>
            <textarea
              id="necessityProportionality.complianceMeasures"
              name="necessityProportionality.complianceMeasures"
              value={formData.necessityProportionality.complianceMeasures}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="necessityProportionality.partiesInvolved">
              What parties are involved in the processing and what are their
              specific roles?
            </label>
            <textarea
              id="necessityProportionality.partiesInvolved"
              name="necessityProportionality.partiesInvolved"
              value={formData.necessityProportionality.partiesInvolved}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="necessityProportionality.safeguards">
              How do you safeguard the processing of the personal data?
            </label>
            <textarea
              id="necessityProportionality.safeguards"
              name="necessityProportionality.safeguards"
              value={formData.necessityProportionality.safeguards}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="necessityProportionality.internationalTransfers">
              How do you safeguard any international transfers?
            </label>
            <textarea
              id="necessityProportionality.internationalTransfers"
              name="necessityProportionality.internationalTransfers"
              value={formData.necessityProportionality.internationalTransfers}
              onChange={handleChange}
            />
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

export default CreateProcess;

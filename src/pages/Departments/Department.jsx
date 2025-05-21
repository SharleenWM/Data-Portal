import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Department = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleCreateDepartment = () => {
    navigate("/create-department");
  };

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch(`${API_URL}/departments`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || "Failed to fetch departments");
        setDepartments(data.data || data); // Support both array or paginated format
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

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

      {loading && <p>Loading departments...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && departments.length === 0 && (
        <p>No departments available.</p>
      )}

      <div className="departments-grid">
        {departments.map((dept) => (
          <div key={dept.id} className="department-card">
            <div className="department-header">
              <h3>{dept.name}</h3>
            </div>

            <div className="department-info">
              <p>
                <strong>Description:</strong> {dept.description}
              </p>
              <p>
                <strong>Slug:</strong> {dept.slug}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Department;

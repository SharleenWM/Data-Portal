import React, { useState } from "react";
// import logo from "./assets/data-guardian-logo.png";

const AuthForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    organization: "",
    role: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!isLogin && !formData.organization) {
      newErrors.organization = "Organization name is required";
    }
    if (!isLogin && !formData.role) {
      newErrors.role = "Role is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        onLogin(formData); // Trigger login
      } else {
        console.log("Registering:", formData);
        // Simulate registration success and switch to login
        setIsLogin(true);
        setFormData({ email: "", password: "", organization: "", role: "" });
        setErrors({});
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* <img src={logo} alt="Data Guardian Logo" className="auth-logo" /> */}
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="organization">Organization</label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                />
                {errors.organization && (
                  <p className="error">{errors.organization}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Data Protection Officer">
                    Data Protection Officer
                  </option>
                  <option value="Data Steward">Data Steward</option>
                  <option value="Risk Analyst">Risk Analyst</option>
                  <option value="auditor">Auditor</option>
                </select>
                {errors.role && <p className="error">{errors.role}</p>}
              </div>
            </>
          )}
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        <p className="toggle-link">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button type="button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;

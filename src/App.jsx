// import React, { useState } from "react";
// import "./App.css";

// const AuthForm = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     organization: "",
//     role: "",
//   });
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters";
//     }
//     if (!isLogin && !formData.organization) {
//       newErrors.organization = "Organization name is required";
//     }
//     if (!isLogin && !formData.role) {
//       newErrors.role = "Role is required";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log("Submitting:", { ...formData });
//       setFormData({ email: "", password: "", organization: "", role: "" });
//       setErrors({});
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="container">
//       <h2>{isLogin ? "Login" : "Register"}</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           {errors.email && <p className="error">{errors.email}</p>}
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           {errors.password && <p className="error">{errors.password}</p>}
//         </div>
//         {!isLogin && (
//           <>
//             <div className="form-group">
//               <label>Organization</label>
//               <input
//                 type="text"
//                 name="organization"
//                 value={formData.organization}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.organization && (
//                 <p className="error">{errors.organization}</p>
//               )}
//             </div>
//             <div className="form-group">
//               <label>Role</label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Role</option>
//                 <option value="fintech">Fintech Firm</option>
//                 <option value="regulator">Regulator</option>
//                 <option value="auditor">Auditor</option>
//               </select>
//               {errors.role && <p className="error">{errors.role}</p>}
//             </div>
//           </>
//         )}
//         <button type="submit">{isLogin ? "Login" : "Register"}</button>
//       </form>
//       <p className="toggle-link">
//         {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//         <button onClick={() => setIsLogin(!isLogin)}>
//           {isLogin ? "Register" : "Login"}
//         </button>
//       </p>
//     </div>
//   );
// };

// export default AuthForm;
// import React, { useState } from "react";
// import "./App.css";

// const AuthForm = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     organization: "",
//     role: "",
//   });
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters";
//     }
//     if (!isLogin && !formData.organization) {
//       newErrors.organization = "Organization name is required";
//     }
//     if (!isLogin && !formData.role) {
//       newErrors.role = "Role is required";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log("Submitting:", { ...formData });
//       setFormData({ email: "", password: "", organization: "", role: "" });
//       setErrors({});
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>{isLogin ? "Login" : "Register"}</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             {errors.email && <p className="error">{errors.email}</p>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             {errors.password && <p className="error">{errors.password}</p>}
//           </div>
//           {!isLogin && (
//             <>
//               <div className="form-group">
//                 <label htmlFor="organization">Organization</label>
//                 <input
//                   type="text"
//                   id="organization"
//                   name="organization"
//                   value={formData.organization}
//                   onChange={handleChange}
//                   required
//                 />
//                 {errors.organization && (
//                   <p className="error">{errors.organization}</p>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="role">Role</label>
//                 <select
//                   id="role"
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Role</option>
//                   <option value="fintech">Fintech Firm</option>
//                   <option value="regulator">Regulator</option>
//                   <option value="auditor">Auditor</option>
//                 </select>
//                 {errors.role && <p className="error">{errors.role}</p>}
//               </div>
//             </>
//           )}
//           <button type="submit">{isLogin ? "Login" : "Register"}</button>
//         </form>
//         <p className="toggle-link">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//           <button type="button" onClick={() => setIsLogin(!isLogin)}>
//             {isLogin ? "Register" : "Login"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;
// import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import AuthForm from "./Auth/AuthForm.jsx";
// import Dashboard from "./Dashboard";
// import "./App.css";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLogin = (formData) => {
//     // Simulate successful login (in production, validate with a backend API)
//     console.log("Logging in with:", formData);
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             isAuthenticated ? (
//               <Navigate to="/dashboard" />
//             ) : (
//               <AuthForm onLogin={handleLogin} />
//             )
//           }
//         />
//         <Route
//           path="/dashboard"
//           element={
//             isAuthenticated ? (
//               <Dashboard onLogout={handleLogout} />
//             ) : (
//               <Navigate to="/" />
//             )
//           }
//         />
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import LandingPage from "./pages/Landinggpage.jsx";
import AuthForm from "./Auth/AuthForm.jsx";
import Dashboard from "./Dashboard";
import CreateDepartment from "./pages/Departments/CreateDepartment.jsx";
import CreateProject from "./pages/Projects/CreateProjects.jsx";
import CreateProcess from "./pages/Processes/CreateProcess.jsx";
import CreateRisk from "./pages/Risks/CreateRisk.jsx";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (formData) => {
    console.log("Logging in with:", formData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Root path - redirect to auth */}
        <Route path="/" element={<Navigate to="/auth" />} />

        {/* Auth route - accessible to non-authenticated users */}
        <Route
          path="/auth"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <AuthForm onLogin={handleLogin} />
            )
          }
        />

        {/* Dashboard route - protected */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />

        {/* Protected routes */}
        <Route
          path="/create-department"
          element={
            isAuthenticated ? <CreateDepartment /> : <Navigate to="/auth" />
          }
        />
        <Route
          path="/create-project"
          element={
            isAuthenticated ? <CreateProject /> : <Navigate to="/auth" />
          }
        />
        <Route
          path="/create-process"
          element={
            isAuthenticated ? <CreateProcess /> : <Navigate to="/auth" />
          }
        />
        <Route
          path="/create-risk"
          element={isAuthenticated ? <CreateRisk /> : <Navigate to="/auth" />}
        />

        {/* Catch-all route - redirect to auth */}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
};

export default App;

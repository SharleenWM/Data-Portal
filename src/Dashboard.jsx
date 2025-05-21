// import React, { useState } from "react";
// import logo from "./assets/data-guardian-logo.png";
// import Department from "./pages/Department/Department";
// const Dashboard = ({ onLogout }) => {
//   const [activeSection, setActiveSection] = useState("Departments");

//   const sections = {
//     Departments: (
//       <div>
//         <h3>Departments</h3>
//         <p>View and manage departments within the fintech data repository.</p>
//         <ul>
//           <li>Finance</li>
//           <li>Compliance</li>
//           <li>IT</li>
//         </ul>
//       </div>
//     ),
//     Projects: (
//       <div>
//         <h3>Projects</h3>
//         <p>Track ongoing projects and their timelines.</p>
//         <ul>
//           <li>Data Integration Q2 2025</li>
//           <li>Compliance Audit Tool</li>
//         </ul>
//       </div>
//     ),
//     Processes: (
//       <div>
//         <h3>Processes</h3>
//         <p>Monitor data processes and workflows.</p>
//         <ul>
//           <li>Data Validation</li>
//           <li>Risk Analysis</li>
//         </ul>
//       </div>
//     ),
//     Reports: (
//       <div>
//         <h3>Reports</h3>
//         <p>Access compliance reports and performance metrics.</p>
//         <ul>
//           <li>DPA Compliance Report</li>
//           <li>Industry Benchmark Q1 2025</li>
//         </ul>
//       </div>
//     ),
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="sidebar">
//         <div className="sidebar-header">
//           <img src={logo} alt="Data Guardian Logo" className="sidebar-logo" />
//         </div>
//         <nav className="sidebar-nav">
//           {Object.keys(sections).map((section) => (
//             <button
//               key={section}
//               className={`sidebar-item ${
//                 activeSection === section ? "active" : ""
//               }`}
//               onClick={() => setActiveSection(section)}
//             >
//               {section}
//             </button>
//           ))}
//         </nav>
//         <button className="logout-button" onClick={onLogout}>
//           Logout
//         </button>
//       </div>
//       <div className="main-content">
//         <header className="dashboard-header">
//           <h2>Welcome to Data Guardian</h2>
//         </header>
//         <div className="content-section">{sections[activeSection]}</div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// import React, { useState } from "react";
// import logo from "./assets/data-guardian-logo.png";
// import Department from "./pages/Department/Department";

// const Dashboard = ({ onLogout }) => {
//   const [activeSection, setActiveSection] = useState("Departments");

//   const sections = {
//     Departments: <Department />,
//     Projects: (
//       <div>
//         <h3>Projects</h3>
//         <p>Track ongoing projects and their timelines.</p>
//         <ul>
//           <li>Data Integration Q2 2025</li>
//           <li>Compliance Audit Tool</li>
//         </ul>
//       </div>
//     ),
//     Processes: (
//       <div>
//         <h3>Processes</h3>
//         <p>Monitor data processes and workflows.</p>
//         <ul>
//           <li>Data Validation</li>
//           <li>Risk Analysis</li>
//         </ul>
//       </div>
//     ),
//     Reports: (
//       <div>
//         <h3>Reports</h3>
//         <p>Access compliance reports and performance metrics.</p>
//         <ul>
//           <li>DPA Compliance Report</li>
//           <li>Industry Benchmark Q1 2025</li>
//         </ul>
//       </div>
//     ),
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="sidebar">
//         <div className="sidebar-header">
//           <img src={logo} alt="Data Guardian Logo" className="sidebar-logo" />
//         </div>
//         <nav className="sidebar-nav">
//           {Object.keys(sections).map((section) => (
//             <button
//               key={section}
//               className={`sidebar-item ${
//                 activeSection === section ? "active" : ""
//               }`}
//               onClick={() => setActiveSection(section)}
//             >
//               {section}
//             </button>
//           ))}
//         </nav>
//         <button className="logout-button" onClick={onLogout}>
//           Logout
//         </button>
//       </div>
//       <div className="main-content">
//         <header className="dashboard-header">
//           <h2>Welcome to Data Guardian</h2>
//         </header>
//         <div className="content-section">{sections[activeSection]}</div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// import React, { useState } from "react";
// import logo from "./assets/data-guardian-logo.png";
// import Department from "./pages/Departments/Department.jsx";
// import MainDashboard from "./MainDashboard";
// import ProjectDashboard from "./pages/Projects/ProjectDashboard.jsx";

// const Dashboard = ({ onLogout }) => {
//   const [activeSection, setActiveSection] = useState("Main");

//   const sections = {
//     Main: <MainDashboard />,
//     Departments: <Department />,
//     Projects: <ProjectDashboard />,
//     Processes: (
//       <div>
//         <h3>Processes</h3>
//         <p>Monitor data processes and workflows.</p>
//         <ul>
//           <li>Data Validation</li>
//           <li>Risk Analysis</li>
//         </ul>
//       </div>
//     ),
//     Reports: (
//       <div>
//         <h3>Reports</h3>
//         <p>Access compliance reports and performance metrics.</p>
//         <ul>
//           <li>DPA Compliance Report</li>
//           <li>Industry Benchmark Q1 2025</li>
//         </ul>
//       </div>
//     ),
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="sidebar">
//         <div className="sidebar-header">
//           <img src={logo} alt="Data Guardian Logo" className="sidebar-logo" />
//         </div>
//         <nav className="sidebar-nav">
//           {Object.keys(sections).map((section) => (
//             <button
//               key={section}
//               className={`sidebar-item ${
//                 activeSection === section ? "active" : ""
//               }`}
//               onClick={() => setActiveSection(section)}
//             >
//               {section}
//             </button>
//           ))}
//         </nav>
//         <button className="logout-button" onClick={onLogout}>
//           Logout
//         </button>
//       </div>
//       <div className="main-content">
//         <header className="dashboard-header">
//           <h2>Welcome to Data Guardian</h2>
//         </header>
//         <div className="content-section">{sections[activeSection]}</div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState } from "react";

import Department from "./pages/Departments/Department.jsx";
import MainDashboard from "./MainDashboard";
import ProjectDashboard from "./pages/Projects/ProjectDashboard.jsx";
import ProcessDashboard from "./pages/Processes/ProcessDashboard.jsx";
import RiskDashboard from "./pages/Risks/RiskDashboard.jsx";
import ReportDashboard from "./pages/Reports/ReportDashboard.jsx";

const Dashboard = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState("Main");

  const sections = {
    Main: <MainDashboard />,
    Departments: <Department />,
    Projects: <ProjectDashboard />,
    Processes: <ProcessDashboard />,
    Risks: <RiskDashboard />,
    Reports: <ReportDashboard />,
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">Data Guardian</h1>
        </div>
        <nav className="sidebar-nav">
          {Object.keys(sections).map((section) => (
            <button
              key={section}
              className={`sidebar-item ${
                activeSection === section ? "active" : ""
              }`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </button>
          ))}
        </nav>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
      <div className="main-content">
        <header className="dashboard-header">
          <h2>Welcome to Data Guardian</h2>
        </header>
        <div className="content-section">{sections[activeSection]}</div>
      </div>
    </div>
  );
};

export default Dashboard;

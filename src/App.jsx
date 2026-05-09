import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
// 引入各個主題的進入點元件
import Introduction from './Introduction/Introduction';
import About from './About/About';
import Functions from './Functions/Functions';
import Limits from './Limits/Limits';
import Continuity from './Continuity/Continuity';
import Derivatives from './Derivatives/Derivatives';
import DerivativesApps from './DerivativesApps/DerivativesApps';
import Integrals from './Integrals/Integrals';
import Techniques from './Techniques/Techniques';
import IntegralsApps from './IntegralsApps/IntegralsApps';
import Reference from './Reference/Reference';
import ScrollToHashElement from './components/ScrollToHash';




// 網站識別標誌 (Sigma 圖案)
function LogoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24" style={{ marginRight: '10px', borderRadius: '6px', flexShrink: 0 }}>
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="128" fill="url(#logoGrad)" />
      <path d="M160 120 L352 120 L192 256 L352 392 L160 392" fill="none" stroke="white" strokeWidth="48" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function App() {
  return (
    <div className="app-container">
      <ScrollToHashElement />

      <nav className="sidebar open">
        <div className="sidebar-header">
          <LogoIcon />
          <h2 className="sidebar-title">微積分參考手冊</h2>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""} end>
              歡迎使用
            </NavLink>
          </li>
          <li>
            <NavLink to="/introduction" className={({ isActive }) => isActive ? "active-link" : ""}>
              第零章：微積分簡介
            </NavLink>
          </li>
          <li>
            <NavLink to="/functions" className={({ isActive }) => isActive ? "active-link" : ""}>
              第一章：函數介紹
            </NavLink>
          </li>
          <li>
            <NavLink to="/limits" className={({ isActive }) => isActive ? "active-link" : ""}>
              第二章：極限
            </NavLink>
          </li>
          <li>
            <NavLink to="/continuity" className={({ isActive }) => isActive ? "active-link" : ""}>
              第三章：連續
            </NavLink>
          </li>
          <li>
            <NavLink to="/derivatives" className={({ isActive }) => isActive ? "active-link" : ""}>
              第四章：導數與微分
            </NavLink>
          </li>
          <li>
            <NavLink to="/derivatives-apps" className={({ isActive }) => isActive ? "active-link" : ""}>
              第五章：微分的應用
            </NavLink>
          </li>
          <li>
            <NavLink to="/integrals" className={({ isActive }) => isActive ? "active-link" : ""}>
              第六章：反導數與積分
            </NavLink>
          </li>
          <li>
            <NavLink to="/techniques" className={({ isActive }) => isActive ? "active-link" : ""}>
              第七章：積分技巧
            </NavLink>
          </li>
          <li>
            <NavLink to="/integrals-apps" className={({ isActive }) => isActive ? "active-link" : ""}>
              第八章：積分的應用
            </NavLink>
          </li>
          <li>
            <NavLink to="/reference" className={({ isActive }) => isActive ? "active-link" : ""}>
              第九章：公式表 / 題庫
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* 右側主要內容區 */}
      <main className="main-content">
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/functions" element={<Functions />} />
            <Route path="/limits" element={<Limits />} />
            <Route path="/continuity" element={<Continuity />} />
            <Route path="/derivatives" element={<Derivatives />} />
            <Route path="/derivatives-apps" element={<DerivativesApps />} />
            <Route path="/integrals" element={<Integrals />} />
            <Route path="/techniques" element={<Techniques />} />
            <Route path="/integrals-apps" element={<IntegralsApps />} />
            <Route path="/reference" element={<Reference />} />

          </Routes>
        </div>
      </main>

    </div>
  );
}
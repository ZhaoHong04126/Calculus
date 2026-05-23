import React, { useState, useEffect } from 'react';
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
import ImproperIntegrals from './ImproperIntegrals/ImproperIntegrals';
import ScrollToHashElement from './components/ScrollToHash';

function SidebarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  );
}

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="app-container">
      <ScrollToHashElement />

      {/* 手機版：若側邊欄開啟，顯示半透明黑色遮罩 */}
      {isSidebarOpen && window.innerWidth < 768 && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* 手機版：浮動開啟按鈕 (漢堡選單) */}
      {!isSidebarOpen && (
        <button className="mobile-open-btn" onClick={toggleSidebar} title="展開選單" aria-label="展開選單">
          <SidebarIcon />
        </button>
      )}

      <nav className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <LogoIcon />
          <h2 className="sidebar-title">微積分參考手冊</h2>
          {/* 在小螢幕上可以顯示一個關閉按鈕 */}
          {window.innerWidth < 768 && (
            <button className="sidebar-toggle-btn" onClick={toggleSidebar} title="隱藏選單" aria-label="隱藏選單">
              ✖
            </button>
          )}
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/" onClick={closeSidebarOnMobile} className={({ isActive }) => isActive ? "active-link" : ""} end>
              歡迎使用
            </NavLink>
          </li>
          <li>
            <NavLink to="/introduction" onClick={closeSidebarOnMobile} className={({ isActive }) => isActive ? "active-link" : ""}>
              第零章：微積分簡介
            </NavLink>
          </li>
          <li>
            <NavLink to="/functions" onClick={closeSidebarOnMobile} className={({ isActive }) => isActive ? "active-link" : ""}>
              第一章：函數介紹
            </NavLink>
          </li>
          <li>
            <NavLink to="/limits" onClick={closeSidebarOnMobile} className={({ isActive }) => isActive ? "active-link" : ""}>
              第二章：極限
            </NavLink>
          </li>
          <li>
            <NavLink to="/continuity" onClick={closeSidebarOnMobile} className={({ isActive }) => isActive ? "active-link" : ""}>
              第三章：連續
            </NavLink>
          </li>
          <li>
            <NavLink to="/derivatives" onClick={closeSidebarOnMobile} className={({ isActive }) => isActive ? "active-link" : ""}>
              第四章：導數與微分
            </NavLink>
          </li>
          <li>
            <NavLink to="/derivatives-apps" onClick={closeSidebarOnMobile} className={({ isActive }) => isActive ? "active-link" : ""}>
              第五章：微分的應用
            </NavLink>
          </li>
          <li>
            <NavLink to="/integrals" onClick={closeSidebarOnMobile} className={({ isActive }) => isActive ? "active-link" : ""}>
              第六章：反導數與積分
            </NavLink>
          </li>
          <li>
            <NavLink to="/techniques" onClick={closeSidebarOnMobile} className={({ isActive }) => isActive ? "active-link" : ""}>
              第七章：積分技巧
            </NavLink>
          </li>
          <li>
            <NavLink to="/integrals-apps" onClick={closeSidebarOnMobile} className={({ isActive }) => isActive ? "active-link" : ""}>
              第八章：積分的應用
            </NavLink>
          </li>
          <li>
            <NavLink to="/reference" onClick={closeSidebarOnMobile} className={({ isActive }) => isActive ? "active-link" : ""}>
              第九章：公式表 / 題庫
            </NavLink>
          </li>
          <li>
            <NavLink to="/improper-integrals" onClick={closeSidebarOnMobile} className={({ isActive }) => isActive ? "active-link" : ""}>
              第十章：瑕積分
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
            <Route path="/improper-integrals" element={<ImproperIntegrals />} />
          </Routes>
        </div>
      </main>

    </div>
  );
}
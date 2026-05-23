// src/IntegralsApps/IntegralsApps.jsx
import React from 'react';
import AreaBetweenCurves from './AreaBetweenCurves';
import VolumeSolids from './VolumeSolids';
import ArcLength from './ArcLength';
import SectionNav from '../components/SectionNav';
import './IntegralsApps.css';

export default function IntegralsApps() {
  const sections = [
    { id: 'area', title: '兩曲線間的面積' },
    { id: 'volume', title: '旋轉體體積' },
    { id: 'arc-length', title: '弧長與旋轉曲面積' },
  ];

  return (
    <div className="topic-content">
      <header className="topic-header">
        <h1 className="topic-title">第八章：積分的應用</h1>
        <p className="text-lg mt-2 text-gray-600">
          探索定積分如何解決平面面積、旋轉體體積、曲線長度以及三維曲面積等幾何量測問題。
        </p>
      </header>

      <SectionNav sections={sections} />

      <div id="area">
        <AreaBetweenCurves />
      </div>

      <div id="volume">
        <VolumeSolids />
      </div>

      <div id="arc-length">
        <ArcLength />
      </div>
    </div>
  );
}

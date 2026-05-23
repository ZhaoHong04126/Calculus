// src/IntegralsApps/ArcLength.jsx
import React, { useState, useMemo } from 'react';
import { InlineMath, BlockMath } from '../components/Math';
import './IntegralsApps.css';

// 預設函數設定 (定義在元件外部以保持 reference 穩定，避免 React Compiler 警告)
const presetData = {
  f: (x) => (x * x * x) / 6 + 1 / (2 * x),
  fLaTeX: 'f(x) = \\frac{x^3}{6} + \\frac{1}{2x}',
  fLabel: 'f(x) = x³/6 + 1/(2x)',
  derivLaTeX: "f'(x) = \\frac{x^2}{2} - \\frac{1}{2x^2}",
  a: 1.0,
  b: 3.0,
  xMin: 0.5,
  xMax: 3.5,
  yMin: 0.0,
  yMax: 5.0,
  exactLength: 14 / 3, // 4.66666...
  title: 'f(x) = x³/6 + 1/(2x) 區間 [1, 3]',
};

// SVG 繪圖大小與坐標系轉換
const width = 400;
const height = 300;
const { xMin, xMax, yMin, yMax, a, b, f, exactLength } = presetData;

const mapX = (x) => ((x - xMin) / (xMax - xMin)) * width;
const mapY = (y) => height - ((y - yMin) / (yMax - yMin)) * height;

const originX = mapX(0);
const originY = mapY(0);

// 繪製函數平滑曲線 (靜態計算)
const curvePath = (() => {
  let d = '';
  const steps = 60;
  const stepSize = (b - a) / steps;
  for (let i = 0; i <= steps; i++) {
    const x = a + i * stepSize;
    const y = f(x);
    const px = mapX(x);
    const py = mapY(y);
    if (i === 0) d += `M ${px} ${py}`;
    else d += `L ${px} ${py}`;
  }
  return d;
})();

// 坐標軸刻度 (靜態計算)
const ticks = (() => {
  const xTicks = [];
  const yTicks = [];
  for (let x = Math.ceil(xMin); x <= xMax; x++) {
    xTicks.push(x);
  }
  for (let y = Math.ceil(yMin); y <= yMax; y++) {
    yTicks.push(y);
  }
  return { xTicks, yTicks };
})();

// 可摺疊解題過程元件
const SolutionBox = ({ children }) => (
  <details className="proof-box">
    <summary>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '8px', fontSize: '18px' }}>✏️</span>
        查看解題過程
      </div>
      <div>
        <span className="proof-toggle-btn expand-text">展開 ▼</span>
        <span className="proof-toggle-btn collapse-text">收起 ▲</span>
      </div>
    </summary>
    <div className="proof-content">{children}</div>
  </details>
);

export default function ArcLength() {
  const [segmentsCount, setSegmentsCount] = useState(4); // n 分割數 (1 ~ 20)

  // 計算逼近折線的頂點
  const polygonPoints = useMemo(() => {
    const pts = [];
    const stepSize = (b - a) / segmentsCount;
    for (let i = 0; i <= segmentsCount; i++) {
      const x = a + i * stepSize;
      const y = f(x);
      pts.push({ x, y, px: mapX(x), py: mapY(y) });
    }
    return pts;
  }, [segmentsCount]);

  // 計算折線段總長度
  const approxLength = useMemo(() => {
    let sum = 0;
    for (let i = 1; i < polygonPoints.length; i++) {
      const p1 = polygonPoints[i - 1];
      const p2 = polygonPoints[i];
      const dist = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
      sum += dist;
    }
    return sum;
  }, [polygonPoints]);

  return (
    <section className="subsection mt-12 pt-8 border-t border-gray-100">
      <h2 className="section-title text-2xl font-bold mb-4 border-b-2 border-indigo-500 pb-2">
        3. 弧長與旋轉曲面積 (Arc Length and Surface Area)
      </h2>

      <p className="mb-6 text-gray-700 leading-relaxed">
        微積分除了計算二維面積與三維體積，還能精確測量一維彎曲函數曲線的<strong>長度 (弧長)</strong> 以及將曲線旋轉得到的<strong>三維表面積</strong>。
        我們透過將曲線分成無數段微小的直切線段（微元 <InlineMath math="ds" />），利用畢氏定理求出每一段的長度，並利用定積分進行累加。
      </p>

      {/* 3.1 定義與公式 */}
      <div className="math-box mb-8 p-6 bg-indigo-50 rounded-lg shadow-sm border border-indigo-100">
        <h3 className="text-xl font-bold mb-4 text-indigo-800 flex items-center">
          <span className="mr-2">📐</span> 3.1 核心積分公式
        </h3>

        <div className="space-y-4">
          <div className="p-4 bg-white rounded border border-indigo-200">
            <h4 className="font-bold text-indigo-900 mb-1">① 弧長公式 (Arc Length)：</h4>
            <p className="text-sm text-gray-700 mb-2">
              若函數 <InlineMath math="y = f(x)" /> 在區間 <InlineMath math="[a, b]" /> 上具有連續的導數，則其曲線弧長 <InlineMath math="L" /> 為：
            </p>
            <BlockMath math="L = \int_{a}^{b} ds = \int_{a}^{b} \sqrt{1 + \left[ f'(x) \right]^2} \, dx" />
            <p className="text-xs text-gray-500 mt-2">
              💡 幾何直覺：在無限小尺度下，斜邊微元 <InlineMath math="ds = \sqrt{dx^2 + dy^2} = \sqrt{1 + (dy/dx)^2} \, dx" />。
            </p>
          </div>

          <div className="p-4 bg-white rounded border border-indigo-200">
            <h4 className="font-bold text-indigo-900 mb-1">② 旋轉表面積公式 (Surface Area of Revolution)：</h4>
            <p className="text-sm text-gray-700 mb-2">
              將 <InlineMath math="y = f(x) \ge 0" /> 繞 <InlineMath math="x" /> 軸旋轉所生成的旋轉曲面表面積 <InlineMath math="S" /> 為：
            </p>
            <BlockMath math="S = \int_{a}^{b} 2\pi y \, ds = \int_{a}^{b} 2\pi f(x) \sqrt{1 + \left[ f'(x) \right]^2} \, dx" />
            <p className="text-xs text-gray-500 mt-2">
              💡 幾何直覺：切片帶狀表面積 ＝ 圓周長 <InlineMath math="2\pi r" /> 乘以斜寬度 <InlineMath math="ds" />。
            </p>
          </div>
        </div>
      </div>

      {/* 3.2 互動式分割逼近 */}
      <div className="math-box mb-8 p-6 bg-slate-50 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold mb-3 text-slate-800 flex items-center">
          <span className="mr-2">🕹️</span> 3.2 折線逼近弧長模擬器 (Riemann Arc Length)
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          調整下方的<strong>分割段數 n</strong>，觀察代表折線（紅色）如何逼近真實函數曲線（藍色）。
          隨著分割數 <InlineMath math="n \to \infty" />，折線段總長會逐漸增加並收斂至真實的積分弧長。
        </p>

        <div className="interactive-container">
          {/* 左側：SVG */}
          <div className="canvas-wrapper" style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
              {/* 逼近圖形 */}
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span className="value-title" style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#94a3b8', alignSelf: 'flex-start' }}>
                  逼近圖形
                </span>
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ display: 'block', width: '100%', maxWidth: '320px', height: 'auto' }}>
                  <defs>
                    <pattern id="grid-arc" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f8fafc" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-arc)" />

                  {/* 坐標軸 */}
                  {originY >= 0 && originY <= height && (
                    <line x1={0} y1={originY} x2={width} y2={originY} stroke="#cbd5e1" strokeWidth="1.5" />
                  )}
                  {originX >= 0 && originX <= width && (
                    <line x1={originX} y1={0} x2={originX} y2={height} stroke="#cbd5e1" strokeWidth="1.5" />
                  )}

                  {/* 軸刻度 */}
                  {ticks.xTicks.map((x, i) => (
                    <g key={`x-${i}`}>
                      <line x1={mapX(x)} y1={originY - 3} x2={mapX(x)} y2={originY + 3} stroke="#94a3b8" />
                      <text x={mapX(x)} y={originY + 13} fontSize="9" fill="#64748b" textAnchor="middle">{x}</text>
                    </g>
                  ))}
                  {ticks.yTicks.map((y, i) => (
                    <g key={`y-${i}`}>
                      <line x1={originX - 3} y1={mapY(y)} x2={originX + 3} y2={mapY(y)} stroke="#94a3b8" />
                      <text x={originX - 5} y={mapY(y) + 3} fontSize="9" fill="#64748b" textAnchor="end">{y}</text>
                    </g>
                  ))}

                  {/* 原始曲線 */}
                  <path d={curvePath} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />

                  {/* 逼近折線段 */}
                  {polygonPoints.map((pt, i) => {
                    if (i === 0) return null;
                    const prev = polygonPoints[i - 1];
                    return (
                      <line
                        key={`l-${i}`}
                        x1={prev.px}
                        y1={prev.py}
                        x2={pt.px}
                        y2={pt.py}
                        stroke="#ef4444"
                        strokeWidth="2"
                        className="chord-line"
                      />
                    );
                  })}

                  {/* 折線端點圓圈 */}
                  {polygonPoints.map((pt, i) => (
                    <circle key={`p-${i}`} cx={pt.px} cy={pt.py} r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                  ))}

                  {/* 方程式標記 */}
                  <text x={mapX(b) - 110} y={mapY(f(b)) - 10} fontSize="11" fill="#3b82f6" fontWeight="bold">
                    {presetData.fLabel}
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* 右側：控制台 */}
          <div className="controls-wrapper">

            <div className="control-card">
              <span className="control-title">🎛️ 調整分割段數 n</span>
              <div className="slider-group">
                <div className="slider-item">
                  <div className="slider-label">
                    <span>分割段數 (Segments)</span>
                    <span className="value">n = {segmentsCount}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={segmentsCount}
                    onChange={(e) => setSegmentsCount(parseInt(e.target.value))}
                    className="slider-input"
                  />
                </div>
              </div>
            </div>

            {/* 即時對照表 */}
            <div className="values-panel">
              <div className="value-box">
                <span className="value-title">導數與弧長微元</span>
                <div className="text-xs text-gray-700 font-semibold space-y-1">
                  <p>原函數: <InlineMath math={presetData.fLaTeX} /></p>
                  <p>導函數: <InlineMath math={presetData.derivLaTeX} /></p>
                  <p>微元: <InlineMath math="ds = \sqrt{1 + (f')^2} \, dx" /></p>
                </div>
              </div>

              <div className="control-card">
                <table className="table-compact">
                  <thead>
                    <tr>
                      <th>折線逼近長度</th>
                      <th>真實積分弧長</th>
                      <th>誤差率 (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-mono font-bold text-red-600">{approxLength.toFixed(5)}</td>
                      <td className="font-mono font-bold text-blue-600">{exactLength.toFixed(5)}</td>
                      <td className="font-mono">
                        {(((exactLength - approxLength) / exactLength) * 100).toFixed(3)}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3.3 經典範例 */}
      <div className="example-box mt-8 border-t-4 border-indigo-500 shadow-md">
        <h3 className="example-title text-xl font-bold text-indigo-900 mb-6 flex items-center">
          <span className="mr-2">📝</span> 3.3 經典範例演練
        </h3>

        <div className="space-y-6">
          {/* 範例 1 */}
          <div className="p-5 bg-indigo-50 rounded-lg border border-indigo-100">
            <p className="font-bold text-indigo-950 mb-2">
              範例 1 (標準弧長求值)：求曲線 <InlineMath math="f(x) = \frac{x^3}{6} + \frac{1}{2x}" /> 在區間 <InlineMath math="[1, 3]" /> 的長度。
            </p>
            <SolutionBox>
              <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
                <p><strong>解題步驟：</strong></p>
                <p><strong>Step 1：對原函數求導</strong></p>
                <p>
                  我們有 <InlineMath math="f(x) = \frac{1}{6}x^3 + \frac{1}{2}x^{-1}" />。<br />
                  對其求導數：
                  <BlockMath math="f'(x) = \frac{3}{6}x^2 - \frac{1}{2}x^{-2} = \frac{x^2}{2} - \frac{1}{2x^2}" />
                </p>

                <p><strong>Step 2：計算根號內部 <InlineMath math="1 + [f'(x)]^2" /> 並化簡</strong></p>
                <p>
                  展開導函數的平方：
                  <BlockMath math="[f'(x)]^2 = \left( \frac{x^2}{2} - \frac{1}{2x^2} \right)^2 = \frac{x^4}{4} - 2\left(\frac{x^2}{2}\right)\left(\frac{1}{2x^2}\right) + \frac{1}{4x^4} = \frac{x^4}{4} - \frac{1}{2} + \frac{1}{4x^4}" />
                  將常數 1 加回：
                  <BlockMath math="1 + [f'(x)]^2 = 1 + \left( \frac{x^4}{4} - \frac{1}{2} + \frac{1}{4x^4} \right) = \frac{x^4}{4} + \frac{1}{2} + \frac{1}{4x^4}" />
                  注意到這是一個完全平方式：
                  <BlockMath math="= \left( \frac{x^2}{2} + \frac{1}{2x^2} \right)^2" />
                  取根號時，因為 <InlineMath math="x \in [1, 3]" /> 內該式恆正，可直接去根號：
                  <BlockMath math="\sqrt{1 + [f'(x)]^2} = \frac{x^2}{2} + \frac{1}{2x^2}" />
                </p>

                <p><strong>Step 3：列定積分並求值</strong></p>
                <BlockMath math="L = \int_{1}^{3} \left( \frac{x^2}{2} + \frac{1}{2x^2} \right) \, dx = \left[ \frac{x^3}{6} - \frac{1}{2x} \right]_{1}^{3}" />
                <p>代入上下限：</p>
                <BlockMath math="= \left( \frac{3^3}{6} - \frac{1}{2(3)} \right) - \left( \frac{1^3}{6} - \frac{1}{2(1)} \right)" />
                <BlockMath math="= \left( \frac{27}{6} - \frac{1}{6} \right) - \left( \frac{1}{6} - \frac{3}{6} \right) = \frac{26}{6} - \left( -\frac{2}{6} \right) = \frac{28}{6} = \frac{14}{3} \approx 4.67" />
                <p className="font-semibold text-emerald-600">答案：曲線在該區間內的弧長為 <InlineMath math="\frac{14}{3}" />。</p>
              </div>
            </SolutionBox>
          </div>

          {/* 範例 2 */}
          <div className="p-5 bg-indigo-50 rounded-lg border border-indigo-100">
            <p className="font-bold text-indigo-950 mb-2">
              範例 2 (球體表面積公式推導)：利用旋轉曲面積公式證明：半徑為 <InlineMath math="r" /> 的球體，其表面積為 <InlineMath math="4\pi r^2" />。
            </p>
            <SolutionBox>
              <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
                <p><strong>證明過程：</strong></p>
                <p>
                  我們可以將球體視為由上半圓 <InlineMath math="y = \sqrt{r^2 - x^2}" />（在區間 <InlineMath math="[-r, r]" /> 上）繞 <InlineMath math="x" /> 軸旋轉所得的三維旋轉面。
                </p>
                <p><strong>Step 1：對圓方程式求導</strong></p>
                <p>
                  對 <InlineMath math="y = (r^2 - x^2)^{1/2}" /> 求導：
                  <BlockMath math="y' = \frac{1}{2}(r^2 - x^2)^{-1/2} \cdot (-2x) = \frac{-x}{\sqrt{r^2 - x^2}}" />
                </p>

                <p><strong>Step 2：計算弧長微元 ds</strong></p>
                <BlockMath math="1 + [y']^2 = 1 + \frac{x^2}{r^2 - x^2} = \frac{(r^2 - x^2) + x^2}{r^2 - x^2} = \frac{r^2}{r^2 - x^2}" />
                <p>取根號得：</p>
                <BlockMath math="ds = \sqrt{1 + [y']^2} \, dx = \frac{r}{\sqrt{r^2 - x^2}} \, dx" />

                <p><strong>Step 3：帶入表面積公式</strong></p>
                <p>根據公式 <InlineMath math="S = \int_{-r}^{r} 2\pi y \, ds" />：</p>
                <BlockMath math="S = \int_{-r}^{r} 2\pi \sqrt{r^2 - x^2} \cdot \left( \frac{r}{\sqrt{r^2 - x^2}} \right) \, dx" />
                <p>
                  消去分母與分子的根號項 <InlineMath math="\sqrt{r^2 - x^2}" />，式子瞬間極度簡化：
                </p>
                <BlockMath math="S = \int_{-r}^{r} 2\pi r \, dx = 2\pi r \int_{-r}^{r} 1 \, dx" />
                <BlockMath math="= 2\pi r \left[ x \right]_{-r}^{r} = 2\pi r \left( r - (-r) \right) = 2\pi r \cdot (2r) = 4\pi r^2" />
                <p className="font-semibold text-emerald-600">結論：證得半徑為 r 的球體表面積為 <InlineMath math="4\pi r^2" />。</p>
              </div>
            </SolutionBox>
          </div>
        </div>
      </div>
    </section>
  );
}

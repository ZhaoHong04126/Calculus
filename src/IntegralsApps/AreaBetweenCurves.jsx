// src/IntegralsApps/AreaBetweenCurves.jsx
import React, { useState, useMemo } from 'react';
import { InlineMath, BlockMath } from '../components/Math';
import './IntegralsApps.css';

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

export default function AreaBetweenCurves() {
  const [preset, setPreset] = useState('preset1'); // 'preset1' | 'preset2'
  const [a, setA] = useState(0);
  const [b, setB] = useState(1);

  // 定義預設函數
  const presetData = useMemo(() => {
    if (preset === 'preset1') {
      return {
        f: (x) => Math.sqrt(Math.max(0, x)),
        g: (x) => x * x,
        fLabel: 'f(x) = \\sqrt{x}',
        gLabel: 'g(x) = x^2',
        fLaTeX: '\\sqrt{x}',
        gLaTeX: 'x^2',
        xMin: -0.2,
        xMax: 1.3,
        yMin: -0.2,
        yMax: 1.3,
        aMin: 0.0,
        aMax: 1.0,
        bMin: 0.0,
        bMax: 1.2,
        // 定積分的解析解 F(x) = \int (f - g) dx = 2/3 x^{1.5} - 1/3 x^3
        antiderivative: (x) => (2/3) * Math.pow(x, 1.5) - (1/3) * Math.pow(x, 3),
        title: 'f(x) = \\sqrt{x} 與 g(x) = x^2 之間',
      };
    } else {
      return {
        f: (x) => 2 - x * x,
        g: (x) => x,
        fLabel: 'f(x) = 2 - x^2',
        gLabel: 'g(x) = x',
        fLaTeX: '2 - x^2',
        gLaTeX: 'x',
        xMin: -2.5,
        xMax: 2.0,
        yMin: -2.5,
        yMax: 2.5,
        aMin: -2.0,
        aMax: 1.0,
        bMin: -2.0,
        bMax: 1.5,
        // 定積分的解析解 F(x) = \int (f - g) dx = \int (2 - x^2 - x) dx = 2x - 1/3 x^3 - 1/2 x^2
        antiderivative: (x) => 2 * x - (1/3) * Math.pow(x, 3) - 0.5 * Math.pow(x, 2),
        title: 'f(x) = 2 - x^2 與 g(x) = x 之間',
      };
    }
  }, [preset]);

  // 當切換 preset 時，調整預設的 a 和 b 範圍，避免越界
  React.useEffect(() => {
    if (preset === 'preset1') {
      setA(0);
      setB(1);
    } else {
      setA(-2);
      setB(1);
    }
  }, [preset]);

  // SVG 寬高與座標映射
  const width = 400;
  const height = 300;
  const { xMin, xMax, yMin, yMax } = presetData;

  const mapX = (x) => ((x - xMin) / (xMax - xMin)) * width;
  const mapY = (y) => height - ((y - yMin) / (yMax - yMin)) * height;

  // 計算坐標軸位置
  const originX = mapX(0);
  const originY = mapY(0);

  // 繪製函數路徑
  const generatePath = (fn, start, end, steps = 100) => {
    let d = '';
    const stepSize = (end - start) / steps;
    for (let i = 0; i <= steps; i++) {
      const x = start + i * stepSize;
      const y = fn(x);
      if (!Number.isFinite(y)) continue;
      const px = mapX(x);
      const py = mapY(y);
      if (i === 0) d += `M ${px} ${py}`;
      else d += ` L ${px} ${py}`;
    }
    return d;
  };

  // 繪製填滿區域路徑 (從 a 到 b 圍成的面積)
  const generateFillPath = (f, g, aVal, bVal, steps = 50) => {
    if (aVal >= bVal) return '';
    let d = '';
    const stepSize = (bVal - aVal) / steps;
    
    // 頂部曲線 f(x) 從 a 到 b
    for (let i = 0; i <= steps; i++) {
      const x = aVal + i * stepSize;
      const y = f(x);
      const px = mapX(x);
      const py = mapY(y);
      if (i === 0) d += `M ${px} ${py}`;
      else d += ` L ${px} ${py}`;
    }
    
    // 右邊緣 bVal 的線段會自動連到下一個點
    // 底部曲線 g(x) 從 b 倒回 a
    for (let i = steps; i >= 0; i--) {
      const x = aVal + i * stepSize;
      const y = g(x);
      const px = mapX(x);
      const py = mapY(y);
      d += ` L ${px} ${py}`;
    }
    
    d += ' Z';
    return d;
  };

  // 計算面積數值
  const currentArea = useMemo(() => {
    if (a >= b) return 0;
    return presetData.antiderivative(b) - presetData.antiderivative(a);
  }, [a, b, presetData]);

  // 動態定積分計算式步驟
  const stepsLaTeX = useMemo(() => {
    const aVal = a;
    const bVal = b;
    if (aVal >= bVal) {
      return `A = 0.0000 \\quad (\\text{起點 } a \\ge \\text{終點 } b)`;
    }

    if (preset === 'preset1') {
      const va = (2/3) * Math.pow(aVal, 1.5) - (1/3) * Math.pow(aVal, 3);
      const vb = (2/3) * Math.pow(bVal, 1.5) - (1/3) * Math.pow(bVal, 3);
      const vaStr = va.toFixed(4);
      const vbStr = vb.toFixed(4);
      const diffStr = (vb - va).toFixed(4);
      
      return `\\begin{aligned}
      A &= \\int_{${aVal.toFixed(2)}}^{${bVal.toFixed(2)}} \\left( \\sqrt{x} - x^2 \\right) dx \\\\
      &= \\left[ \\frac{2}{3}x^{1.5} - \\frac{x^3}{3} \\right]_{${aVal.toFixed(2)}}^{${bVal.toFixed(2)}} \\\\
      &= \\left( \\frac{2}{3} \\cdot ${bVal.toFixed(2)}^{1.5} - \\frac{${bVal.toFixed(2)}^3}{3} \\right) - \\left( \\frac{2}{3} \\cdot ${aVal.toFixed(2)}^{1.5} - \\frac{${aVal.toFixed(2)}^3}{3} \\right) \\\\
      &= ${vbStr} - ${vaStr} \\\\
      &= ${diffStr}
      \\end{aligned}`;
    } else {
      const va = 2 * aVal - (1/3) * Math.pow(aVal, 3) - 0.5 * Math.pow(aVal, 2);
      const vb = 2 * bVal - (1/3) * Math.pow(bVal, 3) - 0.5 * Math.pow(bVal, 2);
      const vaStr = va.toFixed(4);
      const vbStr = vb.toFixed(4);
      const diffStr = (vb - va).toFixed(4);
      
      const vaPart = va < 0 ? `(${vaStr})` : vaStr;
      const vbPart = vb < 0 ? `(${vbStr})` : vbStr;
      
      return `\\begin{aligned}
      A &= \\int_{${aVal.toFixed(2)}}^{${bVal.toFixed(2)}} \\left( (2 - x^2) - x \\right) dx \\\\
      &= \\left[ 2x - \\frac{x^3}{3} - \\frac{x^2}{2} \\right]_{${aVal.toFixed(2)}}^{${bVal.toFixed(2)}} \\\\
      &= \\left( 2(${bVal.toFixed(2)}) - \\frac{${bVal.toFixed(2)}^3}{3} - \\frac{${bVal.toFixed(2)}^2}{2} \\right) - \\left( 2(${aVal.toFixed(2)}) - \\frac{${aVal.toFixed(2)}^3}{3} - \\frac{${aVal.toFixed(2)}^2}{2} \\right) \\\\
      &= ${vbPart} - ${vaPart} \\\\
      &= ${diffStr}
      \\end{aligned}`;
    }
  }, [a, b, preset]);

  // 格線系統
  const gridLines = useMemo(() => {
    const xLines = [];
    const yLines = [];
    const xStep = preset === 'preset1' ? 0.5 : 1.0;
    const yStep = preset === 'preset1' ? 0.5 : 1.0;

    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      if (Math.abs(x) < 0.001) continue;
      xLines.push(x);
    }
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      if (Math.abs(y) < 0.001) continue;
      yLines.push(y);
    }
    return { xLines, yLines };
  }, [xMin, xMax, yMin, yMax, preset]);

  return (
    <section className="subsection mt-12 pt-8 border-t border-gray-100">
      <h2 className="section-title text-2xl font-bold mb-4 border-b-2 border-blue-500 pb-2">
        1. 兩曲線間的面積 (Area Between Curves)
      </h2>

      <p className="mb-6 text-gray-700 leading-relaxed">
        在先前的學習中，我們了解了定積分代表函數曲線與 <InlineMath math="x" /> 軸圍成的淨面積。
        現在，我們將此概念推廣到求<strong>兩條曲線之間所夾的平面區域面積</strong>。
        基本思想是將該區域分割成無數個極薄的垂直（或水平）矩形條，並利用定積分將它們累加。
      </p>

      {/* 1.1 公式定義區塊 */}
      <div className="math-box mb-8 p-6 bg-blue-50 rounded-lg shadow-sm border border-blue-100">
        <h3 className="text-xl font-bold mb-4 text-blue-800 flex items-center">
          <span className="mr-2">📐</span> 1.1 兩曲線夾角面積公式
        </h3>

        <div className="space-y-4">
          <div className="p-4 bg-white rounded border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2">① 對 x 軸積分（垂直矩形分割）：</h4>
            <p className="text-sm text-gray-700 mb-3">
              若在區間 <InlineMath math="[a, b]" /> 內，上方曲線 <InlineMath math="f(x)" /> 恆大於或等於下方曲線 <InlineMath math="g(x)" />（即 <InlineMath math="f(x) \ge g(x)" />），則兩者夾的面積 <InlineMath math="A" /> 為：
            </p>
            <BlockMath math="A = \int_{a}^{b} \left[ f(x) - g(x) \right] \, dx" />
            <p className="text-xs text-gray-500 mt-2">
              💡 記憶心法：<strong>面積 ＝ 積分 ( 上方曲線 － 下方曲線 ) <InlineMath math="dx" /></strong>
            </p>
          </div>

          <div className="p-4 bg-white rounded border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2">② 對 y 軸積分（水平矩形分割）：</h4>
            <p className="text-sm text-gray-700 mb-3">
              若在區間 <InlineMath math="[c, d]" /> 內，右側曲線 <InlineMath math="f(y)" /> 恆大於或等於左側曲線 <InlineMath math="g(y)" />（即 <InlineMath math="f(y) \ge g(y)" />），則面積 <InlineMath math="A" /> 為：
            </p>
            <BlockMath math="A = \int_{c}^{d} \left[ f(y) - g(y) \right] \, dy" />
            <p className="text-xs text-gray-500 mt-2">
              💡 記憶心法：<strong>面積 ＝ 積分 ( 右側曲線 － 左側曲線 ) <InlineMath math="dy" /></strong>
            </p>
          </div>
        </div>
      </div>

      {/* 1.2 互動式 SVG 畫布 */}
      <div className="math-box mb-8 p-6 bg-slate-50 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold mb-3 text-slate-800 flex items-center">
          <span className="mr-2">🕹️</span> 1.2 面積圍成動態探索器
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          選擇下方不同的曲線組合，並調整積分的起點 <InlineMath math="a" /> 與終點 <InlineMath math="b" />，觀察填滿面積如何隨積分界限實時改變。
        </p>

        <div className="interactive-container">
          {/* 左側：方程式設定與圖 */}
          <div className="canvas-wrapper" style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
              {/* 📂 選擇曲線 Preset */}
              <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem', width: '100%' }}>
                <span className="value-title" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#94a3b8' }}>
                  📂 選擇曲線 Preset
                </span>
                <div className="switch-group">
                  <button
                    onClick={() => setPreset('preset1')}
                    className={`switch-btn ${preset === 'preset1' ? 'active' : ''}`}
                  >
                    根式與拋物線
                  </button>
                  <button
                    onClick={() => setPreset('preset2')}
                    className={`switch-btn ${preset === 'preset2' ? 'active' : ''}`}
                  >
                    拋物線與直線
                  </button>
                </div>
              </div>

              {/* (1) 設定方程式 */}
              <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem', width: '100%' }}>
                <span className="value-title" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#94a3b8' }}>
                  ① 設定方程式
                </span>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ padding: '0.5rem 1rem', background: '#ecfdf5', border: '1px solid #d1fae5', borderRadius: '8px', color: '#065f46', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
                    上方曲線：<InlineMath math={presetData.fLabel} />
                  </div>
                  <div style={{ padding: '0.5rem 1rem', background: '#f5f3ff', border: '1px solid #ede9fe', borderRadius: '8px', color: '#5b21b6', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6' }}></span>
                    下方曲線：<InlineMath math={presetData.gLabel} />
                  </div>
                </div>
              </div>

              {/* (2) 圖 */}
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span className="value-title" style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#94a3b8', alignSelf: 'flex-start' }}>
                  ② 面積圍成圖形
                </span>
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ display: 'block', width: '100%', maxWidth: '320px', height: 'auto' }}>
                  <defs>
                    {/* 輕微的網格線樣式 */}
                    <pattern id="grid-area" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                    </pattern>
                    <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.15" />
                    </linearGradient>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-area)" />

                  {/* 坐標軸 */}
                  <line x1={0} y1={originY} x2={width} y2={originY} stroke="#cbd5e1" strokeWidth="1.5" />
                  <line x1={originX} y1={0} x2={originX} y2={height} stroke="#cbd5e1" strokeWidth="1.5" />

                  {/* 刻度標記與數字 */}
                  {gridLines.xLines.map((x, i) => (
                    <g key={`x-${i}`}>
                      <line x1={mapX(x)} y1={originY - 3} x2={mapX(x)} y2={originY + 3} stroke="#94a3b8" />
                      <text x={mapX(x)} y={originY + 14} fontSize="10" fill="#64748b" textAnchor="middle">{x}</text>
                    </g>
                  ))}
                  {gridLines.yLines.map((y, i) => (
                    <g key={`y-${i}`}>
                      <line x1={originX - 3} y1={mapY(y)} x2={originX + 3} y2={mapY(y)} stroke="#94a3b8" />
                      <text x={originX - 6} y={mapY(y) + 3} fontSize="10" fill="#64748b" textAnchor="end">{y}</text>
                    </g>
                  ))}

                  {/* 填滿面積區域 */}
                  {a < b && (
                    <path
                      d={generateFillPath(presetData.f, presetData.g, a, b)}
                      fill="url(#areaGrad)"
                      stroke="#3b82f6"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                    />
                  )}

                  {/* 曲線 f(x) */}
                  <path
                    d={generatePath(presetData.f, xMin, xMax)}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* 曲線 g(x) */}
                  <path
                    d={generatePath(presetData.g, xMin, xMax)}
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* 邊界 a 與 b 的標記虛線 */}
                  <line x1={mapX(a)} y1={0} x2={mapX(a)} y2={height} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1={mapX(b)} y1={0} x2={mapX(b)} y2={height} stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* 邊界文字 */}
                  <text x={mapX(a) - 6} y={15} fontSize="11" fill="#ef4444" fontWeight="bold" textAnchor="end">x = a</text>
                  <text x={mapX(b) + 6} y={15} fontSize="11" fill="#d97706" fontWeight="bold" textAnchor="start">x = b</text>

                  {/* 曲線標籤 */}
                  <text x={mapX(xMax) - 10} y={mapY(presetData.f(xMax - 0.1)) - 8} fontSize="11" fill="#10b981" fontWeight="bold">
                    f(x)
                  </text>
                  <text x={mapX(xMax) - 10} y={mapY(presetData.g(xMax - 0.1)) + 12} fontSize="11" fill="#8b5cf6" fontWeight="bold">
                    g(x)
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* 右側：控制面板 */}
          <div className="controls-wrapper">

            <div className="control-card">
              <span className="control-title">🎛️ 調整積分範圍</span>
              <div className="slider-group">
                <div className="slider-item">
                  <div className="slider-label">
                    <span>起點 a</span>
                    <span className="value">{a.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={presetData.aMin}
                    max={presetData.aMax}
                    step="0.05"
                    value={a}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setA(val);
                      if (val > b) setB(val);
                    }}
                    className="slider-input"
                  />
                </div>

                <div className="slider-item">
                  <div className="slider-label">
                    <span>終點 b</span>
                    <span className="value">{b.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={presetData.bMin}
                    max={presetData.bMax}
                    step="0.05"
                    value={b}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setB(val);
                      if (val < a) setA(val);
                    }}
                    className="slider-input"
                  />
                </div>
              </div>
            </div>

            {/* 即時數學式與計算值 */}
            <div className="values-panel">
              <div className="value-box green">
                <span className="value-title">定積分計算式</span>
                <div className="text-xs font-mono text-gray-800 overflow-x-auto my-1">
                  <BlockMath math={stepsLaTeX} />
                </div>
              </div>

              <div className="value-box amber">
                <span className="value-title">圍成面積數值 (Area)</span>
                <span className="value-content">{a >= b ? '0.000' : currentArea.toFixed(4)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1.3 經典範例 */}
      <div className="example-box mt-8 border-t-4 border-blue-500 shadow-md">
        <h3 className="example-title text-xl font-bold text-blue-900 mb-6 flex items-center">
          <span className="mr-2">📝</span> 1.3 經典範例演練
        </h3>

        <div className="space-y-6">
          {/* 範例 1 */}
          <div className="p-5 bg-blue-50 rounded-lg border border-blue-100">
            <p className="font-bold text-blue-950 mb-2">
              範例 1 (標準 x 積分)：求由拋物線 <InlineMath math="y = 2 - x^2" /> 與直線 <InlineMath math="y = -x" /> 所圍成的平面區域面積。
            </p>
            <SolutionBox>
              <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
                <p>
                  <strong>解題步驟：</strong>
                </p>
                <p><strong>Step 1：尋找兩曲線的交點（決定積分界限）</strong></p>
                <p>令兩曲線方程式相等：</p>
                <BlockMath math="2 - x^2 = -x" />
                <p>移項整理得二次方程式：</p>
                <BlockMath math="x^2 - x - 2 = 0 \implies (x-2)(x+1) = 0" />
                <p>
                  解得交點的 <InlineMath math="x" /> 座標為 <InlineMath math="x = -1" /> 與 <InlineMath math="x = 2" />。因此，定積分的上下界為 <InlineMath math="a = -1, b = 2" />。
                </p>
                
                <p><strong>Step 2：判斷哪條曲線在上方</strong></p>
                <p>
                  在區間 <InlineMath math="[-1, 2]" /> 內，選取一個測試點（例如 <InlineMath math="x = 0" />）：
                  <br />
                  對於 <InlineMath math="y = 2 - x^2" />，當 <InlineMath math="x=0" /> 時 <InlineMath math="y = 2" />。
                  <br />
                  對於 <InlineMath math="y = -x" />，當 <InlineMath math="x=0" /> 時 <InlineMath math="y = 0" />。
                  <br />
                  因為 <InlineMath math="2 > 0" />，所以在該區間內拋物線 <InlineMath math="f(x) = 2 - x^2" /> 為上方曲線，直線 <InlineMath math="g(x) = -x" /> 為下方曲線。
                </p>

                <p><strong>Step 3：建立並計算定積分</strong></p>
                <p>根據公式，面積為：</p>
                <BlockMath math="A = \int_{-1}^{2} \left[ (2 - x^2) - (-x) \right] \, dx = \int_{-1}^{2} \left( 2 + x - x^2 \right) \, dx" />
                <p>求出反導數：</p>
                <BlockMath math="= \left[ 2x + \frac{x^2}{2} - \frac{x^3}{3} \right]_{-1}^{2}" />
                <p>代入上下界計算：</p>
                <BlockMath math="= \left( 2(2) + \frac{2^2}{2} - \frac{2^3}{3} \right) - \left( 2(-1) + \frac{(-1)^2}{2} - \frac{(-1)^3}{3} \right)" />
                <BlockMath math="= \left( 4 + 2 - \frac{8}{3} \right) - \left( -2 + \frac{1}{2} + \frac{1}{3} \right)" />
                <BlockMath math="= \frac{10}{3} - \left( -\frac{7}{6} \right) = \frac{20}{6} + \frac{7}{6} = \frac{27}{6} = 4.5" />
                <p className="font-semibold text-emerald-600">答案：兩曲線所圍成的區域面積為 4.5。</p>
              </div>
            </SolutionBox>
          </div>

          {/* 範例 2 */}
          <div className="p-5 bg-blue-50 rounded-lg border border-blue-100">
            <p className="font-bold text-blue-950 mb-2">
              範例 2 (y 軸方向積分)：求由拋物線 <InlineMath math="x = 3 - y^2" /> 與直線 <InlineMath math="x = y + 1" /> 所圍成的平面區域面積。
            </p>
            <SolutionBox>
              <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
                <p>
                  <strong>解題思維：</strong>
                  此題的邊界由拋物線與直線構成，若是對 <InlineMath math="x" /> 積分，拋物線在上方和下方會分成兩部分（需要開根號且拆成兩段積分，過程非常繁雜）。因此，<strong>改對 <InlineMath math="y" /> 軸積分</strong>會簡單得多。
                </p>
                <hr className="my-2 border-blue-100" />
                <p><strong>Step 1：尋找兩曲線的交點（決定 y 積分界限）</strong></p>
                <p>令兩式的 <InlineMath math="x" /> 相等：</p>
                <BlockMath math="3 - y^2 = y + 1 \implies y^2 + y - 2 = 0 \implies (y+2)(y-1) = 0" />
                <p>
                  解得交點的 <InlineMath math="y" /> 座標為 <InlineMath math="y = -2" /> 與 <InlineMath math="y = 1" />。定積分上下界即為 <InlineMath math="c = -2, d = 1" />。
                </p>

                <p><strong>Step 2：判斷哪條曲線在右側 (X 值較大)</strong></p>
                <p>
                  在區間 <InlineMath math="y \in [-2, 1]" /> 內，選取測試點 <InlineMath math="y = 0" />：
                  <br />
                  對於 <InlineMath math="x = 3 - y^2" />，當 <InlineMath math="y = 0" /> 時 <InlineMath math="x = 3" /> (右側曲線)。
                  <br />
                  對於 <InlineMath math="x = y + 1" />，當 <InlineMath math="y = 0" /> 時 <InlineMath math="x = 1" /> (左側曲線)。
                  <br />
                  因為 <InlineMath math="3 > 1" />，拋物線 <InlineMath math="f(y) = 3 - y^2" /> 在右側，直線 <InlineMath math="g(y) = y + 1" /> 在左側。
                </p>

                <p><strong>Step 3：建立並計算定積分</strong></p>
                <BlockMath math="A = \int_{-2}^{1} \left[ (3 - y^2) - (y + 1) \right] \, dy = \int_{-2}^{1} \left( 2 - y - y^2 \right) \, dy" />
                <p>計算不定積分：</p>
                <BlockMath math="= \left[ 2y - \frac{y^2}{2} - \frac{y^3}{3} \right]_{-2}^{1}" />
                <p>代入上下界求值：</p>
                <BlockMath math="= \left( 2(1) - \frac{1}{2} - \frac{1}{3} \right) - \left( 2(-2) - \frac{(-2)^2}{2} - \frac{(-2)^3}{3} \right)" />
                <BlockMath math="= \left( 2 - \frac{1}{2} - \frac{1}{3} \right) - \left( -4 - 2 + \frac{8}{3} \right)" />
                <BlockMath math="= \frac{7}{6} - \left( -\frac{10}{3} \right) = \frac{7}{6} + \frac{20}{6} = \frac{27}{6} = 4.5" />
                <p className="font-semibold text-emerald-600">答案：兩曲線圍成的面積為 4.5。</p>
              </div>
            </SolutionBox>
          </div>
        </div>
      </div>

      {/* 1.4 常見錯誤與陷阱提醒 */}
      <div className="error-box">
        <h3 className="error-title">
          <span className="mr-2">⚠️</span> 1.4 常見錯誤與陷阱
        </h3>
        <ul className="error-list">
          <li className="error-item">
            <span className="error-marker">✗</span>
            <div className="error-text">
              <h5>未找出全部交點而直接積分：</h5>
              <p>求解圍成面積前，<strong>一定要先解聯立方程組求出所有交點</strong>。若直接套用題目給的任意邊界，可能會漏算或多算區域，甚至積出錯誤的負值。</p>
            </div>
          </li>
          <li className="error-item">
            <span className="error-marker">✗</span>
            <div className="error-text">
              <h5>上下曲線（或左右曲線）順序顛倒：</h5>
              <p>公式中的被積函數是 <InlineMath math="\text{上方} - \text{下方}" />。如果放反了，積分算出來會是負數。雖然面積恆為正值，但絕不能直接取絕對值了事，在寫推導過程時必須注意順序。</p>
            </div>
          </li>
          <li className="error-item">
            <span className="error-marker">✗</span>
            <div className="error-text">
              <h5>兩曲線在積分區間內交叉：</h5>
              <p>如果曲線在區間 <InlineMath math="[a, b]" /> 中間有相交（例如求 <InlineMath math="y = \sin x" /> 與 <InlineMath math="y = \cos x" /> 在 <InlineMath math="[0, \pi]" /> 的夾角面積），則必須將積分區間<strong>以交點為界拆成多個子區間</strong>，在每個子區間內分別以 <InlineMath math="\text{大} - \text{小}" /> 來積分，否則正負面積會互相抵消。</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

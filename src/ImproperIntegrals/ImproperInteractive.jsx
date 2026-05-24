import React, { useState, useMemo } from 'react';
import { InlineMath, BlockMath } from '../components/Math';

const plotDimensions = { width: 380, height: 320 };

export default function ImproperInteractive() {
  // 互動式視覺化狀態
  const [activeTab, setActiveTab] = useState('A'); // 'A' | 'B' | 'C'
  const [paramP, setParamP] = useState(1.2);      // 函數 A & B 的 p 參數
  const [paramK, setParamK] = useState(0.5);      // 函數 C 的 k 參數
  const [limitT, setLimitT] = useState(5.0);       // 函數 A & C 的上限 t
  const [limitT2, setLimitT2] = useState(0.2);     // 函數 B 的下限 t

  // 處理 Tab 切換時重設適當的預設值，避免數值溢出或超出合理範圍
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'A') {
      setParamP(1.2);
      setLimitT(5.0);
    } else if (tab === 'B') {
      setParamP(0.8);
      setLimitT2(0.2);
    } else if (tab === 'C') {
      setParamK(0.5);
      setLimitT(4.0);
    }
  };

  // 根據當前選擇計算積分值與極限值
  const calculation = useMemo(() => {
    if (activeTab === 'A') {
      const p = paramP;
      const t = limitT;
      const val = Math.abs(p - 1) < 0.001 
        ? Math.log(t) 
        : (Math.pow(t, 1 - p) - 1) / (1 - p);
      
      const isConvergent = p > 1;
      const limitVal = isConvergent ? 1 / (p - 1) : Infinity;

      return {
        formula: `\\int_1^{t} \\frac{1}{x^{${p.toFixed(1)}}} \\, dx`,
        currentVal: val.toFixed(4),
        limitFormula: `\\lim_{t \\to \\infty} \\int_1^{t} \\frac{1}{x^{${p.toFixed(1)}}} \\, dx`,
        limitResult: isConvergent ? limitVal.toFixed(4) : '\\infty',
        isConvergent,
      };
    } else if (activeTab === 'B') {
      const p = paramP;
      const t = limitT2;
      const val = Math.abs(p - 1) < 0.001 
        ? -Math.log(t) 
        : (1 - Math.pow(t, 1 - p)) / (1 - p);
      
      const isConvergent = p < 1;
      const limitVal = isConvergent ? 1 / (1 - p) : Infinity;

      return {
        formula: `\\int_{t}^1 \\frac{1}{x^{${p.toFixed(1)}}} \\, dx`,
        currentVal: val.toFixed(4),
        limitFormula: `\\lim_{t \\to 0^+} \\int_{t}^1 \\frac{1}{x^{${p.toFixed(1)}}} \\, dx`,
        limitResult: isConvergent ? limitVal.toFixed(4) : '\\infty',
        isConvergent,
      };
    } else {
      const k = paramK;
      const t = limitT;
      const val = (1 - Math.exp(-k * t)) / k;
      const limitVal = 1 / k;

      return {
        formula: `\\int_0^{t} e^{-${k.toFixed(1)}x} \\, dx`,
        currentVal: val.toFixed(4),
        limitFormula: `\\lim_{t \\to \\infty} \\int_0^{t} e^{-${k.toFixed(1)}x} \\, dx`,
        limitResult: limitVal.toFixed(4),
        isConvergent: true,
      };
    }
  }, [activeTab, paramP, paramK, limitT, limitT2]);

  // SVG 繪圖相關常數與坐標轉換函數
  
  const plotData = useMemo(() => {
    const { width, height } = plotDimensions;
    
    if (activeTab === 'A') {
      // Type I: x in [0.5, 10], y in [-0.2, 2.2]
      const minX = 0, maxX = 10;
      const minY = -0.2, maxY = 2.2;
      
      const mapX = (x) => 45 + ((x - minX) / (maxX - minX)) * (width - 65);
      const mapY = (y) => height - 45 - ((y - minY) / (maxY - minY)) * (height - 75);
      
      // 曲線路徑
      let curvePath = "";
      for (let x = 0.45; x <= 10; x += 0.1) {
        const y = 1 / Math.pow(x, paramP);
        if (x === 0.45) curvePath += `M ${mapX(x)} ${mapY(y)}`;
        else curvePath += ` L ${mapX(x)} ${mapY(y)}`;
      }
      
      // 著色區間路徑 (x 從 1 到 t)
      const t = limitT;
      let areaPath = `M ${mapX(1)} ${mapY(0)}`;
      for (let x = 1.0; x <= t; x += 0.1) {
        const y = 1 / Math.pow(x, paramP);
        areaPath += ` L ${mapX(x)} ${mapY(y)}`;
      }
      areaPath += ` L ${mapX(t)} ${mapY(1 / Math.pow(t, paramP))}`;
      areaPath += ` L ${mapX(t)} ${mapY(0)}`;
      areaPath += " Z";

      return { mapX, mapY, curvePath, areaPath, t, tLabel: 't', startX: 1, type: 'I' };
    } else if (activeTab === 'B') {
      // Type II: x in [-0.2, 2.2], y in [-0.5, 6.0]
      const minX = -0.1, maxX = 2.2;
      const minY = -0.5, maxY = 6.0;
      
      const mapX = (x) => 45 + ((x - minX) / (maxX - minX)) * (width - 65);
      const mapY = (y) => height - 45 - ((y - minY) / (maxY - minY)) * (height - 75);
      
      // 曲線路徑 (起點避開 x = 0 的無窮大，從 0.08 開始)
      let curvePath = "";
      for (let x = 0.08; x <= 2.2; x += 0.02) {
        const y = 1 / Math.pow(x, paramP);
        if (x === 0.08) curvePath += `M ${mapX(x)} ${mapY(y)}`;
        else curvePath += ` L ${mapX(x)} ${mapY(y)}`;
      }
      
      // 著色區間路徑 (x 從 t2 到 1)
      const t = limitT2;
      let areaPath = `M ${mapX(t)} ${mapY(0)}`;
      for (let x = t; x <= 1.0; x += 0.02) {
        const y = 1 / Math.pow(x, paramP);
        areaPath += ` L ${mapX(x)} ${mapY(y)}`;
      }
      areaPath += ` L ${mapX(1.0)} ${mapY(1.0)}`;
      areaPath += ` L ${mapX(1.0)} ${mapY(0)}`;
      areaPath += " Z";

      return { mapX, mapY, curvePath, areaPath, t, tLabel: 't', startX: 1, type: 'II' };
    } else {
      // Exponential Decay: x in [-0.5, 8], y in [-0.2, 1.5]
      const minX = -0.2, maxX = 8.0;
      const minY = -0.2, maxY = 1.5;
      
      const mapX = (x) => 45 + ((x - minX) / (maxX - minX)) * (width - 65);
      const mapY = (y) => height - 45 - ((y - minY) / (maxY - minY)) * (height - 75);
      
      // 曲線路徑
      let curvePath = "";
      for (let x = 0.0; x <= 8.0; x += 0.1) {
        const y = Math.exp(-paramK * x);
        if (x === 0.0) curvePath += `M ${mapX(x)} ${mapY(y)}`;
        else curvePath += ` L ${mapX(x)} ${mapY(y)}`;
      }
      
      // 著色區間路徑 (x 從 0 到 t)
      const t = limitT;
      let areaPath = `M ${mapX(0)} ${mapY(0)}`;
      for (let x = 0.0; x <= t; x += 0.1) {
        const y = Math.exp(-paramK * x);
        areaPath += ` L ${mapX(x)} ${mapY(y)}`;
      }
      areaPath += ` L ${mapX(t)} ${mapY(Math.exp(-paramK * t))}`;
      areaPath += ` L ${mapX(t)} ${mapY(0)}`;
      areaPath += " Z";

      return { mapX, mapY, curvePath, areaPath, t, tLabel: 't', startX: 0, type: 'I_exp' };
    }
  }, [activeTab, paramP, paramK, limitT, limitT2]);

  return (
    <section className="subsection">
      <h2 className="section-title">
        10.2 互動式視覺化探索
      </h2>
      <p className="subsection-intro" style={{ marginBottom: '20px', color: '#334155', lineHeight: '1.6' }}>
        透過調整下方的滑桿，您可以即時動態觀察第一類（無窮區間）與第二類（無界函數）瑕積分在極限逼近時的面積與收斂行為。
      </p>

      <div className="improper-interactive-container">
        {/* 左側：繪圖區 */}
        <div className="improper-canvas-wrapper">
          <svg 
            viewBox={`0 0 ${plotDimensions.width} ${plotDimensions.height}`} 
            width="100%" 
            height="100%"
            style={{ display: 'block', overflow: 'visible' }}
          >
            <defs>
              {/* 漸層著色 */}
              <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* 繪製網格輔助線 */}
            <line 
              x1={plotData.mapX(plotData.startX)} 
              y1={0} 
              x2={plotData.mapX(plotData.startX)} 
              y2={plotDimensions.height} 
              stroke="#e2e8f0" 
              strokeDasharray="2 2" 
            />
            <line 
              x1={plotData.mapX(1.0)} 
              y1={0} 
              x2={plotData.mapX(1.0)} 
              y2={plotDimensions.height} 
              stroke="#e2e8f0" 
              strokeDasharray="2 2" 
            />

            {/* 著色面積 */}
            {plotData.areaPath && (
              <path d={plotData.areaPath} fill="url(#areaGrad)" />
            )}

            {/* X軸 & Y軸 */}
            <line 
              x1={0} 
              y1={plotData.mapY(0)} 
              x2={plotDimensions.width} 
              y2={plotData.mapY(0)} 
              stroke="#94a3b8" 
              strokeWidth="1.5" 
            />
            <line 
              x1={plotData.mapX(0)} 
              y1={0} 
              x2={plotData.mapX(0)} 
              y2={plotDimensions.height} 
              stroke="#94a3b8" 
              strokeWidth="1.5" 
            />

            {/* 函數曲線 */}
            {plotData.curvePath && (
              <path 
                d={plotData.curvePath} 
                fill="none" 
                stroke="#0d9488" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            )}

            {/* 垂直漸近線標示 (Type II 專用) */}
            {plotData.type === 'II' && (
              <line 
                x1={plotData.mapX(0)} 
                y1={0} 
                x2={plotData.mapX(0)} 
                y2={plotDimensions.height} 
                stroke="#ef4444" 
                strokeWidth="1.5" 
                strokeDasharray="4 4" 
              />
            )}

            {/* 逼近上限/下限 t 的指示虛線 */}
            <line 
              x1={plotData.mapX(plotData.t)} 
              y1={plotData.mapY(0)} 
              x2={plotData.mapX(plotData.t)} 
              y2={plotData.mapY(
                plotData.type === 'I' ? 1/Math.pow(plotData.t, paramP) : 
                plotData.type === 'II' ? 1/Math.pow(plotData.t, paramP) : 
                Math.exp(-paramK * plotData.t)
              )} 
              stroke="#0d9488" 
              strokeWidth="1.5" 
              strokeDasharray="3 3" 
            />

            {/* t 的點標記 */}
            <circle 
              cx={plotData.mapX(plotData.t)} 
              cy={plotData.mapY(
                plotData.type === 'I' ? 1/Math.pow(plotData.t, paramP) : 
                plotData.type === 'II' ? 1/Math.pow(plotData.t, paramP) : 
                Math.exp(-paramK * plotData.t)
              )} 
              r="4" 
              fill="#0d9488" 
            />

            {/* 刻度標籤 */}
            {/* X軸刻度 */}
            {plotData.type === 'I' && (
              <>
                <text x={plotData.mapX(1)} y={plotData.mapY(0) + 15} fontSize="10" textAnchor="middle" fill="#64748b">1</text>
                <text x={plotData.mapX(plotData.t)} y={plotData.mapY(0) + 15} fontSize="10" textAnchor="middle" fill="#0d9488" fontWeight="bold">t</text>
                <text x={plotData.mapX(10) - 10} y={plotData.mapY(0) - 6} fontSize="10" textAnchor="end" fill="#64748b">x → ∞</text>
              </>
            )}
            {plotData.type === 'II' && (
              <>
                <text x={plotData.mapX(0) - 8} y={plotData.mapY(0) + 15} fontSize="10" textAnchor="middle" fill="#ef4444" fontWeight="bold">0</text>
                <text x={plotData.mapX(plotData.t)} y={plotData.mapY(0) + 15} fontSize="10" textAnchor="middle" fill="#0d9488" fontWeight="bold">t</text>
                <text x={plotData.mapX(1)} y={plotData.mapY(0) + 15} fontSize="10" textAnchor="middle" fill="#64748b">1</text>
                <text x={plotData.mapX(2.0)} y={plotData.mapY(0) + 15} fontSize="10" textAnchor="middle" fill="#64748b">2</text>
              </>
            )}
            {plotData.type === 'I_exp' && (
              <>
                <text x={plotData.mapX(0)} y={plotData.mapY(0) + 15} fontSize="10" textAnchor="middle" fill="#64748b">0</text>
                <text x={plotData.mapX(plotData.t)} y={plotData.mapY(0) + 15} fontSize="10" textAnchor="middle" fill="#0d9488" fontWeight="bold">t</text>
                <text x={plotData.mapX(8) - 10} y={plotData.mapY(0) - 6} fontSize="10" textAnchor="end" fill="#64748b">x → ∞</text>
              </>
            )}

            {/* 函數標籤 */}
            <text 
              x={plotDimensions.width - 20} 
              y={plotData.mapY(
                plotData.type === 'I' ? 1/Math.pow(8, paramP) : 
                plotData.type === 'II' ? 1/Math.pow(2.0, paramP) : 
                Math.exp(-paramK * 7.5)
              ) - 10} 
              fontSize="12" 
              textAnchor="end" 
              fill="#0d9488" 
              fontWeight="bold"
            >
              {activeTab === 'A' && `y = 1 / x^${paramP.toFixed(1)}`}
              {activeTab === 'B' && `y = 1 / x^${paramP.toFixed(1)}`}
              {activeTab === 'C' && `y = e^(-${paramK.toFixed(1)}x)`}
            </text>
          </svg>
        </div>

        {/* 右側：控制與面板 */}
        <div className="improper-controls-wrapper">
          {/* 類型切換分頁 */}
          <div className="improper-switch-group">
            <button 
              className={`improper-switch-btn ${activeTab === 'A' ? 'active' : 'inactive'}`}
              onClick={() => handleTabChange('A')}
            >
              1/x^p 在 [1, ∞)
            </button>
            <button 
              className={`improper-switch-btn ${activeTab === 'B' ? 'active' : 'inactive'}`}
              onClick={() => handleTabChange('B')}
            >
              1/x^p 在 (0, 1]
            </button>
            <button 
              className={`improper-switch-btn ${activeTab === 'C' ? 'active' : 'inactive'}`}
              onClick={() => handleTabChange('C')}
            >
              e^(-kx) 在 [0, ∞)
            </button>
          </div>

          {/* 控制滑桿區 */}
          <div className="improper-sliders-box">
            {/* 參數滑桿 (p 或是 k) */}
            {activeTab !== 'C' ? (
              <div className="improper-slider-item">
                <div className="improper-slider-label">
                  <span>次方參數 p (冪函數)</span>
                  <span className="value">p = {paramP.toFixed(1)}</span>
                </div>
                <input 
                  type="range" 
                  min={activeTab === 'A' ? "0.5" : "0.2"} 
                  max="2.5" 
                  step="0.1" 
                  value={paramP} 
                  onChange={(e) => setParamP(parseFloat(e.target.value))}
                  className="improper-slider-input" 
                />
              </div>
            ) : (
              <div className="improper-slider-item">
                <div className="improper-slider-label">
                  <span>衰減常數 k</span>
                  <span className="value">k = {paramK.toFixed(1)}</span>
                </div>
                <input 
                  type="range" 
                  min="0.2" 
                  max="2.0" 
                  step="0.1" 
                  value={paramK} 
                  onChange={(e) => setParamK(parseFloat(e.target.value))}
                  className="improper-slider-input" 
                />
              </div>
            )}

            {/* 極限滑桿 t */}
            {activeTab === 'B' ? (
              <div className="improper-slider-item">
                <div className="improper-slider-label">
                  <span>積分下限 t (逼近 0⁺)</span>
                  <span className="value">t = {limitT2.toFixed(2)}</span>
                </div>
                <input 
                  type="range" 
                  min="0.02" 
                  max="0.95" 
                  step="0.02" 
                  value={limitT2} 
                  onChange={(e) => setLimitT2(parseFloat(e.target.value))}
                  className="improper-slider-input" 
                />
              </div>
            ) : (
              <div className="improper-slider-item">
                <div className="improper-slider-label">
                  <span>積分上限 t (逼近 ∞)</span>
                  <span className="value">t = {limitT.toFixed(1)}</span>
                </div>
                <input 
                  type="range" 
                  min="1.5" 
                  max="25.0" 
                  step="0.5" 
                  value={limitT} 
                  onChange={(e) => setLimitT(parseFloat(e.target.value))}
                  className="improper-slider-input" 
                />
              </div>
            )}
          </div>

          {/* 結果與面板 */}
          <div className="improper-results-panel">
            <div className="improper-results-header">運算結果與歛散性分析</div>
            <div className="improper-results-content">
              <div className="improper-result-row">
                <span>當前定積分算式：</span>
                <span className="improper-result-value">
                  <InlineMath math={calculation.formula} />
                </span>
              </div>
              <div className="improper-result-row">
                <span>當前著色區間面積：</span>
                <span className="improper-result-value" style={{ fontFamily: 'monospace', fontSize: '13px' }}>
                  {calculation.currentVal}
                </span>
              </div>
              <div className="improper-result-row" style={{ borderTop: '1px dashed #99f6e4', paddingTop: '8px', marginTop: '4px' }}>
                <span>極限逼近目標：</span>
                <span className="improper-result-value">
                  <InlineMath math={`${calculation.limitFormula} = ${calculation.limitResult}`} />
                </span>
              </div>
              <div className="improper-result-row" style={{ marginTop: '4px' }}>
                <span>斂散性狀態：</span>
                <span className={`improper-badge ${calculation.isConvergent ? 'converge' : 'diverge'}`}>
                  {calculation.isConvergent ? '收斂 (Convergent)' : '發散 (Divergent)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// src/Integrals/TrigSubstitution.jsx
import React, { useState } from 'react';
import { InlineMath, BlockMath } from '../components/Math';
import './ProofBox.css';
import './TrigSubstitution.css';

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

export default function TrigSubstitution() {
  const [caseType, setCaseType] = useState('sine'); // 'sine' | 'tangent' | 'secant'
  const [a, setA] = useState(3);
  const [theta, setTheta] = useState(30); // 角度度數 (15 ~ 75)
  const [hoveredRatio, setHoveredRatio] = useState(null); // 'sin' | 'cos' | 'tan' | 'sec' | 'csc'

  const rad = (theta * Math.PI) / 180;
  const sinV = Math.sin(rad);
  const cosV = Math.cos(rad);
  const tanV = Math.tan(rad);
  const secV = 1 / cosV;

  // 計算動態 x 與根號值
  let xVal = 0;
  let radicalVal = 0;
  let xExpr = '';
  let radicalExpr = '';

  if (caseType === 'sine') {
    xVal = a * sinV;
    radicalVal = a * cosV;
    xExpr = `${a} \\sin\\theta`;
    radicalExpr = `\\sqrt{${a * a} - x^2} = ${a} \\cos\\theta`;
  } else if (caseType === 'tangent') {
    xVal = a * tanV;
    radicalVal = a * secV;
    xExpr = `${a} \\tan\\theta`;
    radicalExpr = `\\sqrt{${a * a} + x^2} = ${a} \\sec\\theta`;
  } else {
    // secant
    xVal = a * secV;
    radicalVal = a * tanV;
    xExpr = `${a} \\sec\\theta`;
    radicalExpr = `\\sqrt{x^2 - ${a * a}} = ${a} \\tan\\theta`;
  }

  // 直角三角形頂點 (Hypotenuse 長度固定為 220 像素)
  const hypLen = 220;
  const ax = 80;
  const ay = 240;
  const cx = ax + hypLen * cosV;
  const cy = ay;
  const bx = cx;
  const by = ay - hypLen * sinV;

  // 判斷是否需要高亮特定邊
  const isHypHighlighted =
    (caseType === 'sine' && (hoveredRatio === 'sin' || hoveredRatio === 'cos')) ||
    (caseType === 'tangent' && (hoveredRatio === 'sec' || hoveredRatio === 'sin')) ||
    (caseType === 'secant' && (hoveredRatio === 'sec' || hoveredRatio === 'sin'));

  const isOppHighlighted =
    (caseType === 'sine' && (hoveredRatio === 'sin' || hoveredRatio === 'tan')) ||
    (caseType === 'tangent' && (hoveredRatio === 'tan' || hoveredRatio === 'sin')) ||
    (caseType === 'secant' && (hoveredRatio === 'tan' || hoveredRatio === 'sin'));

  const isAdjHighlighted =
    (caseType === 'sine' && (hoveredRatio === 'cos' || hoveredRatio === 'tan')) ||
    (caseType === 'tangent' && (hoveredRatio === 'sec' || hoveredRatio === 'tan')) ||
    (caseType === 'secant' && (hoveredRatio === 'sec' || hoveredRatio === 'tan'));

  // 各邊的標籤內容
  let hypLabel = '';
  let oppLabel = '';
  let adjLabel = '';

  if (caseType === 'sine') {
    hypLabel = `a = ${a}`;
    oppLabel = `x = ${xVal.toFixed(2)}`;
    adjLabel = `\\sqrt{${a*a} - x^2} = ${radicalVal.toFixed(2)}`;
  } else if (caseType === 'tangent') {
    hypLabel = `\\sqrt{${a*a} + x^2} = ${radicalVal.toFixed(2)}`;
    oppLabel = `x = ${xVal.toFixed(2)}`;
    adjLabel = `a = ${a}`;
  } else {
    hypLabel = `x = ${xVal.toFixed(2)}`;
    oppLabel = `\\sqrt{x^2 - ${a*a}} = ${radicalVal.toFixed(2)}`;
    adjLabel = `a = ${a}`;
  }

  // 計算標籤位置 (稍微偏離邊線，避免重疊)
  const hypLabelX = (ax + bx) / 2 - 20 * sinV;
  const hypLabelY = (ay + by) / 2 - 20 * cosV;
  const oppLabelX = cx + 15;
  const oppLabelY = (cy + by) / 2;
  const adjLabelX = (ax + cx) / 2;
  const adjLabelY = cy + 22;

  // 角度弧線 (theta)
  const arcRadius = 35;
  const arcStartX = ax + arcRadius;
  const arcStartY = ay;
  const arcEndX = ax + arcRadius * cosV;
  const arcEndY = ay - arcRadius * sinV;
  const arcPath = `M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 0 0 ${arcEndX} ${arcEndY}`;

  return (
    <section className="subsection mt-12 pt-8 border-t border-gray-100">
      <h2 className="section-title text-2xl font-bold mb-4 border-b-2 border-violet-500 pb-2">
        4. 三角變換法 (Trigonometric Substitution)
      </h2>

      <p className="mb-6 text-gray-700 leading-relaxed">
        當積分式中含有根式如 <InlineMath math="\sqrt{a^2 - x^2}" />、
        <InlineMath math="\sqrt{a^2 + x^2}" /> 或 <InlineMath math="\sqrt{x^2 - a^2}" /> 時，
        一般的代換法（如 <InlineMath math="u" />-代換）通常難以奏效。
        此時，我們利用<strong>三角代換法 (Trigonometric Substitution)</strong>，
        將代數變數 <InlineMath math="x" /> 代換為三角函數，藉由<strong>畢氏三角恆等式</strong>消去根號，將問題轉化為較易求解的三角函數積分。
      </p>

      {/* 4.1 三大代換類型對照卡片 */}
      <div className="math-box mb-8 p-6 bg-violet-50 rounded-lg shadow-sm border border-violet-100">
        <h3 className="text-xl font-bold mb-4 text-violet-800 flex items-center">
          <span className="mr-2">📋</span> 4.1 三大三角代換類型對照
        </h3>

        <div className="trig-sub-cards-grid">
          {/* 類型 1 */}
          <div className="trig-sub-card">
            <div>
              <div className="trig-sub-card-tag">
                類型一：減算 (常數在前)
              </div>
              <h4 className="font-bold text-lg text-gray-800 mb-2">
                形如 <InlineMath math="\sqrt{a^2 - x^2}" />
              </h4>
              <ul className="text-xs text-gray-600 space-y-2 mb-4">
                <li>
                  🔑 <strong>令：</strong> <InlineMath math="x = a \sin\theta" />
                </li>
                <li>
                  ⚡ <strong>微分：</strong> <InlineMath math="dx = a \cos\theta \, d\theta" />
                </li>
                <li>
                  📐 <strong>恆等式：</strong> <InlineMath math="1 - \sin^2\theta = \cos^2\theta" />
                </li>
                <li>
                  🌟 <strong>簡化：</strong> <InlineMath math="\sqrt{a^2-x^2} = a\cos\theta" />
                </li>
                <li>
                  🌐 <strong>範圍：</strong> <InlineMath math="\theta \in [-\frac{\pi}{2}, \frac{\pi}{2}]" />
                </li>
              </ul>
            </div>
            <button
              onClick={() => { setCaseType('sine'); setTheta(30); }}
              className={`trig-sub-card-btn ${caseType === 'sine' ? 'active' : 'inactive'}`}
            >
              模擬此類型
            </button>
          </div>

          {/* 類型 2 */}
          <div className="trig-sub-card">
            <div>
              <div className="trig-sub-card-tag">
                類型二：加算
              </div>
              <h4 className="font-bold text-lg text-gray-800 mb-2">
                形如 <InlineMath math="\sqrt{a^2 + x^2}" />
              </h4>
              <ul className="text-xs text-gray-600 space-y-2 mb-4">
                <li>
                  🔑 <strong>令：</strong> <InlineMath math="x = a \tan\theta" />
                </li>
                <li>
                  ⚡ <strong>微分：</strong> <InlineMath math="dx = a \sec^2\theta \, d\theta" />
                </li>
                <li>
                  📐 <strong>恆等式：</strong> <InlineMath math="1 + \tan^2\theta = \sec^2\theta" />
                </li>
                <li>
                  🌟 <strong>簡化：</strong> <InlineMath math="\sqrt{a^2+x^2} = a\sec\theta" />
                </li>
                <li>
                  🌐 <strong>範圍：</strong> <InlineMath math="\theta \in (-\frac{\pi}{2}, \frac{\pi}{2})" />
                </li>
              </ul>
            </div>
            <button
              onClick={() => { setCaseType('tangent'); setTheta(45); }}
              className={`trig-sub-card-btn ${caseType === 'tangent' ? 'active' : 'inactive'}`}
            >
              模擬此類型
            </button>
          </div>

          {/* 類型 3 */}
          <div className="trig-sub-card">
            <div>
              <div className="trig-sub-card-tag">
                類型三：減算 (變數在前)
              </div>
              <h4 className="font-bold text-lg text-gray-800 mb-2">
                形如 <InlineMath math="\sqrt{x^2 - a^2}" />
              </h4>
              <ul className="text-xs text-gray-600 space-y-2 mb-4">
                <li>
                  🔑 <strong>令：</strong> <InlineMath math="x = a \sec\theta" />
                </li>
                <li>
                  ⚡ <strong>微分：</strong> <InlineMath math="dx = a \sec\theta \tan\theta \, d\theta" />
                </li>
                <li>
                  📐 <strong>恆等式：</strong> <InlineMath math="\sec^2\theta - 1 = \tan^2\theta" />
                </li>
                <li>
                  🌟 <strong>簡化：</strong> <InlineMath math="\sqrt{x^2-a^2} = a\tan\theta" />
                </li>
                <li>
                  🌐 <strong>範圍：</strong> <InlineMath math="\theta \in [0, \frac{\pi}{2}) \cup [\pi, \frac{3\pi}{2})" />
                </li>
              </ul>
            </div>
            <button
              onClick={() => { setCaseType('secant'); setTheta(60); }}
              className={`trig-sub-card-btn ${caseType === 'secant' ? 'active' : 'inactive'}`}
            >
              模擬此類型
            </button>
          </div>
        </div>
      </div>

      {/* 4.2 互動視覺化直角三角形 */}
      <div className="math-box mb-8 p-6 bg-slate-50 rounded-lg shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold mb-3 text-slate-800 flex items-center">
          <span className="mr-2">📐</span> 4.2 互動式參考直角三角形 (Reference Triangle)
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          積分完成後，我們必須將答案從對應的 <InlineMath math="\theta" /> 代回原變數 <InlineMath math="x" />。
          這時最簡單直覺的方法就是根據代換式<strong>繪製參考直角三角形</strong>。
          調整下方控制項，觀察三邊如何隨參數變化，並將游標移到下方的三角比上，高亮對應的三角形邊！
        </p>

        <div className="trig-sub-interactive-container">
          {/* 左側：SVG 三角形畫布 */}
          <div className="trig-sub-canvas-wrapper">
            <svg viewBox="0 0 380 300" className="w-full h-full">
              {/* 網格背景 (極輕) */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* 直角標記 */}
              <path
                d={`M ${cx - 15} ${cy} L ${cx - 15} ${cy - 15} L ${cx} ${cy - 15}`}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />

              {/* 鄰邊 (Adjacent) */}
              <line
                x1={ax}
                y1={ay}
                x2={cx}
                y2={cy}
                stroke={isAdjHighlighted ? '#a855f7' : '#64748b'}
                strokeWidth={isAdjHighlighted ? '5' : '3'}
                strokeLinecap="round"
                style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
              />

              {/* 對邊 (Opposite) */}
              <line
                x1={cx}
                y1={cy}
                x2={bx}
                y2={by}
                stroke={isOppHighlighted ? '#a855f7' : '#64748b'}
                strokeWidth={isOppHighlighted ? '5' : '3'}
                strokeLinecap="round"
                style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
              />

              {/* 斜邊 (Hypotenuse) */}
              <line
                x1={ax}
                y1={ay}
                x2={bx}
                y2={by}
                stroke={isHypHighlighted ? '#a855f7' : '#64748b'}
                strokeWidth={isHypHighlighted ? '5' : '3'}
                strokeLinecap="round"
                style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
              />

              {/* 頂點 A, B, C 的圓點 */}
              <circle cx={ax} cy={ay} r="5" fill="#475569" />
              <circle cx={bx} cy={by} r="5" fill="#475569" />
              <circle cx={cx} cy={cy} r="5" fill="#475569" />

              {/* 角度弧線 theta */}
              <path d={arcPath} fill="none" stroke="#6366f1" strokeWidth="2.5" />

              {/* 頂點標籤 */}
              <text x={ax - 15} y={ay + 5} fontSize="12" fontWeight="bold" fill="#475569">A</text>
              <text x={bx} y={by - 12} fontSize="12" fontWeight="bold" fill="#475569" textAnchor="middle">B</text>
              <text x={cx + 10} y={cy + 15} fontSize="12" fontWeight="bold" fill="#475569">C</text>

              {/* 角度標籤 theta */}
              <text
                x={ax + 42 * Math.cos(rad / 2)}
                y={ay - 42 * Math.sin(rad / 2) + 4}
                fontSize="14"
                fontWeight="bold"
                fill="#6366f1"
                textAnchor="middle"
              >
                θ
              </text>

              {/* 邊的標籤 */}
              {/* 斜邊 (Hypotenuse) */}
              <text
                x={hypLabelX}
                y={hypLabelY}
                fontSize="12"
                fontWeight={isHypHighlighted ? 'bold' : 'normal'}
                fill={isHypHighlighted ? '#7e22ce' : '#334155'}
                textAnchor="end"
              >
                {hypLabel.includes('\\') ? `斜邊` : hypLabel}
              </text>
              {/* 對邊 (Opposite) */}
              <text
                x={oppLabelX}
                y={oppLabelY + 4}
                fontSize="12"
                fontWeight={isOppHighlighted ? 'bold' : 'normal'}
                fill={isOppHighlighted ? '#7e22ce' : '#334155'}
                textAnchor="start"
              >
                {oppLabel.includes('\\') ? `對邊` : oppLabel}
              </text>
              {/* 鄰邊 (Adjacent) */}
              <text
                x={adjLabelX}
                y={adjLabelY}
                fontSize="12"
                fontWeight={isAdjHighlighted ? 'bold' : 'normal'}
                fill={isAdjHighlighted ? '#7e22ce' : '#334155'}
                textAnchor="middle"
              >
                {adjLabel.includes('\\') ? `鄰邊` : adjLabel}
              </text>
            </svg>
          </div>

          {/* 右側：滑桿控制項與數學資訊 */}
          <div className="trig-sub-controls-wrapper">
            {/* 類型切換標籤 */}
            <div className="trig-sub-switch-group">
              {[
                { type: 'sine', label: '減型 (x=a sinθ)' },
                { type: 'tangent', label: '加型 (x=a tanθ)' },
                { type: 'secant', label: '減型 (x=a secθ)' },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => {
                    setCaseType(item.type);
                    if (item.type === 'sine') setTheta(30);
                    else if (item.type === 'tangent') setTheta(45);
                    else setTheta(60);
                  }}
                  className={`trig-sub-switch-btn ${caseType === item.type ? 'active' : 'inactive'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* 控制項 */}
            <div className="trig-sub-sliders-box">
              <div className="trig-sub-slider-item">
                <div className="trig-sub-slider-label">
                  <span>常數變數 a</span>
                  <span className="value">a = {a}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="1"
                  value={a}
                  onChange={(e) => setA(parseInt(e.target.value))}
                  className="trig-sub-slider-input"
                />
              </div>

              <div className="trig-sub-slider-item">
                <div className="trig-sub-slider-label">
                  <span>角度 θ (度數)</span>
                  <span className="value">{theta}° (~ {(rad).toFixed(2)} rad)</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="75"
                  step="1"
                  value={theta}
                  onChange={(e) => setTheta(parseInt(e.target.value))}
                  className="trig-sub-slider-input"
                />
              </div>
            </div>

            {/* 當前代數值 */}
            <div className="trig-sub-values-panel">
              <div className="trig-sub-values-grid">
                <div className="trig-sub-value-box">
                  <span className="trig-sub-value-title">代換變數 x 關係式</span>
                  <div className="trig-sub-value-expr">
                    <InlineMath math={`x = ${xExpr}`} />
                  </div>
                  <span className="trig-sub-value-num">目前值: {xVal.toFixed(3)}</span>
                </div>
                <div className="trig-sub-value-box">
                  <span className="trig-sub-value-title">根式與三角化簡</span>
                  <div className="trig-sub-value-expr">
                    <InlineMath math={radicalExpr} />
                  </div>
                  <span className="trig-sub-value-num">目前值: {radicalVal.toFixed(3)}</span>
                </div>
              </div>
            </div>

            {/* 三角比對照 (含懸停互動) */}
            <div className="trig-sub-ratios-section">
              <span className="trig-sub-ratios-title">從三角形反推三角比（游標懸停看對應邊）</span>
              <div className="trig-sub-ratios-grid">
                {[
                  {
                    ratio: 'sin',
                    math: '\\sin\\theta = \\frac{\\text{對邊}}{\\text{斜邊}}',
                    expr: caseType === 'sine' ? 'x / a' : caseType === 'tangent' ? 'x / \\sqrt{a^2+x^2}' : '\\sqrt{x^2-a^2} / x',
                  },
                  {
                    ratio: 'cos',
                    math: '\\cos\\theta = \\frac{\\text{鄰邊}}{\\text{斜邊}}',
                    expr: caseType === 'sine' ? '\\sqrt{a^2-x^2} / a' : caseType === 'tangent' ? 'a / \\sqrt{a^2+x^2}' : 'a / x',
                  },
                  {
                    ratio: 'tan',
                    math: '\\tan\\theta = \\frac{\\text{對邊}}{\\text{鄰邊}}',
                    expr: caseType === 'sine' ? 'x / \\sqrt{a^2-x^2}' : caseType === 'tangent' ? 'x / a' : '\\sqrt{x^2-a^2} / a',
                  },
                  {
                    ratio: 'sec',
                    math: '\\sec\\theta = \\frac{\\text{斜邊}}{\\text{鄰邊}}',
                    expr: caseType === 'sine' ? 'a / \\sqrt{a^2-x^2}' : caseType === 'tangent' ? '\\sqrt{a^2+x^2} / a' : 'x / a',
                  },
                ].map((item) => (
                  <div
                    key={item.ratio}
                    onMouseEnter={() => setHoveredRatio(item.ratio)}
                    onMouseLeave={() => setHoveredRatio(null)}
                    className={`trig-sub-ratio-card ${hoveredRatio === item.ratio ? 'hovered' : ''}`}
                  >
                    <div className="trig-sub-ratio-name">{item.ratio.toUpperCase()}</div>
                    <div className="trig-sub-ratio-math">
                      <InlineMath math={item.math} />
                    </div>
                    <div className="trig-sub-ratio-expr">
                      <InlineMath math={item.expr} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4.3 經典範例 */}
      <div className="example-box mt-8 border-t-4 border-violet-500 shadow-md">
        <h3 className="example-title text-xl font-bold text-violet-900 mb-6 flex items-center">
          <span className="mr-2">📝</span> 4.3 經典範例演練
        </h3>

        <div className="space-y-8">
          {/* 範例 1 */}
          <div className="p-5 bg-violet-50 rounded-lg border border-violet-100">
            <p className="font-bold text-violet-900 mb-2">
              範例 1 (類型一 <InlineMath math="\sqrt{a^2-x^2}" /> 型)：計算定積分 <InlineMath math="\displaystyle\int \sqrt{9 - x^2} \, dx" />
            </p>
            <SolutionBox>
              <div className="text-sm text-gray-700 space-y-3">
                <p>
                  <strong>解題思維：</strong>
                  被積函數含有 <InlineMath math="\sqrt{9 - x^2}" />，此為類型一，其中常數項為 <InlineMath math="a^2 = 9 \Rightarrow a = 3" />。
                  我們令 <InlineMath math="x = 3 \sin\theta" />。
                </p>
                <hr className="my-2 border-violet-100" />
                <p><strong>Step 1：設定變換與微分</strong></p>
                <p>
                  令 <InlineMath math="x = 3 \sin\theta" />，其中限制 <InlineMath math="\theta \in [-\pi/2, \pi/2]" />。<br />
                  此時，對邊為 <InlineMath math="x" />，斜邊為 <InlineMath math="3" />，鄰邊即為根號項 <InlineMath math="\sqrt{9-x^2}" />。<br />
                  對其微分得到：
                </p>
                <BlockMath math="dx = 3 \cos\theta \, d\theta" />

                <p><strong>Step 2：化簡根號部分</strong></p>
                <p>利用畢氏三角恆等式消去根號：</p>
                <BlockMath math="\sqrt{9 - x^2} = \sqrt{9 - 9\sin^2\theta} = \sqrt{9(1 - \sin^2\theta)} = 3\sqrt{\cos^2\theta} = 3\cos\theta" />
                <p className="text-xs text-gray-500">
                  註：因 <InlineMath math="\theta \in [-\pi/2, \pi/2]" />，<InlineMath math="\cos\theta \ge 0" />，故可直接拿掉絕對值。
                </p>

                <p><strong>Step 3：代回積分式並求解</strong></p>
                <p>將代換後的式子完整代入原積分：</p>
                <BlockMath math="\int \sqrt{9 - x^2} \, dx = \int (3\cos\theta) \cdot (3\cos\theta \, d\theta) = 9 \int \cos^2\theta \, d\theta" />
                <p>利用半角公式 <InlineMath math="\cos^2\theta = \frac{1 + \cos(2\theta)}{2}" /> 降次：</p>
                <BlockMath math="= 9 \int \frac{1 + \cos(2\theta)}{2} \, d\theta = \frac{9}{2} \left( \theta + \frac{\sin(2\theta)}{2} \right) + C" />
                <p>利用二倍角公式展開 <InlineMath math="\sin(2\theta) = 2\sin\theta\cos\theta" />：</p>
                <BlockMath math="= \frac{9}{2} (\theta + \sin\theta\cos\theta) + C" />

                <p><strong>Step 4：畫直角三角形並回代原變數</strong></p>
                <p>
                  我們必須將以 <InlineMath math="\theta" /> 表示的答案代回原變數 <InlineMath math="x" />：
                </p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>由 <InlineMath math="x = 3\sin\theta" /> 可知，<InlineMath math="\sin\theta = \frac{x}{3} \Rightarrow \theta = \arcsin\left(\frac{x}{3}\right)" />。</li>
                  <li>從參考三角形中可知，鄰邊比斜邊為餘弦值：<InlineMath math="\cos\theta = \frac{\sqrt{9-x^2}}{3}" />。</li>
                </ul>
                <p>將此二關係式代入積分結果：</p>
                <BlockMath math="= \frac{9}{2} \left[ \arcsin\left(\frac{x}{3}\right) + \left(\frac{x}{3}\right)\left(\frac{\sqrt{9-x^2}}{3}\right) \right] + C" />
                <BlockMath math="= \frac{9}{2} \arcsin\left(\frac{x}{3}\right) + \frac{x\sqrt{9-x^2}}{2} + C" />
              </div>
            </SolutionBox>
          </div>

          {/* 範例 2 */}
          <div className="p-5 bg-violet-50 rounded-lg border border-violet-100">
            <p className="font-bold text-violet-900 mb-2">
              範例 2 (類型二 <InlineMath math="\sqrt{a^2+x^2}" /> 型)：計算不定積分 <InlineMath math="\displaystyle\int \frac{dx}{x^2 \sqrt{x^2 + 4}}" />
            </p>
            <SolutionBox>
              <div className="text-sm text-gray-700 space-y-3">
                <p>
                  <strong>解題思維：</strong>
                  被積函數分母含有根式 <InlineMath math="\sqrt{x^2+4}" />，為加算型態（類型二），其中 <InlineMath math="a^2 = 4 \Rightarrow a = 2" />。
                  我們令 <InlineMath math="x = 2 \tan\theta" />。
                </p>
                <hr className="my-2 border-violet-100" />
                <p><strong>Step 1：設定代換與微分</strong></p>
                <p>
                  令 <InlineMath math="x = 2\tan\theta" /> 且限制 <InlineMath math="\theta \in (-\pi/2, \pi/2)" />。<br />
                  此時，對邊為 <InlineMath math="x" />，鄰邊為 <InlineMath math="2" />，斜邊為 <InlineMath math="\sqrt{x^2+4}" />。<br />
                  兩邊微分得到：
                </p>
                <BlockMath math="dx = 2\sec^2\theta \, d\theta" />

                <p><strong>Step 2：化簡根號</strong></p>
                <BlockMath math="\sqrt{x^2 + 4} = \sqrt{4\tan^2\theta + 4} = 2\sqrt{\tan^2\theta + 1} = 2\sqrt{\sec^2\theta} = 2\sec\theta" />

                <p><strong>Step 3：代回積分式並簡化三角函數</strong></p>
                <BlockMath math="\int \frac{dx}{x^2\sqrt{x^2+4}} = \int \frac{2\sec^2\theta \, d\theta}{(2\tan\theta)^2 \cdot (2\sec\theta)} = \int \frac{2\sec^2\theta}{8\tan^2\theta\sec\theta} \, d\theta" />
                <BlockMath math="= \frac{1}{4} \int \frac{\sec\theta}{\tan^2\theta} \, d\theta" />
                <p>將三角函數轉化為正弦與餘弦：</p>
                <BlockMath math="\frac{\sec\theta}{\tan^2\theta} = \frac{1}{\cos\theta} \\cdot \\frac{\cos^2\theta}{\sin^2\theta} = \frac{\cos\theta}{\sin^2\theta}" />
                <p>因此積分變為：</p>
                <BlockMath math="= \frac{1}{4} \int \frac{\cos\theta}{\sin^2\theta} \, d\theta = \frac{1}{4} \int (\sin\theta)^{-2} d(\sin\theta)" />
                <BlockMath math="= \frac{1}{4} \left( -\\frac{1}{\sin\theta} \right) + C = -\\frac{1}{4} \\csc\\theta + C" />

                <p><strong>Step 4：利用直角三角形回代</strong></p>
                <p>
                  由設定 <InlineMath math="\tan\theta = \frac{x}{2}" /> 可畫出直角三角形，其中對邊為 <InlineMath math="x" />，鄰邊為 <InlineMath math="2" />，斜邊為 <InlineMath math="\sqrt{x^2+4}" />。<br />
                  我們需要餘割值 <InlineMath math="\csc\theta" />：
                </p>
                <BlockMath math="\csc\theta = \frac{\text{斜邊}}{\\text{對邊}} = \frac{\sqrt{x^2+4}}{x}" />
                <p>將此代回原積分結果，得到最終解：</p>
                <BlockMath math="= -\frac{\sqrt{x^2+4}}{4x} + C" />
              </div>
            </SolutionBox>
          </div>

          {/* 範例 3 */}
          <div className="p-5 bg-violet-50 rounded-lg border border-violet-100">
            <p className="font-bold text-violet-900 mb-2">
              範例 3 (類型三 <InlineMath math="\sqrt{x^2-a^2}" /> 型)：計算不定積分 <InlineMath math="\displaystyle\int \frac{\sqrt{x^2 - 9}}{x} \, dx" />
            </p>
            <SolutionBox>
              <div className="text-sm text-gray-700 space-y-3">
                <p>
                  <strong>解題思維：</strong>
                  被積函數分子含有根式 <InlineMath math="\sqrt{x^2 - 9}" />，為變數在前減常數形式（類型三），其中 <InlineMath math="a^2 = 9 \Rightarrow a = 3" />。
                  我們令 <InlineMath math="x = 3\sec\theta" />。
                </p>
                <hr className="my-2 border-violet-100" />
                <p><strong>Step 1：設定代換與微分</strong></p>
                <p>
                  令 <InlineMath math="x = 3\sec\theta" /> 且限制 <InlineMath math="\theta" /> 落在適當定義域（在此考慮第一象限 <InlineMath math="\theta \in [0, \pi/2)" /> 亦即 <InlineMath math="x \ge 3" />）。<br />
                  此時，斜邊為 <InlineMath math="x" />，鄰邊為 <InlineMath math="3" />，對邊即為 <InlineMath math="\sqrt{x^2-9}" />。<br />
                  微分得：
                </p>
                <BlockMath math="dx = 3\sec\theta\tan\theta \, d\theta" />

                <p><strong>Step 2：化簡根號</strong></p>
                <BlockMath math="\sqrt{x^2 - 9} = \sqrt{9\sec^2\theta - 9} = 3\sqrt{\sec^2\theta - 1} = 3\sqrt{\tan^2\theta} = 3\tan\theta" />

                <p><strong>Step 3：代回積分式並積分</strong></p>
                <BlockMath math="\int \frac{\sqrt{x^2-9}}{x} \, dx = \int \frac{3\tan\theta}{3\sec\theta} \cdot (3\sec\theta\tan\theta) \, d\theta" />
                <p>消去分子分母的 <InlineMath math="3\sec\theta" />，整理得到：</p>
                <BlockMath math="= 3 \int \tan^2\theta \, d\theta" />
                <p>利用恆等式 <InlineMath math="\tan^2\theta = \sec^2\theta - 1" /> 展開：</p>
                <BlockMath math="= 3 \int (\sec^2\theta - 1) \, d\theta = 3(\tan\theta - \theta) + C" />

                <p><strong>Step 4：利用三角形回代</strong></p>
                <p>
                  由設定 <InlineMath math="\sec\theta = \frac{x}{3}" /> 知，對應三角形鄰邊為 <InlineMath math="3" />，斜邊為 <InlineMath math="x" />，對邊為 <InlineMath math="\sqrt{x^2-9}" />：
                </p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>正切值為對邊比鄰邊：<InlineMath math="\tan\theta = \frac{\sqrt{x^2-9}}{3}" />。</li>
                  <li>角度可從餘弦反推：<InlineMath math="\cos\theta = \frac{3}{x} \Rightarrow \theta = \arccos\left(\frac{3}{x}\right)" />（或寫作 <InlineMath math="\sec^{-1}(x/3)" />）。</li>
                </ul>
                <p>將兩者代回，整理得到答案：</p>
                <BlockMath math="= 3 \left( \frac{\sqrt{x^2-9}}{3} - \arccos\left(\frac{3}{x}\right) \right) + C" />
                <BlockMath math="= \sqrt{x^2-9} - 3\arccos\left(\frac{3}{x}\right) + C" />
              </div>
            </SolutionBox>
          </div>
        </div>
      </div>

      {/* 4.4 常見錯誤與解題心法 */}
      <div className="trig-sub-error-box">
        <h3 className="trig-sub-error-title">
          <span className="mr-2">⚠️</span> 4.4 常見錯誤與陷阱提醒
        </h3>
        <ul className="trig-sub-error-list">
          <li className="trig-sub-error-item">
            <span className="trig-sub-error-marker">✗</span>
            <div className="trig-sub-error-text">
              <h5>漏掉微分量 dx 的變換：</h5>
              <p>代換時必須將 <InlineMath math="dx" /> 計算完整（如 <InlineMath math="a\cos\theta \, d\theta" />），許多同學會直接把 <InlineMath math="dx" /> 寫成 <InlineMath math="d\theta" />，這是非常嚴重的錯誤。</p>
            </div>
          </li>
          <li className="trig-sub-error-item">
            <span className="trig-sub-error-marker">✗</span>
            <div className="trig-sub-error-text">
              <h5>忘記回代原變數：</h5>
              <p>不定積分的答案必須以原自變數 <InlineMath math="x" /> 表達，不可直接交出以 <InlineMath math="\theta" /> 表示的三角函數答案。請養成畫直角三角形輔助回代的習慣。</p>
            </div>
          </li>
          <li className="trig-sub-error-item">
            <span className="trig-sub-error-marker">✗</span>
            <div className="trig-sub-error-text">
              <h5>定積分忘記變更積分界限：</h5>
              <p>如果題目是定積分，在代換變數後，積分的上界與下界也必須同步轉化為對應的 <InlineMath math="\theta" /> 值，或算完不定積分再回代代入原本的 <InlineMath math="x" /> 界限值。</p>
            </div>
          </li>
        </ul>
      </div>

      {/* 心法小結 */}
      <div className="trig-sub-summary-box">
        <h3 className="trig-sub-summary-title">💡 4.5 三角變換法解題心法</h3>
        <p className="trig-sub-summary-text">
          三角變換法的關鍵在於<strong>「去根號」</strong>。
          觀察被積式中的根式外型來決定使用哪種三角公式，通常以<strong>「減型常數在前（sin）」</strong>、
          <strong>「加型（tan）」</strong>與<strong>「減型變數在前（sec）」</strong>做分類。
          熟記直角三角形三邊定義，不但能幫你記住代換公式，更能幫助你在最後一步迅速且正確地代回原本的代數形式。
        </p>
      </div>
    </section>
  );
}

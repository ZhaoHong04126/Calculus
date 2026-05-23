// src/Functions/ExpLogFunctions.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { InlineMath, BlockMath } from '../components/Math';
import FunctionGraph from '../components/FunctionGraph';

export default function ExpLogFunctions() {
  return (
    <section className="subsection mt-12">
      <h2 className="section-title text-2xl font-bold mb-4 border-b-2 border-green-500 pb-2">4. 指數與對數函數 (Exponential and Logarithmic Functions)</h2>
      
      <p className="mb-4 text-gray-700">
        指數函數與對數函數是微積分中最核心的超越函數。在探討它們的微積分性質之前，我們必須先釐清它們的代數定義與幾何行為。
      </p>

      {/* ==========================================
          2.1 指數函數
      ========================================== */}
      <div className="math-box mb-8 p-6 bg-green-50 rounded-lg shadow-sm border border-green-200">
        <h3 className="text-xl font-bold mb-3 text-green-800">4.1 指數函數 (Exponential Functions)</h3>
        <p className="mb-4 text-gray-800">
          一般形式的指數函數定義為 <InlineMath math="f(x) = a^x" />，其中底數 <InlineMath math="a > 0" /> 且 <InlineMath math="a \neq 1" />。
          根據底數 <InlineMath math="a" /> 的不同，函數圖形分為「指數成長」與「指數衰退」兩種情形。
        </p>

        {/* 雙欄圖表 */}
        <div className="concept-grid">
          <div className="concept-card diff-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>指數成長 (<InlineMath math="a > 1" />)</h4>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>例如：<InlineMath math="y = 2^x" /></p>
            <div style={{ width: '100%' }}>
               <FunctionGraph 
                 f={(x) => Math.pow(2, x)} 
                 segments={[[-3, 3]]} range={[0, 4]} 
                 color="#22c55e" xAxisTicks={[-2, 2]} yAxisTicks={[1, 2, 4]}
                 xAxisLabels={["-2", "2"]} yAxisLabels={["1", "2", "4"]}
                 asymptotesY={[0]}
                 height={140}
               />
            </div>
            <p style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '0.5rem' }}>特徵：單調遞增，有一水平漸近線 <InlineMath math="y=0" />。</p>
          </div>
          
          <div className="concept-card diff-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>指數衰退 (<InlineMath math="0 < a < 1" />)</h4>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>例如：<InlineMath math="y = (1/2)^x" /></p>
            <div style={{ width: '100%' }}>
               <FunctionGraph 
                 f={(x) => Math.pow(0.5, x)} 
                 segments={[[-3, 3]]} range={[0, 4]} 
                 color="#14b8a6" xAxisTicks={[-2, 2]} yAxisTicks={[1, 2, 4]}
                 xAxisLabels={["-2", "2"]} yAxisLabels={["1", "2", "4"]}
                 asymptotesY={[0]}
                 height={140}
               />
            </div>
            <p style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '0.5rem' }}>特徵：單調遞減，有一水平漸近線 <InlineMath math="y=0" />。</p>
          </div>
        </div>

        <h4 style={{ marginTop: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>如何定義 <InlineMath math="a^x" /> 當 <InlineMath math="x" /> 是無理數？</h4>
        <p className="text-sm text-gray-700 mb-2">
          為了確保指數函數在整個實數線上都是連續且平滑的，數學家是逐漸擴充次方的意義的：
        </p>
        <ul className="list-decimal list-inside space-y-2 text-sm text-gray-800 mb-4 bg-white p-4 rounded border border-green-100">
          <li><strong>正整數：</strong>連乘的概念，<InlineMath math="a^n = a \times \dots \times a" />。</li>
          <li><strong>零與負數：</strong><InlineMath math="a^0 = 1" />，<InlineMath math="a^{-n} = \frac{1}{a^n}" />。</li>
          <li><strong>有理數：</strong>結合次冪與開根號，<InlineMath math="a^{q/p} = \sqrt[p]{a^q}" />。</li>
          <li><strong>無理數：</strong>利用極限逼近。例如 <InlineMath math="x = \sqrt{3}" />，我們用數列 <InlineMath math="1.7, 1.73, 1.732 \dots" /> 去逼近它。保證圖形不發生斷點。</li>
        </ul>

      </div>

      {/* ==========================================
          2.2 對數函數
      ========================================== */}
      <div className="math-box mb-8 p-6 bg-cyan-50 rounded-lg shadow-sm border border-cyan-200">
        <h3 className="text-xl font-bold mb-3 text-cyan-800">4.2 對數函數 (Logarithmic Functions)</h3>
        <p className="mb-4 text-gray-800">
          對數函數是指數函數的<strong>反函數</strong>。由於不論是生長還是衰退的指數函數，都能通過水平線測試（是一對一函數），因此它們具有反函數。
        </p>
        
        <div className="bg-white p-4 rounded border border-cyan-100 mb-4">
          <BlockMath math="y = \log_a x \iff a^y = x" />
          <p className="text-center text-sm text-gray-500 mt-2">(<InlineMath math="a > 0, a \neq 1, x > 0" />)</p>
        </div>

        <div>
          <p className="mb-2 text-gray-800 text-sm">
            對數函數的圖形是指數函數圖形沿著斜直線 <InlineMath math="y=x" /> 翻轉而來。
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2 mb-4 p-4 bg-white rounded border border-cyan-100" style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '0.25rem', border: '1px solid #cffafe', marginBottom: '1rem' }}>
            <li><strong>定義域：</strong> <InlineMath math="(0, \infty)" />（對數的真數必為正數）</li>
            <li><strong>值域：</strong> 實數集合 <InlineMath math="\mathbb{R}" /></li>
            <li><strong>垂直漸近線：</strong> <InlineMath math="x = 0" />（y 軸）</li>
            <li><strong>必過點：</strong> <InlineMath math="(1, 0)" />（因為 <InlineMath math="\log_a 1 = 0" />）</li>
          </ul>
        </div>

        <div className="concept-grid" style={{ marginBottom: '1.5rem' }}>
          <div className="concept-card int-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>對數函數 (<InlineMath math="a > 1" />)</h4>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>例如：<InlineMath math="y = \log_2 x" /></p>
            <div style={{ width: '100%' }}>
               <FunctionGraph 
                 f={(x) => Math.log(x) / Math.log(2)} 
                 segments={[[0.05, 4]]} range={[-3, 2]} 
                 color="#06b6d4" xAxisTicks={[1, 2, 4]} yAxisTicks={[-2, 2]}
                 xAxisLabels={["1", "2", "4"]} yAxisLabels={["-2", "2"]}
                 asymptotesX={[0]}
                 height={140}
               />
            </div>
            <p style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '0.5rem' }}>特徵：單調遞增，有一垂直漸近線 <InlineMath math="x=0" />。</p>
          </div>

          <div className="concept-card int-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>對數函數 (<InlineMath math="0 < a < 1" />)</h4>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>例如：<InlineMath math="y = \log_{1/2} x" /></p>
            <div style={{ width: '100%' }}>
               <FunctionGraph 
                 f={(x) => -Math.log(x) / Math.log(2)} 
                 segments={[[0.05, 4]]} range={[-2, 3]} 
                 color="#3b82f6" xAxisTicks={[1, 2, 4]} yAxisTicks={[-2, 2]}
                 xAxisLabels={["1", "2", "4"]} yAxisLabels={["-2", "2"]}
                 asymptotesX={[0]}
                 height={140}
               />
            </div>
            <p style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '0.5rem' }}>特徵：單調遞減，有一垂直漸近線 <InlineMath math="x=0" />。</p>
          </div>
        </div>

      </div>

      {/* ==========================================
          2.3 尤拉數 e 與自然對數
      ========================================== */}
      <div className="math-box p-6 bg-yellow-50 rounded-lg shadow-sm border border-yellow-200">
        <h3 className="text-xl font-bold mb-3 text-yellow-800">4.3 尤拉數 <InlineMath math="e" /> 與自然對數</h3>
        
        <div className="concept-grid">
          <div className="concept-card diff-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderColor: '#fef08a', backgroundColor: '#fefce8' }}>
            <h4 style={{ fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.25rem' }}>神奇的自然常數 <InlineMath math="e" /></h4>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: '#4b5563' }}>
              在所有可能的底數中，有一個特別的數 <InlineMath math="a" /> 會使得指數函數過 <InlineMath math="(0, 1)" /> 的切線斜率恰好等於 1。這個數學上最完美的底數，被稱為「尤拉數」 <InlineMath math="e \approx 2.71828" />。
            </p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.75rem', color: '#1f2937', fontWeight: 'bold' }}>極限嚴格定義：</p>
            <BlockMath math="e = \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n" />
          </div>

          <div className="concept-card int-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderColor: '#fef08a', backgroundColor: '#fefce8' }}>
            <h4 style={{ fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.25rem' }}>自然對數 (Natural Logarithm)</h4>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: '#4b5563' }}>
              以 <InlineMath math="e" /> 為底的對數函數稱為自然對數，數學上習慣記為 <InlineMath math="\ln x" />。它是 <InlineMath math="e^x" /> 的反函數：
            </p>
            <BlockMath math="\ln x = \log_e x" />
            <p className="text-sm mt-3 text-gray-800 font-bold">重要的對消性質 (Cancellation Equations)：</p>
            <ul className="list-disc list-inside mt-1 text-sm text-gray-700 bg-gray-50 p-2 rounded">
              <li><InlineMath math="\ln(e^x) = x" /> (對所有 <InlineMath math="x" />)</li>
              <li><InlineMath math="e^{\ln x} = x" /> (當 <InlineMath math="x > 0" />)</li>
            </ul>
          </div>
        </div>
      </div>

    </section>
  );
}
import React from 'react';
import { InlineMath, BlockMath } from '../components/Math';
import DiscontinuityVisualizer from './DiscontinuityVisualizer';
import './Continuity.css';

const ProofBox = ({ title = "查看證明", children }) => {
  return (
    <details className="proof-box">
      <summary>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '8px', fontSize: '18px' }}>📝</span>
          {title}
        </div>
        <div>
          <span className="proof-toggle-btn expand-text">展開證明 ▼</span>
          <span className="proof-toggle-btn collapse-text">收起證明 ▲</span>
        </div>
      </summary>
      <div className="proof-content">
        {children}
      </div>
    </details>
  );
};

export default function ContinuityBasics() {
  return (
    <section className="subsection mt-12">
      <h2 className="section-title text-2xl font-bold mb-4 border-b-2 border-emerald-500 pb-2">1. 連續的定義與判定</h2>
      
      <p className="mb-4 text-gray-700">
        在了解極限的概念後，我們可以來精確定義一個函數在某一點或某個區間內是否「連續」。直觀上，如果一個函數的圖形可以「一筆畫完」而不需要抬起筆，我們就說它是連續的。
      </p>

      {/* 1.1 連續的三條件 */}
      <div className="math-box mb-6 p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold mb-3 text-blue-800">1.1 連續的嚴格定義</h3>
        <p className="mb-2 text-gray-800">
          我們說函數 <InlineMath math="f(x)" /> 在點 <InlineMath math="x = a" /> 處連續 (continuous at <InlineMath math="a" />)，必須<strong>同時滿足</strong>以下三個條件：
        </p>
        <ol className="list-decimal list-inside space-y-3 mt-4 text-gray-800">
          <li><strong>函數有定義：</strong> <InlineMath math="f(a)" /> 必須存在（為一實數）。</li>
          <li><strong>極限存在：</strong> 雙側極限 <InlineMath math="\lim_{x \to a} f(x)" /> 必須存在。</li>
          <li><strong>極限等於函數值：</strong> 這是最核心的條件，代表圖形沒有破洞也沒有錯位：
            <div className="my-2 p-3 bg-white border border-gray-200 rounded">
              <BlockMath math="\lim_{x \to a} f(x) = f(a)" />
            </div>
          </li>
        </ol>
        <p className="mt-4 text-sm text-gray-700 border-t border-gray-300 pt-3">
          如果上述任何一個條件不滿足，我們就說函數在 <InlineMath math="x = a" /> 處<strong>不連續 (Discontinuous)</strong>。
        </p>
      </div>

      {/* 1.2 不連續的種類 */}
      <div className="math-box mb-6 p-6 bg-blue-50 rounded-lg shadow-sm border border-blue-200">
        <h3 className="text-xl font-bold mb-3 text-blue-800">1.2 不連續點的種類</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white border-l-4 border-blue-500 shadow-sm rounded border border-blue-100">
            <strong className="block text-gray-800 mb-2">1.2.1 可移除不連續<br/>(Removable)</strong>
            <p className="text-sm text-gray-600">
              極限 <InlineMath math="\lim_{x \to a} f(x)" /> 存在，但是函數在該點沒有定義，或是極限值不等於 <InlineMath math="f(a)" />。圖形上看起來像是有一個「洞」。我們可以藉由重新定義該點的值來修補它。
            </p>
          </div>
          <div className="p-4 bg-white border-l-4 border-yellow-500 shadow-sm rounded border border-blue-100">
            <strong className="block text-gray-800 mb-2">1.2.2 跳躍不連續<br/>(Jump)</strong>
            <p className="text-sm text-gray-600">
              左極限與右極限都存在，但是它們<strong>不相等</strong>。圖形上看起來像是一個階梯狀的斷層，無法透過補一個點來修復。常見於分段函數 (Piecewise Functions)。
            </p>
          </div>
          <div className="p-4 bg-white border-l-4 border-red-500 shadow-sm rounded border border-blue-100">
            <strong className="block text-gray-800 mb-2">1.2.3 無窮不連續<br/>(Infinite)</strong>
            <p className="text-sm text-gray-600">
              函數在該點的左極限或右極限趨近於正負無窮大。也就是說，該點剛好發生了垂直漸近線。例如 <InlineMath math="f(x) = \frac{1}{x}" /> 在 <InlineMath math="x=0" /> 處的不連續。
            </p>
          </div>
        </div>
        
        {/* ✨ 可伸縮的互動探索區塊，樣式同 ProofBox */}
        <details className="proof-box" open>
          <summary>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px', fontSize: '18px' }}>🖱️</span>
              互動探索：不連續的種類
            </div>
            <div>
              <span className="proof-toggle-btn expand-text">展開互動 ▼</span>
              <span className="proof-toggle-btn collapse-text">收起互動 ▲</span>
            </div>
          </summary>
          <div className="proof-content">
            <DiscontinuityVisualizer />
          </div>
        </details>
      </div>

    </section>
  );
}
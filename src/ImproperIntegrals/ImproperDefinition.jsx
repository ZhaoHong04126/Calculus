import React from 'react';
import { InlineMath } from '../components/Math';

export default function ImproperDefinition() {
  return (
    <section className="subsection">
      <h2 className="section-title">
        10.1 瑕積分的定義與分類
      </h2>
      <p className="subsection-intro" style={{ marginBottom: '20px', color: '#334155', lineHeight: '1.6' }}>
        定積分 <InlineMath math="\int_a^b f(x) \, dx" /> 要求積分區間 <InlineMath math="[a, b]" /> 必須是<strong>有限區間</strong>，且被積函數 <InlineMath math="f(x)" /> 必須是<strong>有界函數</strong>。
        當上述兩個條件之一不滿足時，該積分就稱為<strong>瑕積分 (Improper Integral)</strong>。瑕積分可分為兩大類：
      </p>

      <div className="improper-cards-grid">
        {/* Card 1 */}
        <div className="improper-card">
          <div>
            <span className="improper-card-tag">第一類 (Type I)</span>
            <h4>無窮區間的瑕積分</h4>
            <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px', fontFamily: 'serif' }}>Infinite Intervals</p>
            <ul style={{ listStyle: 'disc', paddingLeft: '18px', fontSize: '13px', color: '#475569' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>上限無窮：</strong>
                <div className="comparison-step-formula-container" style={{ display: 'block', margin: '4px 0', textAlign: 'center' }}>
                  <InlineMath math="\int_a^\infty f(x) \, dx = \lim_{t \to \infty} \int_a^t f(x) \, dx" />
                </div>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>下限無窮：</strong>
                <div className="comparison-step-formula-container" style={{ display: 'block', margin: '4px 0', textAlign: 'center' }}>
                  <InlineMath math="\int_{-\infty}^b f(x) \, dx = \lim_{t \to -\infty} \int_t^b f(x) \, dx" />
                </div>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>雙端無窮：</strong> 若兩側極限各自收斂：
                <div className="comparison-step-formula-container" style={{ display: 'block', margin: '4px 0', textAlign: 'center' }}>
                  <InlineMath math="\int_{-\infty}^\infty f(x) \, dx = \int_{-\infty}^c f(x) \, dx + \int_c^\infty f(x) \, dx" />
                </div>
              </li>
            </ul>
          </div>
          <p style={{ fontSize: '12px', color: '#0d9488', backgroundColor: '#f0fdfa', padding: '10px', borderRadius: '8px', border: '1px solid #ccfbf1', marginTop: '12px' }}>
            💡 若極限存在且為有限值，稱該瑕積分<strong>收斂 (Converge)</strong>；若極限不存在或為無窮大，則稱該瑕積分<strong>發散 (Diverge)</strong>。
          </p>
        </div>

        {/* Card 2 */}
        <div className="improper-card" style={{ borderColor: '#ffe4e6' }}>
          <div>
            <span className="improper-card-tag" style={{ color: '#e11d48', backgroundColor: '#fff1f2' }}>第二類 (Type II)</span>
            <h4>無界函數的瑕積分 (包含瑕點)</h4>
            <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px', fontFamily: 'serif' }}>Discontinuous Integrands</p>
            <ul style={{ listStyle: 'disc', paddingLeft: '18px', fontSize: '13px', color: '#475569' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>下限為瑕點：</strong> 若在 <InlineMath math="x = a" /> 處函數無界：
                <div className="comparison-step-formula-container" style={{ display: 'block', margin: '4px 0', textAlign: 'center' }}>
                  <InlineMath math="\int_a^b f(x) \, dx = \lim_{t \to a^+} \int_t^b f(x) \, dx" />
                </div>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>上限為瑕點：</strong> 若在 <InlineMath math="x = b" /> 處函數無界：
                <div className="comparison-step-formula-container" style={{ display: 'block', margin: '4px 0', textAlign: 'center' }}>
                  <InlineMath math="\int_a^b f(x) \, dx = \lim_{t \to b^-} \int_a^t f(x) \, dx" />
                </div>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>內部有瑕點：</strong> 若在 <InlineMath math="c \in (a, b)" /> 處函數無界：
                <div className="comparison-step-formula-container" style={{ display: 'block', margin: '4px 0', textAlign: 'center' }}>
                  <InlineMath math="\int_a^b f(x) \, dx = \int_a^c f(x) \, dx + \int_c^b f(x) \, dx" />
                </div>
              </li>
            </ul>
          </div>
          <p style={{ fontSize: '12px', color: '#9f1239', backgroundColor: '#fff1f2', padding: '10px', borderRadius: '8px', border: '1px solid #ffe4e6', marginTop: '12px' }}>
            ⚠️ 注意：計算第二類瑕積分時，必須非常小心尋找函數的「垂直漸近線」，否則極易漏掉極限運算。
          </p>
        </div>
      </div>
    </section>
  );
}

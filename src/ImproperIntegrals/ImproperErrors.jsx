import React from 'react';
import { InlineMath } from '../components/Math';

export default function ImproperErrors() {
  return (
    <section className="subsection">
      <h2 className="section-title">
        10.4 常見錯誤與陷阱
      </h2>
      <p className="subsection-intro" style={{ marginBottom: '20px', color: '#334155', lineHeight: '1.6' }}>
        瑕積分的計算看似只是求反導函數並帶入極限，但許多不易察覺的數學條件往往是考試和研究中的「致命陷阱」。
      </p>

      <div className="improper-error-box">
        <div className="improper-error-title">
          <span style={{ fontSize: '20px' }}>⚠️</span> 經典陷阱與解析
        </div>
        <ul className="improper-error-list">
          <li className="improper-error-item">
            <span className="improper-error-marker">[陷阱 1]</span>
            <div className="improper-error-text">
              <h5>直接套用微積分基本定理，忽略區間內有垂直漸近線 (瑕點)</h5>
              <p>
                考慮積分 <InlineMath math="\int_{-1}^{1} \frac{1}{x^2} \, dx" />。若直接計算：
              </p>
              <div className="improper-error-formula">
                <InlineMath math="\int_{-1}^{1} x^{-2} \, dx = \left[ -x^{-1} \right]_{-1}^{1} = -1 - (1) = -2 \quad (\text{錯誤！})" />
              </div>
              <p>
                <strong>解析：</strong> 被積函數 <InlineMath math="1/x^2 \ge 0" /> 在對稱區間內皆為正值，積分所得面積不可能為負數。
                錯誤在於該函數在 <InlineMath math="x = 0" /> 處無界，屬於第二類瑕積分。正確做法是將其拆分為兩段：
              </p>
              <div className="improper-error-formula">
                <InlineMath math="\int_{-1}^{1} \frac{1}{x^2} \, dx = \int_{-1}^{0} \frac{1}{x^2} \, dx + \int_{0}^{1} \frac{1}{x^2} \, dx" />
              </div>
              <p>
                由於 <InlineMath math="\int_0^1 x^{-2} \, dx = \lim_{t \to 0^+} [ -1/x ]_t^1 = \infty" />（發散），只要其中一段發散，整體即為<strong>發散</strong>。
              </p>
            </div>
          </li>

          <li className="improper-error-item" style={{ borderTop: '1px dashed #fed7d7', paddingTop: '15px' }}>
            <span className="improper-error-marker">[陷阱 2]</span>
            <div className="improper-error-text">
              <h5>認為對稱無窮區間的奇函數積分一定會抵消為零</h5>
              <p>
                考慮積分 <InlineMath math="\int_{-\infty}^{\infty} x \, dx" />。若直覺認為 <InlineMath math="y = x" /> 為奇函數而宣告：
              </p>
              <div className="improper-error-formula">
                <InlineMath math="\int_{-\infty}^{\infty} x \, dx = 0 \quad (\text{錯誤！})" />
              </div>
              <p>
                <strong>解析：</strong> 根據第一類雙端無窮區間定義，必須滿足兩個半邊極限<strong>獨立收斂</strong>。意即：
              </p>
              <div className="improper-error-formula">
                <InlineMath math="\int_{-\infty}^{\infty} x \, dx = \lim_{a \to -\infty} \int_a^0 x \, dx + \lim_{b \to \infty} \int_0^b x \, dx" />
              </div>
              <p>
                由於 <InlineMath math="\lim_{b \to \infty} [ \frac{1}{2} x^2 ]_0^b = \infty" />，半邊發散即代表整體為<strong>發散</strong>。
                （雖然 Cauchy 主值意義下 <InlineMath math="\lim_{t \to \infty} \int_{-t}^{t} x \, dx = 0" />，但在一般微積分定義中，此積分仍定為發散）。
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

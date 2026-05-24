import React from 'react';
import { InlineMath, BlockMath } from '../components/Math';

export default function ImproperComparison() {
  return (
    <section className="subsection">
      <h2 className="section-title">
        10.3 審斂法：比較審斂法
      </h2>
      <p className="subsection-intro" style={{ marginBottom: '20px', color: '#334155', lineHeight: '1.6' }}>
        有許多被積函數我們難以直接求出反導函數來進行極限計算。
        此時，我們可以使用<strong>比較審斂法 (Comparison Tests)</strong>，將其與形狀簡單、已知斂散性的參考函數（如 <InlineMath math="p" />-積分）進行對比，判定其收斂性。
      </p>

      {/* 比較審斂法卡片 */}
      <div className="improper-comparison-container">
        <div className="improper-comparison-title">常見的比較審斂法</div>
        <div className="comparison-section">
          
          {/* Card 1: 直接比較 */}
          <div className="comparison-method-card">
            <div className="comparison-method-header">
              <span className="comparison-method-badge teal">方法 1</span>
              <h4 className="comparison-method-title">直接比較審斂法 (Direct Comparison Test)</h4>
            </div>
            <p className="comparison-intro-text">
              適用於當被積函數與已知斂散性的簡單函數具有明顯的<strong>大小不等關係</strong>時。
            </p>
            
            <div className="comparison-box-gray">
              <span className="comparison-box-title">定理條件</span>
              <p className="comparison-step-item">
                假設在積分區間內，函數滿足：
              </p>
              <BlockMath math="0 \le f(x) \le g(x)" />
              <div className="comparison-rules-grid">
                <div className="comparison-rule-card converge">
                  <strong>👍 大收則小收：</strong>
                  若大函數收斂 <InlineMath math="\int_a^\infty g(x)\,dx" /> 收斂，則小函數 <InlineMath math="\int_a^\infty f(x)\,dx" /> 必收斂。
                </div>
                <div className="comparison-rule-card diverge">
                  <strong>👎 小發則大發：</strong>
                  若小函數發散 <InlineMath math="\int_a^\infty f(x)\,dx" /> 發散，則大函數 <InlineMath math="\int_a^\infty g(x)\,dx" /> 必發散。
                </div>
              </div>
            </div>

            {/* 範例 */}
            <div className="comparison-example-container">
              <div className="comparison-example-box">
                <div className="comparison-example-title">💡 精選範例</div>
                <div className="comparison-step-item" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                  題目：判定 <InlineMath math="\int_1^\infty \frac{1}{x^2 + e^x} \, dx" /> 的收斂性。
                </div>
                <div className="comparison-steps">
                  <div className="comparison-step-item">
                    <strong>步驟 1：尋找比較對象。</strong><br />
                    因為對任意 <InlineMath math="x \ge 1" />，分母 <InlineMath math="x^2 + e^x > x^2" />，故可得出不等式：
                    <div className="comparison-step-formula-container">
                      <InlineMath math="0 < \frac{1}{x^2 + e^x} < \frac{1}{x^2}" />
                    </div>
                  </div>
                  <div className="comparison-step-item">
                    <strong>步驟 2：已知基準函數狀態。</strong><br />
                    我們知道參考函數的積分：
                    <div className="comparison-step-formula-container">
                      <InlineMath math="\int_1^\infty \frac{1}{x^2} \, dx" />
                    </div>
                    此為 <InlineMath math="p=2 > 1" /> 的 <InlineMath math="p" />-積分，因此它是<strong>收斂</strong>的。
                  </div>
                  <div className="comparison-step-item">
                    <strong>步驟 3：下結論。</strong><br />
                    依據「直接比較審斂法」（大函數收斂，則小函數也收斂），原積分 <InlineMath math="\int_1^\infty \frac{1}{x^2 + e^x} \, dx" /> 必<strong>收斂</strong>。
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 極限比較 */}
          <div className="comparison-method-card">
            <div className="comparison-method-header">
              <span className="comparison-method-badge blue">方法 2</span>
              <h4 className="comparison-method-title">極限比較審斂法 (Limit Comparison Test)</h4>
            </div>
            <p className="comparison-intro-text">
              適用於被積函數較複雜，但當 <InlineMath math="x" /> 極大時，可以輕易看出<strong>主導項 (Leading terms)</strong> 時。
            </p>
            
            <div className="comparison-box-gray">
              <span className="comparison-box-title">定理條件</span>
              <p className="comparison-step-item">
                假設在積分區間內 <InlineMath math="f(x) > 0, g(x) > 0" />，且比值的極限為一有限正數：
              </p>
              <BlockMath math="\lim_{x \to \infty} \frac{f(x)}{g(x)} = L \quad (0 < L < \infty)" />
              <div className="comparison-rule-card converge" style={{ marginTop: '12px', textAlign: 'center', backgroundColor: '#eff6ff', color: '#1e3a8a', borderColor: '#bfdbfe' }}>
                <strong>🎯 斂散性命運相同：</strong>
                <InlineMath math="\int_a^\infty f(x)\,dx" /> 與 <InlineMath math="\int_a^\infty g(x)\,dx" /> 會同時收斂或同時發散。
              </div>
            </div>

            {/* 範例 */}
            <div className="comparison-example-container">
              <div className="comparison-example-box">
                <div className="comparison-example-title">💡 精選範例</div>
                <div className="comparison-step-item" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                  題目：判定 <InlineMath math="\int_1^\infty \frac{x^2 + 1}{x^4 - x + 2} \, dx" /> 的收斂性。
                </div>
                <div className="comparison-steps">
                  <div className="comparison-step-item">
                    <strong>步驟 1：尋找主導項，決定比較對象。</strong><br />
                    當 <InlineMath math="x \to \infty" /> 時，分子主導項為 <InlineMath math="x^2" />，分母主導項為 <InlineMath math="x^4" />。我們取兩者之比：
                    <div className="comparison-step-formula-container">
                      <InlineMath math="g(x) = \frac{x^2}{x^4} = \frac{1}{x^2}" />
                    </div>
                  </div>
                  <div className="comparison-step-item">
                    <strong>步驟 2：計算兩者比值的極限。</strong>
                    <BlockMath math="\lim_{x \to \infty} \frac{f(x)}{g(x)} = \lim_{x \to \infty} \frac{\frac{x^2 + 1}{x^4 - x + 2}}{\frac{1}{x^2}} = \lim_{x \to \infty} \frac{x^4 + x^2}{x^4 - x + 2} = 1" />
                    因為極限值 <InlineMath math="L = 1" /> 滿足 <InlineMath math="0 < 1 < \infty" />，符合極限比較條件。
                  </div>
                  <div className="comparison-step-item">
                    <strong>步驟 3：下結論。</strong><br />
                    因為參考函數的積分 <InlineMath math="\int_1^\infty \frac{1}{x^2} \, dx" />（其中 <InlineMath math="p=2 > 1" />）收斂，依極限比較審斂法，原積分也必<strong>收斂</strong>。
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

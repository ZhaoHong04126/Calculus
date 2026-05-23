import React from 'react';
import { InlineMath, BlockMath } from '../components/Math';

const ProofBox = ({ title = "查看證明", children }) => {
  return (
    <details className="proof-box">
      <summary>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '8px', fontSize: '18px' }}>📝</span>
          {title}
        </div>
        <div>
          <span className="proof-toggle-btn expand-text">展開內容 ▼</span>
          <span className="proof-toggle-btn collapse-text">收起內容 ▲</span>
        </div>
      </summary>
      <div className="proof-content">
        {children}
      </div>
    </details>
  );
};

export default function ContinuityProperties() {
  return (
    <section className="subsection mt-12">
      <h2 className="section-title text-2xl font-bold mb-4 border-b-2 border-emerald-500 pb-2">2. 連續基本性質、等價定義與嚴格定義</h2>
      
      <p className="mb-6 text-gray-700">
        在掌握了連續的初步判定後，本節將深入探討連續函數的代數性質，並引入數學分析中至關重要的嚴格定義。
      </p>

      {/* 2.1 連續函數的運算性質 */}
      <div className="math-box mb-6 p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold mb-3 text-emerald-800">2.1 連續函數的運算性質</h3>
        <p className="mb-4 text-gray-800">
          若函數 <InlineMath math="f(x)" /> 與 <InlineMath math="g(x)" /> 在點 <InlineMath math="x = a" /> 皆為連續，則：
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li><strong>加減法：</strong> <InlineMath math="f(x) \pm g(x)" /> 在 <InlineMath math="a" /> 連續。</li>
          <li><strong>乘法：</strong> <InlineMath math="f(x)g(x)" /> 在 <InlineMath math="a" /> 連續。</li>
          <li><strong>除法：</strong> 若 <InlineMath math="g(a) \neq 0" />，則 <InlineMath math="\frac{f(x)}{g(x)}" /> 在 <InlineMath math="a" /> 連續。</li>
          <li><strong>合成函數：</strong> 若 <InlineMath math="f" /> 在 <InlineMath math="L" /> 連續且 <InlineMath math="\lim_{x \to a} g(x) = L" />，則 <InlineMath math="\lim_{x \to a} f(g(x)) = f(L)" />。</li>
        </ul>
      </div>

      {/* 2.2 嚴格定義：Epsilon-Delta */}
      <div className="math-box mb-6 p-6 bg-blue-50 rounded-lg shadow-sm border border-blue-200">
        <h3 className="text-xl font-bold mb-3 text-blue-800">2.2 連續的嚴格定義 (ε-δ Definition)</h3>
        <p className="mb-4 text-gray-800">
          這是微積分嚴謹化的基石。我們說 <InlineMath math="f(x)" /> 在 <InlineMath math="x=a" /> 連續，若對於任意給定的 <InlineMath math="\epsilon > 0" />，皆存在一個 <InlineMath math="\delta > 0" />，使得：
        </p>
        <div className="my-4 p-4 bg-white border border-blue-300 rounded-lg text-center">
          <BlockMath math="0 < |x - a| < \delta \implies |f(x) - f(a)| < \epsilon" />
        </div>
        <p className="text-sm text-gray-600 italic">
          註：與極限定義的差別在於這裡要求極限值剛好等於 <InlineMath math="f(a)" />。
        </p>
      </div>

      {/* 2.3 等價定義：數列連續性 */}
      <div className="math-box mb-6 p-6 bg-purple-50 rounded-lg shadow-sm border border-purple-200">
        <h3 className="text-xl font-bold mb-3 text-purple-800">2.3 連續的等價定義 (Sequential Continuity)</h3>
        <p className="mb-4 text-gray-800">
          函數在 <InlineMath math="a" /> 連續，與以下命題等價：
        </p>
        <p className="px-4 py-2 bg-white rounded border border-purple-200 text-gray-800">
          對於定義域中任何收斂至 <InlineMath math="a" /> 的數列 <InlineMath math="\{x_n\}" />，其對應的函數值數列 <InlineMath math="\{f(x_n)\}" /> 必收斂至 <InlineMath math="f(a)" />。
        </p>
        
        <ProofBox title="為何這很重要？">
          <p className="text-sm">
            數列連續性讓我們可以用數列的工具（如夾擠定理）來處理函數的連續問題，反之亦然。這在高等微積分（實分析）中是非常強大的轉換工具。
          </p>
        </ProofBox>
      </div>
    </section>
  );
}

// src/IntegralsApps/VolumeSolids.jsx
import React from 'react';
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

export default function VolumeSolids() {
  return (
    <section className="subsection mt-12 pt-8 border-t border-gray-100">
      <h2 className="section-title text-2xl font-bold mb-4 border-b-2 border-emerald-500 pb-2">
        2. 旋轉體體積 (Volume of Solids of Revolution)
      </h2>

      <p className="mb-6 text-gray-700 leading-relaxed">
        將平面上的一個區域圍繞一條直線（旋轉軸）旋轉一周，所產生的三維立體稱為<strong>旋轉體 (Solid of Revolution)</strong>。
        在微積分中，計算旋轉體體積的核心思想是將立體切成無數個極薄的切片，計算每個切片的微小體積，再用定積分將它們累加。
        最常用的方法有<strong>圓盤法 (Disk Method) / 圓環法 (Washer Method)</strong> 與 <strong>圓柱殼法 (Cylindrical Shell Method)</strong>。
      </p>

      {/* 2.1 公式定義區塊 */}
      <div className="math-box mb-8 p-6 bg-emerald-50 rounded-lg shadow-sm border border-emerald-100">
        <h3 className="text-xl font-bold mb-4 text-emerald-800 flex items-center">
          <span className="mr-2">📐</span> 2.1 旋轉體體積計算方法對照
        </h3>

        <div className="trig-sub-cards-grid">
          {/* 圓盤法 */}
          <div className="trig-sub-card border border-emerald-200">
            <div>
              <div className="trig-sub-card-tag bg-emerald-600">
                方法一：圓盤法 (Disk Method)
              </div>
              <h4 className="font-bold text-base text-gray-800 mb-2 mt-1">
                切片垂直於旋轉軸
              </h4>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                當區域緊貼旋轉軸，且切片是實心圓盤時適用。
              </p>
              <ul className="text-xs text-gray-600 space-y-1.5 mb-4">
                <li>
                  垂直切片半徑：<InlineMath math="R(x)" />
                </li>
                <li>
                  切片面積：<InlineMath math="A(x) = \pi [R(x)]^2" />
                </li>
                <li>
                  🔑 <strong>繞 x 軸體積公式：</strong>
                </li>
                <li className="font-bold text-emerald-700 text-center py-1 bg-emerald-50 rounded border border-emerald-100">
                  <InlineMath math="V = \pi \int_{a}^{b} [R(x)]^2 \, dx" />
                </li>
              </ul>
            </div>
          </div>

          {/* 圓環法 */}
          <div className="trig-sub-card border border-emerald-200">
            <div>
              <div className="trig-sub-card-tag bg-emerald-600">
                方法二：圓環法 (Washer Method)
              </div>
              <h4 className="font-bold text-base text-gray-800 mb-2 mt-1">
                切片垂直於旋轉軸 (有空心)
              </h4>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                當旋轉軸與區域之間有間隙，切片呈中空圓環時適用。
              </p>
              <ul className="text-xs text-gray-600 space-y-1.5 mb-4">
                <li>
                  外半徑：<InlineMath math="R(x)" />，內半徑：<InlineMath math="r(x)" />
                </li>
                <li>
                  環面積：<InlineMath math="A(x) = \pi ([R(x)]^2 - [r(x)]^2)" />
                </li>
                <li>
                  🔑 <strong>繞 x 軸體積公式：</strong>
                </li>
                <li className="font-bold text-emerald-700 text-center py-1 bg-emerald-50 rounded border border-emerald-100">
                  <InlineMath math="V = \pi \int_{a}^{b} \left( [R(x)]^2 - [r(x)]^2 \right) \, dx" />
                </li>
              </ul>
            </div>
            <span className="text-center text-xs text-gray-400 py-2 italic">
              (圓盤法的中空延伸版本)
            </span>
          </div>

          {/* 圓柱殼法 */}
          <div className="trig-sub-card border border-emerald-200">
            <div>
              <div className="trig-sub-card-tag bg-emerald-600">
                方法三：圓柱殼法 (Shell Method)
              </div>
              <h4 className="font-bold text-base text-gray-800 mb-2 mt-1">
                切片平行於旋轉軸
              </h4>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                將立體看作由一層層同心圓柱殼套疊而成，適合繞垂直軸旋轉。
              </p>
              <ul className="text-xs text-gray-600 space-y-1.5 mb-4">
                <li>
                  殼半徑：<InlineMath math="x" />，殼高度：<InlineMath math="f(x)" />
                </li>
                <li>
                  殼表面積：<InlineMath math="A = 2\pi x f(x)" />
                </li>
                <li>
                  🔑 <strong>繞 y 軸體積公式：</strong>
                </li>
                <li className="font-bold text-emerald-700 text-center py-1 bg-emerald-50 rounded border border-emerald-100">
                  <InlineMath math="V = 2\pi \int_{a}^{b} x f(x) \, dx" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2.2 經典範例 */}
      <div className="example-box mt-8 border-t-4 border-emerald-500 shadow-md">
        <h3 className="example-title text-xl font-bold text-emerald-900 mb-6 flex items-center">
          <span className="mr-2">📝</span> 2.2 經典範例演練
        </h3>

        <div className="space-y-6">
          {/* 範例 1 */}
          <div className="p-5 bg-emerald-50 rounded-lg border border-emerald-100">
            <p className="font-bold text-emerald-950 mb-2">
              範例 1 (圓盤法)：求由曲線 <InlineMath math="y = x^2" />、<InlineMath math="x" /> 軸與直線 <InlineMath math="x = 2" /> 所圍成的區域，繞 <InlineMath math="x" /> 軸旋轉一周所得之旋轉體體積。
            </p>
            <SolutionBox>
              <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
                <p><strong>解題步驟：</strong></p>
                <p><strong>Step 1：確定旋轉軸與切片形狀</strong></p>
                <p>
                  因為是繞 <InlineMath math="x" /> 軸旋轉，我們對 <InlineMath math="x" /> 軸作垂直切片。
                  在任意點 <InlineMath math="x" /> 處，切片的截面是一個實心圓盤，其半徑為曲線的高度，即：
                </p>
                <BlockMath math="R(x) = x^2" />

                <p><strong>Step 2：確定積分區間</strong></p>
                <p>
                  區域左界為拋物線頂點 <InlineMath math="x = 0" />，右界為直線 <InlineMath math="x = 2" />。
                  因此積分界限為 <InlineMath math="[0, 2]" />。
                </p>

                <p><strong>Step 3：列式並計算定積分</strong></p>
                <p>根據圓盤法公式：</p>
                <BlockMath math="V = \pi \int_{0}^{2} [R(x)]^2 \, dx = \pi \int_{0}^{2} (x^2)^2 \, dx = \pi \int_{0}^{2} x^4 \, dx" />
                <p>計算積分值：</p>
                <BlockMath math="V = \pi \left[ \frac{x^5}{5} \right]_{0}^{2} = \pi \left( \frac{2^5}{5} - 0 \right) = \frac{32\pi}{5} \approx 20.106" />
                <p className="font-semibold text-emerald-600">答案：旋轉體體積為 <InlineMath math="\frac{32\pi}{5}" />（或約 20.11）。</p>
              </div>
            </SolutionBox>
          </div>

          {/* 範例 2 */}
          <div className="p-5 bg-emerald-50 rounded-lg border border-emerald-100">
            <p className="font-bold text-emerald-950 mb-2">
              範例 2 (圓柱殼法)：求由拋物線 <InlineMath math="y = 2x - x^2" /> 與 <InlineMath math="x" /> 軸所圍成的區域，繞 <InlineMath math="y" /> 軸旋轉一周的立體體積。
            </p>
            <SolutionBox>
              <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
                <p><strong>解題思維：</strong></p>
                <p>
                  此題若使用圓盤/圓環法（對 <InlineMath math="y" /> 積分），必須將 <InlineMath math="y = 2x - x^2" /> 改寫成以 <InlineMath math="y" /> 表示 <InlineMath math="x" /> 的形式，這需要配方法並開根號，過程極為複雜。
                  因為是繞<strong>垂直的 y 軸</strong>旋轉，使用<strong>圓柱殼法</strong>（對 <InlineMath math="x" /> 積分）會非常直接。
                </p>
                <hr className="my-2 border-emerald-100" />
                <p><strong>Step 1：確定柱殼半徑與高度</strong></p>
                <p>
                  對於在區間內的任意點 <InlineMath math="x" />：
                  <br />
                  柱殼的半徑為到旋轉軸（y 軸）的距離，即：<InlineMath math="r = x" />。
                  <br />
                  柱殼的高度為曲線的函數值，即：<InlineMath math="h = f(x) = 2x - x^2" />。
                </p>

                <p><strong>Step 2：確定積分區間</strong></p>
                <p>尋找拋物線與 <InlineMath math="x" /> 軸的交點：</p>
                <BlockMath math="2x - x^2 = 0 \implies x(2 - x) = 0 \implies x = 0, x = 2" />
                <p>因此，積分區間為 <InlineMath math="[0, 2]" />。</p>

                <p><strong>Step 3：建立定積分並計算</strong></p>
                <p>根據圓柱殼法公式：</p>
                <BlockMath math="V = 2\pi \int_{0}^{2} x \cdot f(x) \, dx = 2\pi \int_{0}^{2} x (2x - x^2) \, dx = 2\pi \int_{0}^{2} (2x^2 - x^3) \, dx" />
                <p>求反導數並代入求值：</p>
                <BlockMath math="= 2\pi \left[ \frac{2x^3}{3} - \frac{x^4}{4} \right]_{0}^{2}" />
                <BlockMath math="= 2\pi \left( \left( \frac{16}{3} - \frac{16}{4} \right) - 0 \right) = 2\pi \left( \frac{16}{3} - 4 \right) = 2\pi \left( \frac{4}{3} \right) = \frac{8\pi}{3} \approx 8.378" />
                <p className="font-semibold text-emerald-600">答案：旋轉體體積為 <InlineMath math="\frac{8\pi}{3}" />（或約 8.38）。</p>
              </div>
            </SolutionBox>
          </div>
        </div>
      </div>
    </section>
  );
}

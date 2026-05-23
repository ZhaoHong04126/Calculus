// src/Derivatives/DifferentiationRules.jsx
import React from 'react';
import { InlineMath, BlockMath } from '../components/Math';
import './ProofBox.css'; // 引入新增的 CSS

// 使用純 CSS 控制的 ProofBox
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

export default function DifferentiationRules() {
  return (
    <section className="subsection mt-12">
      <h2 className="section-title text-2xl font-bold mb-4 border-b-2 border-emerald-500 pb-2">2. 微分基本法則 (Differentiation Rules)</h2>
      
      <p className="mb-4 text-gray-700">
        使用極限的嚴格定義來計算導數雖然嚴謹，但每次都計算極限非常耗時。數學家們推導出了一系列法則，讓我們可以像套用公式一樣快速求導。
      </p>

      {/* 2.1 基礎公式 */}
      <div className="math-box mb-6 p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold mb-3 text-gray-800">2.1 基礎微分公式</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
          
          {/* 常數法則 */}
          <div className="p-4 bg-white rounded border border-gray-200">
            <strong>2.1.1 常數法則：</strong>若 <InlineMath math="c" /> 為常數
            <BlockMath math="\dfrac{d}{dx}[c] = 0" />
            <ProofBox title="查看證明">
              <p className="mb-1">令 <InlineMath math="f(x) = c" />：</p>
              <BlockMath math="\lim_{h \to 0} \dfrac{f(x+h) - f(x)}{h} = \lim_{h \to 0} \dfrac{c - c}{h} = \lim_{h \to 0} 0 = 0" />
            </ProofBox>
          </div>

          {/* 冪次法則 */}
          <div className="p-4 bg-white rounded border border-gray-200">
            <strong>2.1.2 冪次法則 (Power Rule)：</strong>
            <BlockMath math="\dfrac{d}{dx}[x^n] = n x^{n-1}" />
            <ProofBox title="查看證明 (需使用二項式定理)">
              <p className="mb-1">根據導數定義：</p>
              <BlockMath math="\lim_{h \to 0} \dfrac{(x+h)^n - x^n}{h}" />
              <p className="my-1">展開二項式 <InlineMath math="(x+h)^n" />：</p>
              <BlockMath math="= \lim_{h \to 0} \dfrac{(x^n + nx^{n-1}h + \dots + h^n) - x^n}{h}" />
              <p className="my-1">消去 <InlineMath math="x^n" /> 並約掉 <InlineMath math="h" />：</p>
              <BlockMath math="= \lim_{h \to 0} (nx^{n-1} + \dots + h^{n-1}) = n x^{n-1}" />
            </ProofBox>
          </div>

          {/* 自然指數 */}
          <div className="p-4 bg-white rounded border border-gray-200">
            <strong>2.1.3 自然指數：</strong>
            <BlockMath math="\dfrac{d}{dx}[e^x] = e^x" />
            <ProofBox title="查看證明">
              <p className="mb-1">根據導數定義與指數律：</p>
              <BlockMath math="\lim_{h \to 0} \dfrac{e^{x+h} - e^x}{h} = \lim_{h \to 0} \dfrac{e^x(e^h - 1)}{h}" />
              <p className="my-1">提出無關極限變數的 <InlineMath math="e^x" />：</p>
              <BlockMath math="= e^x \lim_{h \to 0} \dfrac{e^h - 1}{h}" />
              <p className="my-1">根據自然常數 <InlineMath math="e" /> 的極限定義，後方極限為 <InlineMath math="1" />：</p>
              <BlockMath math="= e^x \cdot 1 = e^x" />
            </ProofBox>
          </div>

          {/* 自然對數 */}
          <div className="p-4 bg-white rounded border border-gray-200">
            <strong>2.1.4 自然對數：</strong>
            <BlockMath math="\dfrac{d}{dx}[\ln x] = \dfrac{1}{x}" />
            <ProofBox title="查看極限證明">
              <p className="mb-1">根據定義與對數相減律：</p>
              <BlockMath math="\lim_{h \to 0} \dfrac{\ln(x+h) - \ln x}{h} = \lim_{h \to 0} \dfrac{1}{h} \ln\left(1 + \dfrac{h}{x}\right)" />
              <p className="my-1">令 <InlineMath math="u = \dfrac{h}{x}" />，當 <InlineMath math="h \to 0" /> 時 <InlineMath math="u \to 0" />。原式化為：</p>
              <BlockMath math="\lim_{u \to 0} \dfrac{1}{xu} \ln(1 + u) = \dfrac{1}{x} \lim_{u \to 0} \ln(1 + u)^{\frac{1}{u}}" />
              <p className="my-1">根據極限定義 <InlineMath math="\lim_{u \to 0}(1+u)^{1/u} = e" />：</p>
              <BlockMath math="= \dfrac{1}{x} \ln(e) = \dfrac{1}{x}" />
            </ProofBox>
          </div>

        </div>
      </div>

      {/* 2.2 函數運算 */}
      <div className="math-box mb-6 p-6 bg-blue-50 rounded-lg shadow-sm border border-blue-100">
        <h3 className="text-xl font-bold mb-3 text-blue-800">2.2 函數運算的微分法則</h3>
        <p className="mb-2 text-gray-700">假設 <InlineMath math="f(x)" /> 和 <InlineMath math="g(x)" /> 皆可微，且 <InlineMath math="c" /> 為常數：</p>
        
        <ul className="list-disc list-inside space-y-4 mt-4 text-gray-800 text-base">
          <li>
            <strong>2.2.1 常數倍數法則：</strong> <InlineMath math="\dfrac{d}{dx}[cf(x)] = c f'(x)" />
            <ProofBox title="查看證明">
              <BlockMath math="\lim_{h \to 0} \dfrac{cf(x+h) - cf(x)}{h} = c \lim_{h \to 0} \dfrac{f(x+h) - f(x)}{h} = c f'(x)" />
            </ProofBox>
          </li>
          
          <li>
            <strong>2.2.2 和差法則：</strong> <InlineMath math="\dfrac{d}{dx}[f(x) \pm g(x)] = f'(x) \pm g'(x)" />
            <ProofBox title="查看證明">
              <BlockMath math="\lim_{h \to 0} \dfrac{[f(x+h) \pm g(x+h)] - [f(x) \pm g(x)]}{h}" />
              <BlockMath math="= \lim_{h \to 0} \left[ \dfrac{f(x+h) - f(x)}{h} \pm \dfrac{g(x+h) - g(x)}{h} \right] = f'(x) \pm g'(x)" />
            </ProofBox>
          </li>

          <li className="mt-4 p-4 bg-white rounded border border-blue-200 list-none">
            <strong>2.2.3 乘法法則 (Product Rule)：</strong>
            <p className="mt-2 text-gray-600 text-sm">「前微後不微，加上，前不微後微」</p>
            <BlockMath math="\dfrac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)" />
            <ProofBox title="查看極限定義證明 (技巧：加減同一項)">
              <p className="mb-2">根據導數定義：</p>
              <BlockMath math="\dfrac{d}{dx}[f(x)g(x)] = \lim_{h \to 0} \dfrac{f(x+h)g(x+h) - f(x)g(x)}{h}" />
              <p className="my-2">在分子「加上並減去」 <InlineMath math="f(x)g(x+h)" />：</p>
              <BlockMath math="= \lim_{h \to 0} \dfrac{f(x+h)g(x+h) - f(x)g(x+h) + f(x)g(x+h) - f(x)g(x)}{h}" />
              <p className="my-2">分組並提出公因式：</p>
              <BlockMath math="= \lim_{h \to 0} \left[ g(x+h)\dfrac{f(x+h) - f(x)}{h} + f(x)\dfrac{g(x+h) - g(x)}{h} \right]" />
              <p className="my-2">因為 <InlineMath math="g(x)" /> 可微必連續，當 <InlineMath math="h \to 0" /> 時，<InlineMath math="g(x+h) \to g(x)" />：</p>
              <BlockMath math="= f'(x)g(x) + f(x)g'(x)" />
            </ProofBox>
          </li>

          <li className="mt-4 p-4 bg-white rounded border border-blue-200 list-none">
            <strong>2.2.4 除法法則 (Quotient Rule)：</strong>
            <p className="mt-2 text-gray-600 text-sm">「下乘上微，減去，上乘下微，除以下平方」</p>
            <BlockMath math="\dfrac{d}{dx}\left[\dfrac{f(x)}{g(x)}\right] = \dfrac{f'(x)g(x) - f(x)g'(x)}{[g(x)]^2}" />
            <ProofBox title="查看極限定義證明 (技巧：通分後加減同一項)">
              <p className="mb-2">根據導數定義並將分子通分：</p>
              <BlockMath math="\dfrac{d}{dx}\left[\dfrac{f(x)}{g(x)}\right] = \lim_{h \to 0} \dfrac{\dfrac{f(x+h)}{g(x+h)} - \dfrac{f(x)}{g(x)}}{h} = \lim_{h \to 0} \dfrac{f(x+h)g(x) - f(x)g(x+h)}{h \cdot g(x+h)g(x)}" />
              <p className="my-2">在分子「加上並減去」 <InlineMath math="f(x)g(x)" />：</p>
              <BlockMath math="= \lim_{h \to 0} \dfrac{f(x+h)g(x) - f(x)g(x) + f(x)g(x) - f(x)g(x+h)}{h \cdot g(x+h)g(x)}" />
              <p className="my-2">整理並將極限拆開：</p>
              <BlockMath math="= \lim_{h \to 0} \dfrac{1}{g(x+h)g(x)} \left[ g(x)\dfrac{f(x+h) - f(x)}{h} - f(x)\dfrac{g(x+h) - g(x)}{h} \right]" />
              <p className="my-2">取極限後，分母變為 <InlineMath math="[g(x)]^2" />：</p>
              <BlockMath math="= \dfrac{f'(x)g(x) - f(x)g'(x)}{[g(x)]^2}" />
            </ProofBox>
          </li>
        </ul>
      </div>
      
      {/* 2.3 三角函數 */}
      <div className="math-box mb-6 p-6 bg-emerald-50 rounded-lg shadow-sm border border-emerald-100">
        <h3 className="text-xl font-bold mb-3 text-emerald-800">2.3 三角函數的微分</h3>
        <p className="mb-4 text-gray-700">
          了解和角公式與特殊極限 <InlineMath math="\lim_{h \to 0} \dfrac{\sin h}{h} = 1" /> 後，我們就能推導出三角函數的導數。
        </p>

        <div className="space-y-4 mt-4 text-base">
          {/* Sin */}
          <div className="p-4 bg-white rounded border border-emerald-200">
            <strong>2.3.1 正弦函數 (sin)：</strong>
            <BlockMath math="\dfrac{d}{dx}[\sin x] = \cos x" />
            <ProofBox title="查看極限證明">
              <p className="mb-2">根據導數定義：</p>
              <BlockMath math="\lim_{h \to 0} \dfrac{\sin(x+h) - \sin x}{h}" />
              <p className="my-2">展開和角公式 <InlineMath math="\sin(x+h) = \sin x \cos h + \cos x \sin h" />：</p>
              <BlockMath math="= \lim_{h \to 0} \dfrac{\sin x \cos h + \cos x \sin h - \sin x}{h}" />
              <p className="my-2">重新分組，將含有 <InlineMath math="\sin x" /> 的項合併：</p>
              <BlockMath math="= \lim_{h \to 0} \left[ \sin x \left( \dfrac{\cos h - 1}{h} \right) + \cos x \left( \dfrac{\sin h}{h} \right) \right]" />
              <p className="my-2">代入已知極限 <InlineMath math="\lim_{h \to 0}\dfrac{\cos h - 1}{h} = 0" /> 與 <InlineMath math="\lim_{h \to 0}\dfrac{\sin h}{h} = 1" />：</p>
              <BlockMath math="= \sin x \cdot (0) + \cos x \cdot (1) = \cos x" />
            </ProofBox>
          </div>

          {/* Cos */}
          <div className="p-4 bg-white rounded border border-emerald-200">
            <strong>2.3.2 餘弦函數 (cos)：</strong>
            <BlockMath math="\dfrac{d}{dx}[\cos x] = -\sin x" />
            <ProofBox title="查看極限證明">
              <p className="mb-2">根據導數定義：</p>
              <BlockMath math="\lim_{h \to 0} \dfrac{\cos(x+h) - \cos x}{h}" />
              <p className="my-2">展開和角公式 <InlineMath math="\cos(x+h) = \cos x \cos h - \sin x \sin h" />：</p>
              <BlockMath math="= \lim_{h \to 0} \dfrac{\cos x \cos h - \sin x \sin h - \cos x}{h}" />
              <p className="my-2">重新分組：</p>
              <BlockMath math="= \lim_{h \to 0} \left[ \cos x \left( \dfrac{\cos h - 1}{h} \right) - \sin x \left( \dfrac{\sin h}{h} \right) \right]" />
              <p className="my-2">代入已知極限：</p>
              <BlockMath math="= \cos x \cdot (0) - \sin x \cdot (1) = -\sin x" />
            </ProofBox>
          </div>

          {/* Tan */}
          <div className="p-4 bg-white rounded border border-emerald-200">
            <strong>2.3.3 正切函數 (tan)：</strong>
            <BlockMath math="\dfrac{d}{dx}[\tan x] = \sec^2 x" />
            <ProofBox title="查看證明 (應用：除法法則)">
              <p className="mb-2">將 <InlineMath math="\tan x" /> 寫成 <InlineMath math="\dfrac{\sin x}{\cos x}" />，並套用上面學過的<strong>除法法則</strong>：</p>
              <BlockMath math="\dfrac{d}{dx}\left[ \dfrac{\sin x}{\cos x} \right] = \dfrac{(\sin x)'(\cos x) - (\sin x)(\cos x)'}{(\cos x)^2}" />
              <p className="my-2">代入剛才證明的 <InlineMath math="(\sin x)' = \cos x" /> 與 <InlineMath math="(\cos x)' = -\sin x" />：</p>
              <BlockMath math="= \dfrac{(\cos x)(\cos x) - (\sin x)(-\sin x)}{\cos^2 x} = \dfrac{\cos^2 x + \sin^2 x}{\cos^2 x}" />
              <p className="my-2">根據畢氏定理 <InlineMath math="\cos^2 x + \sin^2 x = 1" />：</p>
              <BlockMath math="= \dfrac{1}{\cos^2 x} = \sec^2 x" />
            </ProofBox>
          </div>

          {/* Cot */}
          <div className="p-4 bg-white rounded border border-emerald-200">
            <strong>2.3.4 餘切函數 (cot)：</strong>
            <BlockMath math="\dfrac{d}{dx}[\cot x] = -\csc^2 x" />
            <ProofBox title="查看證明 (應用：除法法則)">
              <p className="mb-2">將 <InlineMath math="\cot x" /> 寫成 <InlineMath math="\dfrac{\cos x}{\sin x}" />，套用<strong>除法法則</strong>：</p>
              <BlockMath math="\dfrac{d}{dx}\left[ \dfrac{\cos x}{\sin x} \right] = \dfrac{(\cos x)'(\sin x) - (\cos x)(\sin x)'}{(\sin x)^2}" />
              <BlockMath math="= \dfrac{(-\sin x)(\sin x) - (\cos x)(\cos x)}{\sin^2 x} = \dfrac{-(\sin^2 x + \cos^2 x)}{\sin^2 x}" />
              <BlockMath math="= \dfrac{-1}{\sin^2 x} = -\csc^2 x" />
            </ProofBox>
          </div>

          {/* Sec & Csc 並列 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded border border-emerald-200">
              <strong>2.3.5 正割函數 (sec)：</strong>
              <BlockMath math="\dfrac{d}{dx}[\sec x] = \sec x \tan x" />
              <ProofBox title="查看證明">
                <p className="mb-2">將 <InlineMath math="\sec x" /> 寫成 <InlineMath math="\dfrac{1}{\cos x}" />，套用<strong>除法法則</strong>：</p>
                <BlockMath math="\dfrac{d}{dx}\left[ \dfrac{1}{\cos x} \right] = \dfrac{(0)(\cos x) - (1)(-\sin x)}{\cos^2 x}" />
                <BlockMath math="= \dfrac{\sin x}{\cos^2 x} = \dfrac{1}{\cos x} \cdot \dfrac{\sin x}{\cos x} = \sec x \tan x" />
              </ProofBox>
            </div>

            <div className="p-4 bg-white rounded border border-emerald-200">
              <strong>2.3.6 餘割函數 (csc)：</strong>
              <BlockMath math="\dfrac{d}{dx}[\csc x] = -\csc x \cot x" />
              <ProofBox title="查看證明">
                <p className="mb-2">將 <InlineMath math="\csc x" /> 寫成 <InlineMath math="\dfrac{1}{\sin x}" />，套用<strong>除法法則</strong>：</p>
                <BlockMath math="\dfrac{d}{dx}\left[ \dfrac{1}{\sin x} \right] = \dfrac{(0)(\sin x) - (1)(\cos x)}{\sin^2 x}" />
                <BlockMath math="= \dfrac{-\cos x}{\sin^2 x} = -\dfrac{1}{\sin x} \cdot \dfrac{\cos x}{\sin x} = -\csc x \cot x" />
              </ProofBox>
            </div>
          </div>

        </div>
      </div>

      {/* 2.4 一般指對數函數 */}
      <div className="math-box mb-6 p-6 bg-pink-50 rounded-lg shadow-sm border border-pink-200">
        <h3 className="text-xl font-bold mb-3 text-pink-800">2.4 一般指數與對數函數的微分</h3>
        <p className="mb-4 text-gray-700">
          有了自然指數 <InlineMath math="e^x" /> 與自然對數 <InlineMath math="\ln x" /> 的基礎，只要利用指數的性質或換底公式，配合連鎖律，就可以輕易推導出底數為任意正實數 <InlineMath math="a" /> （<InlineMath math="a > 0, a \neq 1" />）的微分公式。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-base">
          {/* 一般指數 */}
          <div className="p-4 bg-white rounded border border-pink-200">
            <strong>2.4.1 一般指數函數：</strong>
            <BlockMath math="\dfrac{d}{dx}[a^x] = a^x \ln a" />
            <ProofBox title="查看證明 (利用自然指數換底)">
              <p className="mb-2">根據對數的性質，我們可以將 <InlineMath math="a^x" /> 改寫為以自然常數 <InlineMath math="e" /> 為底的指數函數：</p>
              <BlockMath math="a^x = e^{\ln(a^x)} = e^{x \ln a}" />
              <p className="my-2">其中 <InlineMath math="\ln a" /> 是一個<strong>常數</strong>。接著對兩邊微分，由於會涉及到內函數 <InlineMath math="x \ln a" />，我們需要套用<strong>連鎖律 (Chain Rule)</strong>：</p>
              <BlockMath math="\dfrac{d}{dx}[a^x] = \dfrac{d}{dx}[e^{(\ln a) x}]" />
              <BlockMath math="= e^{(\ln a) x} \cdot \dfrac{d}{dx}[(\ln a) x]" />
              <p className="my-2">內部的常數係數微分：</p>
              <BlockMath math="= e^{x \ln a} \cdot \ln a = a^x \ln a" />
            </ProofBox>
          </div>

          {/* 一般對數 */}
          <div className="p-4 bg-white rounded border border-pink-200">
            <strong>2.4.2 一般對數函數：</strong>
            <BlockMath math="\dfrac{d}{dx}[\log_a x] = \dfrac{1}{x \ln a}" />
            <ProofBox title="查看證明 (利用換底公式)">
              <p className="mb-2">根據對數換底公式，將原本底為 <InlineMath math="a" /> 的對數轉換為以 <InlineMath math="e" /> 為底的自然對數：</p>
              <BlockMath math="\log_a x = \dfrac{\ln x}{\ln a} = \dfrac{1}{\ln a} \cdot \ln x" />
              <p className="my-2">由於 <InlineMath math="\dfrac{1}{\ln a}" /> 是一個常數倍數，根據微分的常數倍數法則，可以直接將其提出來再微分：</p>
              <BlockMath math="\dfrac{d}{dx}[\log_a x] = \dfrac{d}{dx}\left[ \dfrac{1}{\ln a} \ln x \right]" />
              <BlockMath math="= \dfrac{1}{\ln a} \cdot \dfrac{d}{dx}[\ln x]" />
              <p className="my-2">代入原本學過的 <InlineMath math="\ln x" /> 的微分公式 <InlineMath math="\dfrac{1}{x}" />：</p>
              <BlockMath math="= \dfrac{1}{\ln a} \cdot \dfrac{1}{x} = \dfrac{1}{x \ln a}" />
            </ProofBox>
          </div>
        </div>
      </div>

    </section>
  );
}
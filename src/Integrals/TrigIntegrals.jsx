// src/Integrals/TrigIntegrals.jsx
import React from 'react';
import { InlineMath, BlockMath } from '../components/Math';
import './ProofBox.css';

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

export default function TrigIntegrals() {
  return (
    <section className="subsection mt-12 pt-8 border-t border-gray-100">
      <h2 className="section-title text-2xl font-bold mb-4 border-b-2 border-violet-500 pb-2">
        3. 三角函數的積分 (Trigonometric Integrals)
      </h2>

      <p className="mb-6 text-gray-700 leading-relaxed">
        當被積函數包含三角函數的乘積或次方時，我們通常利用<strong>三角恆等式</strong>搭配<strong>變數變換法</strong>來求解。
        這類積分最常見的形式包含正弦與餘弦的乘積 <InlineMath math="\sin^m x \cos^n x" />，以及正切與正割的乘積 <InlineMath math="\tan^m x \sec^n x" />。
      </p>

      {/* 3.1 正弦與餘弦的各次方列表與遞迴公式 */}
      <div className="math-box mb-6 p-6 bg-violet-50 rounded-lg shadow-sm border border-violet-100">
        <h3 className="text-xl font-bold mb-3 text-violet-800">
          3.1 形式：<InlineMath math="\int \sin^n x \, dx" /> 與 <InlineMath math="\int \cos^n x \, dx" /> (1 到 4 次及高次方)
        </h3>
        
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          在微積分中，正弦與餘弦的積分非常常見。我們通常會將 <InlineMath math="n=1" /> 到 <InlineMath math="n=4" /> 的結果當作基礎，到了更高次方時再使用<strong>遞迴公式</strong>：
        </p>

        <div className="space-y-4">
          {/* 一次與二次 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded border-l-4 border-violet-500 shadow-sm overflow-x-auto">
              <h4 className="font-bold text-violet-900 mb-2">💡 一次方 (<InlineMath math="n=1" />)</h4>
              <ul className="space-y-2 text-sm">
                <li><BlockMath math="\int \sin x \, dx = -\cos x + C" /></li>
                <li><BlockMath math="\int \cos x \, dx = \sin x + C" /></li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded border-l-4 border-violet-500 shadow-sm overflow-x-auto">
              <h4 className="font-bold text-violet-900 mb-2">💡 二次方 (<InlineMath math="n=2" />)</h4>
              <p className="text-xs text-gray-500 mb-1">利用半角公式降次</p>
              <ul className="space-y-2 text-sm">
                <li><BlockMath math="\int \sin^2 x \, dx = \frac{x}{2} - \frac{\sin(2x)}{4} + C" /></li>
                <li><BlockMath math="\int \cos^2 x \, dx = \frac{x}{2} + \frac{\sin(2x)}{4} + C" /></li>
              </ul>
            </div>
          </div>

          {/* 三次與四次 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded border-l-4 border-violet-500 shadow-sm overflow-x-auto">
              <h4 className="font-bold text-violet-900 mb-2">💡 三次方 (<InlineMath math="n=3" />)</h4>
              <p className="text-xs text-gray-500 mb-1">提出一個，轉換剩下為另一函數</p>
              <ul className="space-y-2 text-sm">
                <li><BlockMath math="\int \sin^3 x \, dx = -\cos x + \frac{\cos^3 x}{3} + C" /></li>
                <li><BlockMath math="\int \cos^3 x \, dx = \sin x - \frac{\sin^3 x}{3} + C" /></li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded border-l-4 border-violet-500 shadow-sm overflow-x-auto">
              <h4 className="font-bold text-violet-900 mb-2">💡 四次方 (<InlineMath math="n=4" />)</h4>
              <p className="text-xs text-gray-500 mb-1">兩次利用半角公式</p>
              <ul className="space-y-2 text-sm">
                <li><BlockMath math="\int \sin^4 x \, dx = \frac{3x}{8} - \frac{\sin(2x)}{4} + \frac{\sin(4x)}{32} + C" /></li>
                <li><BlockMath math="\int \cos^4 x \, dx = \frac{3x}{8} + \frac{\sin(2x)}{4} + \frac{\sin(4x)}{32} + C" /></li>
              </ul>
            </div>
          </div>

          {/* 高次方 (奇偶數通解演算法) */}
          <div className="p-4 bg-violet-100 rounded border-l-4 border-violet-600 shadow-sm overflow-x-auto mt-4">
            <h4 className="font-bold text-violet-900 mb-2">💡 高次方 (<InlineMath math="n \ge 5" />) 的奇偶數演算法 Summary</h4>
            <p className="text-sm text-gray-700 mb-4">
              與其硬背遞迴公式，我們可以直接根據次方 <InlineMath math="n" /> 是奇數或偶數，採取以下標準演算法 (以餘弦為例，正弦同理)：
            </p>
            
            <div className="space-y-6">
              {/* 奇數 */}
              <div>
                <h5 className="font-bold text-violet-800 text-sm mb-2">(1) <InlineMath math="n = 2k + 1" /> (奇數)</h5>
                <div className="bg-white p-3 rounded border border-violet-200 text-sm">
                  <BlockMath math="\int \cos^{2k+1} x \, dx = \int \cos^{2k} x \cos x \, dx" />
                  <BlockMath math="= \int (1 - \sin^2 x)^k d(\sin x)" />
                  <BlockMath math="\xRightarrow{u=\sin x} \int (1 - u^2)^k \, du" />
                </div>
              </div>

              {/* 偶數 */}
              <div>
                <h5 className="font-bold text-violet-800 text-sm mb-2">(2) <InlineMath math="n = 2k" /> (偶數)</h5>
                <div className="bg-white p-3 rounded border border-violet-200 text-sm">
                  <BlockMath math="\int (\cos^2 x)^k \, dx = \int \left( \frac{1+\cos 2x}{2} \right)^k \, dx" />
                  <p className="text-center font-semibold text-gray-700 mt-2">展開後再積分</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3.2 正切的各次方推導與遞迴公式 */}
      <div className="math-box mb-6 p-6 bg-violet-50 rounded-lg shadow-sm border border-violet-100 mt-8">
        <h3 className="text-xl font-bold mb-3 text-violet-800">
          3.2 形式：<InlineMath math="\int \tan^m x \, dx" />
        </h3>
        
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          正切函數的高次方積分有非常規律的降次方法，我們通常將 <InlineMath math="\tan^2 x" /> 換成 <InlineMath math="(\sec^2 x - 1)" /> 來達到降次的目的：
        </p>

        <div className="space-y-4">
          {/* (1) 一次方 */}
          <div className="p-4 bg-white rounded border-l-4 border-violet-500 shadow-sm overflow-x-auto">
            <h4 className="font-bold text-violet-900 mb-2">💡 (1) 一次方 (<InlineMath math="m=1" />)</h4>
            <BlockMath math="\int \tan x \, dx = -\ln|\cos x| + C = \ln|\sec x| + C" />
          </div>

          {/* (2) 二次方 */}
          <div className="p-4 bg-white rounded border-l-4 border-violet-500 shadow-sm overflow-x-auto">
            <h4 className="font-bold text-violet-900 mb-2">💡 (2) 二次方 (<InlineMath math="m=2" />)</h4>
            <BlockMath math="\int \tan^2 x \, dx = \int (\sec^2 x - 1) \, dx = \tan x - x + C" />
          </div>

          {/* (3) 高次方推導 */}
          <div className="p-4 bg-violet-100 rounded border-l-4 border-violet-600 shadow-sm overflow-x-auto mt-4">
            <h4 className="font-bold text-violet-900 mb-2">💡 (3) 高次方 (<InlineMath math="m \ge 3" />) 的遞迴公式推導</h4>
            <div className="space-y-2 text-sm text-gray-800">
              <BlockMath math="\int \tan^m x \, dx = \int \tan^2 x \tan^{m-2} x \, dx" />
              <BlockMath math="= \int (\sec^2 x - 1) \tan^{m-2} x \, dx" />
              <BlockMath math="= \int \sec^2 x \tan^{m-2} x \, dx - \int \tan^{m-2} x \, dx" />
              <BlockMath math="= \int \tan^{m-2} x \, d(\tan x) - \int \tan^{m-2} x \, dx" />
              <div className="border-t border-violet-200 pt-2 mt-2">
                <BlockMath math="= \frac{1}{m-1} \tan^{m-1} x - \int \tan^{m-2} x \, dx" />
              </div>
            </div>
          </div>

          {/* m=3 和 m=4 的實際應用 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-white rounded border-l-4 border-violet-500 shadow-sm overflow-x-auto">
              <h4 className="font-bold text-violet-900 mb-2">📌 當 <InlineMath math="m=3" /></h4>
              <BlockMath math="\int \tan^3 x \, dx = \frac{1}{2} \tan^2 x - \int \tan x \, dx" />
              <BlockMath math="= \frac{1}{2} \tan^2 x + \ln|\cos x| + C" />
            </div>
            <div className="p-4 bg-white rounded border-l-4 border-violet-500 shadow-sm overflow-x-auto">
              <h4 className="font-bold text-violet-900 mb-2">📌 當 <InlineMath math="m=4" /></h4>
              <BlockMath math="\int \tan^4 x \, dx = \frac{1}{3} \tan^3 x - \int \tan^2 x \, dx" />
              <BlockMath math="= \frac{1}{3} \tan^3 x - \tan x + x + C" />
            </div>
          </div>
        </div>
      </div>

      {/* 3.3 正割的各次方推導與遞迴公式 */}
      <div className="math-box mb-6 p-6 bg-violet-50 rounded-lg shadow-sm border border-violet-100 mt-8">
        <h3 className="text-xl font-bold mb-3 text-violet-800">
          3.3 形式：<InlineMath math="\int \sec^m x \, dx" />
        </h3>
        
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          正割函數的高次方積分通常需要利用<strong>分部積分法 (Integration by Parts)</strong>，並搭配恆等式 <InlineMath math="\tan^2 x = \sec^2 x - 1" /> 來推導：
        </p>

        <div className="space-y-4">
          {/* (1) 一次方 */}
          <div className="p-4 bg-white rounded border-l-4 border-violet-500 shadow-sm overflow-x-auto">
            <h4 className="font-bold text-violet-900 mb-2">💡 (1) 一次方 (<InlineMath math="m=1" />)</h4>
            <BlockMath math="\int \sec x \, dx = \ln|\tan x + \sec x| + C" />
          </div>

          {/* (2) 二次方 */}
          <div className="p-4 bg-white rounded border-l-4 border-violet-500 shadow-sm overflow-x-auto">
            <h4 className="font-bold text-violet-900 mb-2">💡 (2) 二次方 (<InlineMath math="m=2" />)</h4>
            <BlockMath math="\int \sec^2 x \, dx = \tan x + C" />
          </div>

          {/* (3) 高次方推導 */}
          <div className="p-4 bg-violet-100 rounded border-l-4 border-violet-600 shadow-sm overflow-x-auto mt-4">
            <h4 className="font-bold text-violet-900 mb-2">💡 (3) 高次方 (<InlineMath math="m \ge 3" />) 的遞迴公式推導</h4>
            <p className="text-sm text-gray-700 mb-3">
              我們將 <InlineMath math="\sec^m x" /> 拆成 <InlineMath math="\sec^{m-2} x" /> 與 <InlineMath math="\sec^2 x" />，然後對其進行分部積分：
            </p>
            <div className="space-y-2 text-sm text-gray-800">
              <BlockMath math="\int \sec^m x \, dx = \int \sec^{m-2} x \sec^2 x \, dx" />
              <BlockMath math="= \int \sec^{m-2} x \, d(\tan x)" />
              <BlockMath math="= \tan x \sec^{m-2} x - \int \tan x \, d(\sec^{m-2} x)" />
              <BlockMath math="= \tan x \sec^{m-2} x - \int \tan x \left[ (m-2)\sec^{m-3} x \cdot \sec x \tan x \right] dx" />
              <BlockMath math="= \tan x \sec^{m-2} x - (m-2) \int \tan^2 x \sec^{m-2} x \, dx" />
              <BlockMath math="= \tan x \sec^{m-2} x - (m-2) \int (\sec^2 x - 1) \sec^{m-2} x \, dx" />
              <BlockMath math="= \tan x \sec^{m-2} x - (m-2) \int \sec^m x \, dx + (m-2) \int \sec^{m-2} x \, dx" />
              
              <div className="border-t border-violet-200 pt-3 mt-3">
                <p className="mb-2 text-gray-600 font-bold">將等式右邊的 <InlineMath math="-(m-2)\int \sec^m x \, dx" /> 移項到左邊整理：</p>
                <BlockMath math="\Rightarrow \int \sec^m x \, dx = \frac{1}{m-1} \tan x \sec^{m-2} x + \frac{m-2}{m-1} \int \sec^{m-2} x \, dx" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3.4 正弦與餘弦乘積的次方程式 */}
      <div className="math-box mb-6 p-6 bg-violet-50 rounded-lg shadow-sm border border-violet-100 mt-8">
        <h3 className="text-xl font-bold mb-3 text-violet-800">
          3.4 形式：<InlineMath math="\int \sin^m x \cos^n x \, dx" />
        </h3>
        
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          解題策略取決於次方 <InlineMath math="m" /> 與 <InlineMath math="n" /> 是奇數還是偶數：
        </p>

        <div className="space-y-4">
          {/* Case 1: 奇數次方 */}
          <div className="p-4 bg-white rounded border-l-4 border-violet-500 shadow-sm">
            <h4 className="font-bold text-violet-900 mb-2">💡 Case 1：其中至少一個是奇數</h4>
            <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
              <li>若 <InlineMath math="m" /> (sin的次方) 是奇數：提出一個 <InlineMath math="\sin x" /> 作為 <InlineMath math="du" /> 的一部分，將剩下的 <InlineMath math="\sin" /> 轉換成 <InlineMath math="\cos" /> (利用 <InlineMath math="\sin^2 x = 1 - \cos^2 x" />)，最後令 <InlineMath math="u = \cos x" />。</li>
              <li>若 <InlineMath math="n" /> (cos的次方) 是奇數：提出一個 <InlineMath math="\cos x" /> 作為 <InlineMath math="du" /> 的一部分，將剩下的 <InlineMath math="\cos" /> 轉換成 <InlineMath math="\sin" /> (利用 <InlineMath math="\cos^2 x = 1 - \sin^2 x" />)，最後令 <InlineMath math="u = \sin x" />。</li>
            </ul>
          </div>

          {/* Case 2: 都是偶數 */}
          <div className="p-4 bg-white rounded border-l-4 border-violet-500 shadow-sm">
            <h4 className="font-bold text-violet-900 mb-2">💡 Case 2：兩者都是偶數</h4>
            <p className="text-sm text-gray-700 mb-2">
              利用<strong>半角公式 (降次公式)</strong> 將次方降低：
            </p>
            <div className="flex justify-center gap-8 text-sm">
              <BlockMath math="\sin^2 x = \frac{1 - \cos(2x)}{2}" />
              <BlockMath math="\cos^2 x = \frac{1 + \cos(2x)}{2}" />
            </div>
            <p className="text-sm text-gray-700 mt-2 text-center">
              有時也會用到 <InlineMath math="\sin x \cos x = \frac{1}{2} \sin(2x)" />。
            </p>
          </div>
        </div>
      </div>

      {/* 3.5 範例練習：正弦與餘弦乘積 */}
      <div className="example-box mt-8 border-t-4 border-violet-500 shadow-md">
        <h3 className="example-title text-xl font-bold text-violet-900 mb-6 flex items-center">
          <span className="mr-2">📝</span> 3.5 範例練習：正弦與餘弦乘積
        </h3>

        <div className="space-y-8">
          {/* 範例 1 */}
          <div className="p-5 bg-violet-50 rounded-lg border border-violet-100">
            <p className="font-bold text-violet-900 mb-2">
              範例 1（奇數次方）：計算 <InlineMath math="\displaystyle\int \sin^3 x \cos^2 x \, dx" />
            </p>
            <SolutionBox>
              <div className="text-sm text-gray-700 space-y-3">
                <p><strong>Step 1：</strong>因為 <InlineMath math="\sin" /> 是奇數次方，提出一個 <InlineMath math="\sin x" />：</p>
                <BlockMath math="\int \sin^3 x \cos^2 x \, dx = \int (\sin^2 x) \cos^2 x \cdot \sin x \, dx" />
                <p><strong>Step 2：</strong>將剩下的 <InlineMath math="\sin^2 x" /> 換成 <InlineMath math="1 - \cos^2 x" />：</p>
                <BlockMath math="= \int (1 - \cos^2 x) \cos^2 x \cdot \sin x \, dx" />
                <p><strong>Step 3：</strong>令 <InlineMath math="u = \cos x" />，則 <InlineMath math="du = -\sin x \, dx \implies -du = \sin x \, dx" />：</p>
                <BlockMath math="= \int (1 - u^2) u^2 (-du) = \int (u^4 - u^2) \, du" />
                <p><strong>Step 4：</strong>積分並回代：</p>
                <BlockMath math="= \frac{u^5}{5} - \frac{u^3}{3} + C = \frac{\cos^5 x}{5} - \frac{\cos^3 x}{3} + C" />
              </div>
            </SolutionBox>
          </div>

          {/* 範例 2 */}
          <div className="p-5 bg-violet-50 rounded-lg border border-violet-100">
            <p className="font-bold text-violet-900 mb-2">
              範例 2（皆為偶數）：計算 <InlineMath math="\displaystyle\int \sin^2 x \cos^2 x \, dx" />
            </p>
            <SolutionBox>
              <div className="text-sm text-gray-700 space-y-3">
                <p><strong>Step 1：</strong>兩者皆為偶數，使用半角公式或倍角公式。這裡利用 <InlineMath math="\sin x \cos x = \frac{1}{2}\sin(2x)" />：</p>
                <BlockMath math="\int \sin^2 x \cos^2 x \, dx = \int \left( \frac{1}{2} \sin(2x) \right)^2 dx = \frac{1}{4} \int \sin^2(2x) \, dx" />
                <p><strong>Step 2：</strong>對 <InlineMath math="\sin^2(2x)" /> 再次使用半角公式：<InlineMath math="\sin^2(2x) = \frac{1 - \cos(4x)}{2}" /></p>
                <BlockMath math="= \frac{1}{4} \int \frac{1 - \cos(4x)}{2} \, dx = \frac{1}{8} \int (1 - \cos(4x)) \, dx" />
                <p><strong>Step 3：</strong>直接積分：</p>
                <BlockMath math="= \frac{1}{8} \left( x - \frac{1}{4}\sin(4x) \right) + C = \frac{x}{8} - \frac{\sin(4x)}{32} + C" />
              </div>
            </SolutionBox>
          </div>
        </div>
      </div>

      {/* 3.6 正切與正割乘積的次方程式 */}
      <div className="math-box mb-6 p-6 bg-violet-50 rounded-lg shadow-sm border border-violet-100 mt-8">
        <h3 className="text-xl font-bold mb-3 text-violet-800">
          3.6 形式：<InlineMath math="\int \tan^m x \sec^n x \, dx" />
        </h3>
        
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          這類積分的核心是利用恆等式 <InlineMath math="\sec^2 x = 1 + \tan^2 x" />。
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-white rounded border-l-4 border-violet-500 shadow-sm">
            <h4 className="font-bold text-violet-900 mb-2">💡 Case 1：<InlineMath math="\sec" /> 的次方 (<InlineMath math="n" />) 是偶數</h4>
            <p className="text-sm text-gray-700">
              提出一個 <InlineMath math="\sec^2 x" /> 作為 <InlineMath math="du" />，將剩下的 <InlineMath math="\sec" /> 轉換成 <InlineMath math="\tan" />。然後令 <InlineMath math="u = \tan x" /> (此時 <InlineMath math="du = \sec^2 x \, dx" />)。
            </p>
          </div>

          <div className="p-4 bg-white rounded border-l-4 border-violet-500 shadow-sm">
            <h4 className="font-bold text-violet-900 mb-2">💡 Case 2：<InlineMath math="\tan" /> 的次方 (<InlineMath math="m" />) 是奇數</h4>
            <p className="text-sm text-gray-700">
              提出一個 <InlineMath math="\sec x \tan x" /> 作為 <InlineMath math="du" />，將剩下的 <InlineMath math="\tan" /> 轉換成 <InlineMath math="\sec" />。然後令 <InlineMath math="u = \sec x" /> (此時 <InlineMath math="du = \sec x \tan x \, dx" />)。
            </p>
          </div>
          
          <div className="p-4 bg-white rounded border-l-4 border-violet-500 shadow-sm">
            <h4 className="font-bold text-violet-900 mb-2">💡 其他情況</h4>
            <p className="text-sm text-gray-700">
              若 <InlineMath math="\tan" /> 是偶數且 <InlineMath math="\sec" /> 是奇數，通常需要使用<strong>分部積分法 (Integration by Parts)</strong>，例如 <InlineMath math="\int \sec^3 x \, dx" />。
            </p>
          </div>
        </div>
      </div>

      {/* 3.7 範例練習：正切與正割乘積 */}
      <div className="example-box mt-8 border-t-4 border-violet-500 shadow-md">
        <h3 className="example-title text-xl font-bold text-violet-900 mb-6 flex items-center">
          <span className="mr-2">📝</span> 3.7 範例練習：正切與正割乘積
        </h3>

        <div className="space-y-8">
          {/* 範例 3 */}
          <div className="p-5 bg-violet-50 rounded-lg border border-violet-100">
            <p className="font-bold text-violet-900 mb-2">
              範例 3（sec為偶數）：計算 <InlineMath math="\displaystyle\int \tan^2 x \sec^4 x \, dx" />
            </p>
            <SolutionBox>
              <div className="text-sm text-gray-700 space-y-3">
                <p><strong>Step 1：</strong>因為 <InlineMath math="\sec" /> 的次方是偶數，保留一個 <InlineMath math="\sec^2 x" />：</p>
                <BlockMath math="\int \tan^2 x \sec^4 x \, dx = \int \tan^2 x \sec^2 x \cdot \sec^2 x \, dx" />
                <p><strong>Step 2：</strong>將剩下的 <InlineMath math="\sec^2 x" /> 換成 <InlineMath math="1 + \tan^2 x" />：</p>
                <BlockMath math="= \int \tan^2 x (1 + \tan^2 x) \cdot \sec^2 x \, dx" />
                <p><strong>Step 3：</strong>令 <InlineMath math="u = \tan x" />，則 <InlineMath math="du = \sec^2 x \, dx" />：</p>
                <BlockMath math="= \int u^2 (1 + u^2) \, du = \int (u^2 + u^4) \, du" />
                <p><strong>Step 4：</strong>積分並回代：</p>
                <BlockMath math="= \frac{u^3}{3} + \frac{u^5}{5} + C = \frac{\tan^3 x}{3} + \frac{\tan^5 x}{5} + C" />
              </div>
            </SolutionBox>
          </div>
        </div>
      </div>

      {/* 小提示 */}
      <div className="mt-8 p-5 bg-violet-100/40 rounded-lg border border-violet-200">
        <h3 className="text-lg font-bold text-violet-900 mb-3">💡 解題心法</h3>
        <p className="text-sm text-gray-700">
          面對三角函數積分，最核心的策略就是<strong>「湊微分」</strong>。觀察哪一個部分的微分能夠剛好等於剩下的項（搭配恆等式轉換）。
          熟悉 <InlineMath math="(\sin x)' = \cos x" />、<InlineMath math="(\cos x)' = -\sin x" />、<InlineMath math="(\tan x)' = \sec^2 x" /> 和 <InlineMath math="(\sec x)' = \sec x \tan x" /> 是致勝關鍵！
        </p>
      </div>

    </section>
  );
}
